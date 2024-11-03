import { configureStore } from '@reduxjs/toolkit';
import employeesListReducer from './features/Employees/EmployeesSlice';

export const store = configureStore({
  reducer: {
    employees: employeesListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
