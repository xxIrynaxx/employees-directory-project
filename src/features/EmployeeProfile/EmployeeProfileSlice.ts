import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, ErrorType, TypeLoading } from '@/types/employeesDirectoryTypes';
import { getEmployeeProfile } from '@/gateway/gateway';

type EmployeeProfile = {
  employee: Employee;
  isLoading: TypeLoading;
  error: ErrorType;
};

const initialState: EmployeeProfile = {
  employee: {
    id: '',
    name: '',
    email: '',
    tag: '',
    position: '',
    phone: '',
    birthDate: 0,
    avatar: '',
  },
  isLoading: 'loading',
  error: '',
};

const employeeProfileSlice = createSlice({
  name: 'employeeProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getEmployeeProfile.pending, state => {
        state.isLoading = 'loading';
        state.error = '';
      })
      .addCase(getEmployeeProfile.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.employee = action.payload;
        state.isLoading = 'completed';
        state.error = '';
      })
      .addCase(getEmployeeProfile.rejected, state => {
        state.isLoading = 'failed';
        state.error = 'Unexpected';
      });
  },
});

export default employeeProfileSlice.reducer;
