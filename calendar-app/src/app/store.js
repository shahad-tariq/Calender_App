import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { baseApi } from '../features/api/baseApi';

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});



// store هو قلب الـ Redux → أي component يقدر يوصل للـ state أو يرسل actions.

// authReducer مسؤول عن session/login.

// baseApi مسؤول عن الاتصال بالـ backend وإدارة البيانات.

// middleware يخلي الطلبات تشتغل بشكل أوتوماتيكي وتندمج مع الـ Redux state.