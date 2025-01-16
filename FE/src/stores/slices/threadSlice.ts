import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IThreadCard } from '../../interfaces/ThreadCard';

const initialThreadState: IThreadCard[] = [];

export const threadSlice = createSlice({
  name: 'thread',
  initialState: initialThreadState,
  reducers: {
    GET_THREADS: (state, action: PayloadAction<{ threads: IThreadCard[] }>) => {
      const payload = action.payload;
      state = payload.threads;

      return state;
    },
  },
});
