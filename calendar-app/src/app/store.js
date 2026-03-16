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



//configureStore => هو الي يسوي store
//يقوم بكل الإعدادات تلقائياً مثل:
//تفعيل Redux DevTools

//إضافة middleware الافتراضية :-
//thunk
//serializableCheck
//immutableCheck
//تحسين الأداء

// concat(baseApi.middleware) => هنا نضيف middleware الخاصة بـ RTK Query.
//وظيفتها:
//إرسال طلبات API
//إدارة cache
//إعادة جلب البيانات تلقائياً
//polling

//RTK Query هي مكتبة داخل Redux Toolkit مسؤولة عن: (baseApi.reducerPath)
//جلب البيانات من API
//caching
//loading state
//error handling

// store هو قلب الـ Redux → أي component يقدر يوصل للـ state أو يرسل actions.

// authReducer مسؤول عن session/login. Authentication

// baseApi مسؤول عن الاتصال بالـ backend وإدارة البيانات.

// middleware يخلي الطلبات تشتغل بشكل أوتوماتيكي وتندمج مع الـ Redux state.


// Redux Store
//    │
//    ├── authentication (authReducer)
//    │       ├── user
//    │       ├── token
//    │       └── login state
//    │
//    └── api(RTK Query)
//            ├── cached requests
//            ├── loading states
//            └── errors