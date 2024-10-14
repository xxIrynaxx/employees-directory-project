import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '@/types/employeesDirectoryTypes';

const initialState: Employee = {
  id: '',
  name: '',
  email: '',
  tag: '',
  position: '',
  phone: '',
  birthDate: 0,
  avatar: '',
};

export const getEmployeeProfile = createAsyncThunk(
  'employee/getEmployeeProfile',
  async (id: string) => {
    const response = await fetch(`https://66a0f8b17053166bcabd894e.mockapi.io/api/workers/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch employees list');
    }

    const data: Employee[] = await response.json();
    return data;
  },
);

const employeeProfileSlice = createSlice({
  name: 'employeeProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getEmployeeProfile.fulfilled, (state, action: PayloadAction<Employee[]>) => {
      return { ...state, ...action.payload };
    });
  },
});

export default employeeProfileSlice.reducer;
