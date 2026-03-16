import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/',
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState()?.authentication?.accessToken
  //     || JSON.parse(localStorage.getItem('authentication') || '{}')?.accessToken;
  //   if (token) headers.set('Authorization', `Bearer ${token}`);
  //   headers.set('Content-Type', 'application/json');
  //   return headers;
  // },
  credentials: 'include', // اذا تحتاج كوكيز
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
      return null;
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Appointments', 'Doctors', 'Patients'],
  endpoints: () => ({}), // endpoints تُحقن بملفات منفصلة
});
