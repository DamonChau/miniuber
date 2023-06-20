/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { Users } from "../../models/type";
export type UsersResponse = Users[];

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ token: string; refreshToken: string; user: Users }, any>({
      query: (credentials: any) => ({
        url: "api/Users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserByPhoneNo: build.query<Users, string>({
      query: (phoneNo) => `api/Users/GetUserByPhoneNo/${phoneNo}`,
    }),
    getUsers: build.query<UsersResponse, void>({
      query: () => ({ url: "api/Users/GetAll" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "users", id } as const)),
        { type: "users" as const, id: "LIST" },
      ],
    }),
    getUser: build.query<Users, string>({
      query: (id) => `api/Users/Details/${id}`,
      providesTags: (result, error, arg) => [{ type: "users", id: result?.id }],
    }),
    addUser: build.mutation<Users, Partial<Users>>({
      query: (body) => ({
        url: "api/Users/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "users", id: "LIST" }],
    }),
    
    updateUser: build.mutation<Users, Partial<Users>>({
      query(body) {
        return {
          url: `api/Users/UpdateUser`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (users) => [{ type: "users", id: users?.id }],
    }),
    deleteUser: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `api/Users/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (users) => [{ type: "users", id: users?.id }],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByPhoneNoQuery,
} = usersApi;
