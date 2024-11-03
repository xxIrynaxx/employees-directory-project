import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '@/types';

export const getEmployeesList = createAsyncThunk('employeesList/getEmployeesList', async () => {
  const response = await fetch('https://66a0f8b17053166bcabd894e.mockapi.io/api/workers');

  if (!response.ok) {
    throw new Error('Failed to fetch employees list');
  }

  const data: Employee[] = await response.json();
  return data;
});
