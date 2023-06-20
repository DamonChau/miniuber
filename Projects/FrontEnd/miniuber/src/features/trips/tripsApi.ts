/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { Trips } from "../../models/type";
export type TripsResponse = Trips[];

export const tripsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllTrips: build.query<TripsResponse, void>({
      query: () => ({ url: "api/Trips/GetAllTrips" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "trips", id } as const)),
        { type: "trips" as const, id: "LIST" },
      ],
    }),
    getTrip: build.query<Trips, string>({
      query: (id) => `api/Trips/Details/${id}`,
      providesTags: (result, error, arg) => [{ type: "trips", id: result?.id }],
    }),
    addTrip: build.mutation<Trips, Partial<Trips>>({
      query: (body) => ({
        url: "api/Trips/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "trips", id: "LIST" }],
    }),
    
    updateTrip: build.mutation<Trips, Partial<Trips>>({
      query(body) {
        return {
          url: `api/Trips/Update`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (trips) => [{ type: "trips", id: trips?.id }],
    }),
    deleteTrip: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `api/Trips/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (trips) => [{ type: "trips", id: trips?.id }],
    }),
  }),
});

export const {
 useAddTripMutation,
 useDeleteTripMutation,
 useGetAllTripsQuery,
 useGetTripQuery,
useUpdateTripMutation,
} = tripsApi;
