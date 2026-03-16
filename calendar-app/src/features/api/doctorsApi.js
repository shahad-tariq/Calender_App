// src/features/api/doctorsApi.js
import { baseApi } from './baseApi';

const DOCTORS_API_BASE =
  import.meta.env.VITE_DOCTORS_API_BASE ||
  import.meta.env.VITE_API_BASE_URL ||
  'https://damas.adsys-iq.com:5012';


export const doctorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      // نستخدم URL مطلق حتى لو baseUrl مختلف
      query: ({
        userType = '',
        clientId = '',
        orgId = '',
        sessionId = '',
      } = {}) => ({
        url: `${DOCTORS_API_BASE.replace(/\/+$/, '')}/GetDoctorInfo`,
        params: {
          User_Type: userType,
          AD_Client_ID: clientId,
          AD_Org_ID: orgId,
          Session_ID: sessionId,
        },
        credentials: 'omit', 
        // method: 'GET' // افتراضي
      }),
      // نخلي الـ raw كما يجي من السيرفر (Array) حتى الهوك يحوّله لاحقًا
      transformResponse: (resp) =>
        Array.isArray(resp?.doctorInfoResult) ? resp.doctorInfoResult : [],
      providesTags: (res) =>
        res?.length
          ? [
              ...res.map((d) => ({ type: 'Doctors', id: d?.c_BPARTNER_ID })),
              { type: 'Doctors', id: 'LIST' },
            ]
          : [{ type: 'Doctors', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetDoctorsQuery } = doctorsApi;
