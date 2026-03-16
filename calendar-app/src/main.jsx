import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router';

import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ErrorBoundary>
      <RouterProvider router={appRouter} />
    </ErrorBoundary>
  </Provider>
);


// نحتاج ReactDOM.createRoot حتى نركّب التطبيق داخل <div id="root"> الموجود في index.html.

// render => هو المسؤول عن عرض التطبيق

// Provider و store :-  Provider يوفّر Redux store لكل الكومبوننتات عبر Context. أي كومبوننت تقدر يستخدم useSelector و useDispatch.

// RouterProvider  => هو الي يشغل خريظة النظام router.jsx
// RouterProvider و appRouter :-  RouterProvider يفعّل React Router ويقرأ خريطة المسارات من appRouter (المعرّف في src/router.jsx).

// ErrorBoundary :- كومبوننت كـ Class يمسك أي خطأ يصير أثناء render أو lifecycle  ويعرض UI بديل بدل ما ينهار التطبيق.
