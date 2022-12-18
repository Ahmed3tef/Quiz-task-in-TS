import { configureStore } from '@reduxjs/toolkit';

import { words, rank } from './reducers';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    words,
    rank,
  },
});

// we must define these here to be able to work with redux store and get its state from outside with typescript

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
