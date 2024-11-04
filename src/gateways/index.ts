import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '@/types';

export const getEmployeesList = createAsyncThunk<Employee[], void, { rejectValue: string }>(
  'employeesList/getEmployeesList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://66a0f8b17053166bcabd894e.mockapi.io/api/workers');

      if (!response.ok) {
        throw new Error('Failed to fetch employees list');
      }

      const data: Employee[] = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
