/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { Customers } from "../../models/type";
export type CustomersResponse = Customers[];

export const customersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getByUserId: build.query<Customers, string>({
      query: (userid) => `api/Customers/GetByUserId/${userid}`,
      providesTags: (result, error, arg) => [
        { type: "customers", id: result?.id },
      ],
    }),
    getCustomer: build.query<Customers, string>({
      query: (id) => `api/Customers/Details/${id}`,
      providesTags: (result, error, arg) => [
        { type: "customers", id: result?.id },
      ],
    }),
    addCustomer: build.mutation<Customers, Partial<Customers>>({
      query: (body) => ({
        url: "api/Customers/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "customers", id: "LIST" }],
    }),

    updateCustomer: build.mutation<Customers, Partial<Customers>>({
      query(body) {
        return {
          url: `api/Customers/Update`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (customers) => [
        { type: "customers", id: customers?.id },
      ],
    }),
    deleteCustomer: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `api/Customers/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (customers) => [
        { type: "customers", id: customers?.id },
      ],
    }),
  }),
});

export const {
  useGetByUserIdQuery,
  useAddCustomerMutation,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
  useGetCustomerQuery,
} = customersApi;
