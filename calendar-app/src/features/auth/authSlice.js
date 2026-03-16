// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest } from '../../api/authApi';

export const loginUser = createAsyncThunk(
  'authentication/loginUser', 
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await loginRequest({ username, password });

      console.log(data);
      if (!Array.isArray(data) || data.length === 0) {
        return rejectWithValue('Invalid user name or password!');
      }

      const row = data[0];
      const mapped = {
        sessionId: row._session_ID,
        clientId: row.client_ID,
        orgId: row.org_ID,
        userId: row.user_ID,
        roleId: row.role_ID,
      };

      return mapped;
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Login failed';
      return rejectWithValue(msg);
    }
  }
);

const initialState = {
  user: null,
  accessToken: null, 
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
   clearAuthError(state) {
      state.error = null;
    },
    clearAuthStatus(state) {
      state.error = null;
      state.status = 'idle';
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.status = 'idle';
      state.error = null;
      try { localStorage.removeItem('auth'); } catch {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;

        // نخزن sessionId كتوكين، ونبني user من الحقول المتوفرة
        const { sessionId, clientId, orgId, userId, roleId } = action.payload;

        state.accessToken = String(sessionId); // تعاملها كـ session token
        state.user = {
          id: userId,
          roleId,
          clientId,
          orgId,
        };

        // حفظ محلي اختياري
        try {
          localStorage.setItem('auth', JSON.stringify({
            accessToken: state.accessToken,
            user: state.user,
          }));
        } catch {}
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout , clearAuthError, clearAuthStatus  } = authSlice.actions;
export default authSlice.reducer;


// يشبه شغل promise in js
// createAsyncThunk(type, payloadCreator) يولّد 3 أكشنات تلقائيًا لنفس العملية:

// auth/loginUser/pending → قبل ما يبدأ/أثناء التنفيذ.

// auth/loginUser/fulfilled → إذا نجح الطلب.

// auth/loginUser/rejected → إذا فشل الطلب.