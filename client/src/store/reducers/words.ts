import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WordsState, wordsPayload } from './types';

import { loadData } from '../../utils/loadData';

const initialState: WordsState = {
  words: [],
  isLoading: false,
  error: null,
};

export const loadWords = createAsyncThunk<wordsPayload>(
  'words/loadWords',
  (_, thunkAPI) => loadData(thunkAPI, 'words')
);

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadWords.pending, state => {
        state.words = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadWords.fulfilled, (state, action) => {
        const payload: wordsPayload = action.payload;

        if (payload) {
          if (!payload.data) {
            state.words = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.words = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadWords.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.words = null;
        state.error = action.error;
      });
  },
});

export default wordsSlice.reducer;
