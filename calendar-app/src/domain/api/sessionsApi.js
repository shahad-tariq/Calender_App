// src/features/api/sessionsApi.js
import { baseApi } from './baseApi';

const DOCTORS_API_BASE =
  import.meta.env.VITE_DOCTORS_API_BASE ||
  import.meta.env.VITE_API_BASE_URL;

//https://damas.adsys-iq.com:5012/GetDoctorSessions?Doctor_ID=1006810&From=2025-10-10&To=2025-11-11&Status=%27PND%27&AD_Client_ID=1000005&AD_Org_ID=1000008&Session_ID=1110857


// Response Sample: {
//   "statusCode": 1,
//   "message": "Success",
//   "doctorSessionsResult": [
//     {
//       "patientName": "باخان عبدالعزيز عبدالله",
//       "patientID": "1007579",
//       "doctorID": "1006810",
//       "doctorName": "Mohand",
//       "sessionID": "1025652",
//       "startDateTime": "2025-11-09 12:30",
//       "endDateTime": "2025-11-09 13:00",
//       "arriveDateTime": " ",
//       "completeDateTime": " ",
//       "sessionType": "TE",
//       "sessionSubType": "DE",
//       "sessionStatus": "PND"
//     },

export const sessionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query({
      query: ({
        Doctor_ID = '',
        FromDate = '',
        ToDate = '',
        Status = '',
        clientId = '',
        orgId = '',
        sessionId = '',
      }) => {
        const apiUrl = `${DOCTORS_API_BASE.replace(/\/+$/, '')}/GetDoctorSessions`;
        const params = {
          Doctor_ID: Doctor_ID,
          From: FromDate,
          To: ToDate,
          Status: Status,
          AD_Client_ID: clientId,
          AD_Org_ID: orgId,
          Session_ID: sessionId,
        };


        return {
          url: apiUrl,
          params: params,
          credentials: 'omit',
        };
      },
      transformResponse: (resp) => {
        console.log('Sessions API Raw Response:', resp);

        if (resp?.statusCode === 1 && Array.isArray(resp?.doctorSessionsResult)) {
          console.log('Sessions found:', resp.doctorSessionsResult.length);
          return resp.doctorSessionsResult;
        } else if (resp?.statusCode !== 1) {
          console.warn('Sessions API returned status:', resp?.statusCode, resp?.message);
          return [];
        }

        console.warn('Sessions API unexpected response format:', resp);
        return [];
      },
      providesTags: (res) =>
        res?.length
          ? [
            ...res.map((d) => ({ type: 'Sessions', id: d?.sessionID })),
            { type: 'Sessions', id: 'LIST' },
          ]
          : [{ type: 'Sessions', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetSessionsQuery } = sessionsApi;
