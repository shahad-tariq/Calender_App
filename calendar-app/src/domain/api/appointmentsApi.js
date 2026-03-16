import { baseApi } from './baseApi';

export const appointmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => '/appointments',
      // tagging أدق: قائمة + عناصر
      providesTags: (result) =>
        result?.length
          ? [
              ...result.map((a) => ({ type: 'Appointments', id: a.id })),
              { type: 'Appointments', id: 'LIST' },
            ]
          : [{ type: 'Appointments', id: 'LIST' }],
      transformResponse: (res) => res, // عدلي لو احتجتي
    }),

    getAppointmentById: builder.query({
      query: (id) => `/appointments/${id}`,
      providesTags: (res, err, id) => [{ type: 'Appointments', id }],
    }),

    addAppointment: builder.mutation({
      query: (body) => ({ url: '/appointments', method: 'POST', body }),
      invalidatesTags: [{ type: 'Appointments', id: 'LIST' }],
    }),

    updateAppointment: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/appointments/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (res, err, { id }) => [{ type: 'Appointments', id }],
    }),

    deleteAppointment: builder.mutation({
      query: (id) => ({ url: `/appointments/${id}`, method: 'DELETE' }),
      invalidatesTags: (res, err, id) => [
        { type: 'Appointments', id },
        { type: 'Appointments', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useAddAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentsApi;
