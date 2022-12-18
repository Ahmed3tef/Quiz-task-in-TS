import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rankPayload, rankState } from './types';

import { loadDataWithBody } from '../../utils/loadData';

const initialState: rankState = {
  rank: null,
  isLoading: false,
  error: null,
};

export const loadRank = createAsyncThunk<rankPayload, { score: number }>(
  'rank/loadRank',
  (data, thunkAPI) => loadDataWithBody(thunkAPI, 'rank', data)
);

export const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadRank.pending, state => {
        state.rank = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadRank.fulfilled, (state, { payload }) => {
        if (payload) {
          if (!payload.rank) {
            state.rank = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.rank = payload.rank;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadRank.rejected, (state, action) => {
        state.isLoading = false;
        state.rank = null;
        state.error = action.error;
      });
  },
});

export default rankSlice.reducer;
