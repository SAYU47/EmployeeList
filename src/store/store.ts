import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './slices/employeesSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;