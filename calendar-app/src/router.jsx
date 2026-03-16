// src/router.jsx
import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import LoginPage from './pages/LoginPage';

import ErrorBoundary from './components/ErrorBoundary';

const CalendarPage = lazy(() => import('./pages/CalendarPage'));

import { store } from './app/store';

function requireAuth() {
  const state = store.getState();
  const token = state.authentication.accessToken || JSON.parse(localStorage.getItem('auth') || 'null')?.accessToken;
   
  if (!token) return redirect('/login');
  return null; 
}

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />, 
    children: [
      { index: true, loader: () => redirect('/login') },
      { path: 'login', element: <LoginPage /> },
      {
        path: 'main',
        loader: requireAuth, 
        element: (
          <Suspense fallback={<div style={{ padding: 24 }}>Loading calendar…</div>}>
            <CalendarPage />
          </Suspense>
        ),

      },
    ],
  },
]);
