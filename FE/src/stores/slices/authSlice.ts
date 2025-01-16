import { IUser } from '../../interfaces/User';
import { createSlice } from '@reduxjs/toolkit';

const initialAuthState: IUser = {
  id: 0,
  username: '',
  full_name: '',
  password: '',
  picture: '',
  description: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload;
      // console.log("ini login payload bro:", payload)
      localStorage.setItem('token', payload.token);

      const user: IUser = {
        id: payload.user.id,
        username: payload.user.username,
        full_name: payload.user.full_name,
        password: payload.user.password,
        picture: payload.user.picture,
        description: payload.user.description,
      };
      return user;
    },
    AUTH_CHECK: (_, action) => {
      const payload = action.payload;
      // console.log('ini check payload bro:', payload);

      const user = {
        id: payload.id,
        username: payload.username,
        full_name: payload.full_name,
        password: payload.password,
        picture: payload.picture,
        description: payload.description,
      };
      // console.log("cek cek:", user)
      return user;
    },
    AUTH_ERROR: (state) => {},
    AUTH_LOGOUT: (_, action) => {
      localStorage.removeItem('token');
    },
  },
});
