import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { RootState } from ".";
import { logout, setLoggedSession } from "./slices/authSlice";
import { Mutex } from "async-mutex";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5230",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const refreshToken = (getState() as RootState).auth.refreshToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("RefreshToken", `${refreshToken}`);
    }
    return headers;
  },
});

const mutex = new Mutex();

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQueryWithRetry(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQueryWithRetry(
          { url: "api/Users/refreshToken", method: "POST" },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          api.dispatch(setLoggedSession(refreshResult.data));
          // Retry the initial query need to update refreshToken
          result = await baseQueryWithRetry(args, api, extraOptions);
        } else {
          api.dispatch(logout());
          //window.location.href = "/login";
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQueryWithRetry(args, api, extraOptions);
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["users", "trips", "customers"],
  endpoints: () => ({}),
});
