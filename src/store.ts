import { configureStore } from '@reduxjs/toolkit';
import employeesListReducer from './features/Employees/EmployeesSlice';
import employeeProfileSlice from './features/EmployeeProfile/EmployeeProfileSlice';
import positionFilterSlice from './features/NavigationBar/positionFilterSlice';
import sortSlice from './features/NavigationBar/sortSlice';
import searchBarSlice from './features/NavigationBar/searchBarSlice';

export const store = configureStore({
  reducer: {
    employees: employeesListReducer,
    position: positionFilterSlice,
    sort: sortSlice,
    search: searchBarSlice,
    employeeProfile: employeeProfileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
