import React from 'react';
import { Outlet, Link, useLocation, useRouteLoaderData } from 'react-router-dom';

import ErrorBoundary from '../components/ErrorBoundary';


export async function rootLoader() {
  const raw = localStorage.getItem('auth');
  const auth = raw ? JSON.parse(raw) : null;
  return { auth };
}

export default function RootLayout() {
  const { auth } = useRouteLoaderData('root') || {};
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      {!isLoginPage && (
        <nav style={{ padding: 12, borderBottom: '1px solid #eee' }}>
          <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
          <Link to="/main">Calendar</Link>
          {auth?.user && <span style={{ marginLeft: 12 }}>Hi, {auth.user.userId}</span>}
        </nav>
      )}

       <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>

    </div>
  );
}
