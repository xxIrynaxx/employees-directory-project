import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getEmployeesList } from '@/gateways';
import { Employee, ErrorType, TypeLoading } from '@/types';

type EmployeeState = {
  employeesList: Employee[];
  isLoading: TypeLoading;
  error: ErrorType;
};

const initialState: EmployeeState = {
  employeesList: [],
  isLoading: 'loading',
  error: '',
};

const employeesListSlice = createSlice({
  name: 'employeesList',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employeesList = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getEmployeesList.fulfilled, (state, action: PayloadAction<Employee[]>) => {
      if (action.payload.length === 0) {
        state.error = 'NotFound';
      } else {
        state.employeesList = action.payload;
        state.isLoading = 'completed';
      }
    }),
      builder.addCase(getEmployeesList.rejected, state => {
        state.employeesList = [];
        state.isLoading = 'failed';
        state.error = 'Unexpected';
      }),
      builder.addCase(getEmployeesList.pending, state => {
        state.isLoading = 'loading';
      });
  },
});

export const { setEmployees } = employeesListSlice.actions;
export default employeesListSlice.reducer;
