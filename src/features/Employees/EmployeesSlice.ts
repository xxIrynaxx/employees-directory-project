import { RootState } from '@/store';
import { Employee, ErrorType, TypeLoading } from '@/types/employeesDirectoryTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const getEmployeesList = createAsyncThunk('employeesList/getEmployeesList', async () => {
  const response = await fetch('https://66a0f8b17053166bcabd894e.mockapi.io/api/workers');

  if (!response.ok) {
    throw new Error('Failed to fetch employees list');
  }

  const data: Employee[] = await response.json();
  return data;
});

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

export const filterSortSearchEmployees = (state: RootState) => {
  const employees = state.employees.employeesList;
  const position = state.position.positionFilter;
  const sort = state.sort.sortType;
  let searchText = state.search.text.toLowerCase();

  let filteredEmployees = employees;

  switch (position) {
    case 'Designers':
      filteredEmployees = filteredEmployees.filter(
        employee => employee.position.toLowerCase() === 'designer',
      );
      break;
    case 'Analysts':
      filteredEmployees = filteredEmployees.filter(
        employee => employee.position.toLowerCase() === 'analyst',
      );
      break;
    case 'Managers':
      filteredEmployees = filteredEmployees.filter(
        employee => employee.position.toLowerCase() === 'manager',
      );
      break;
    case 'Android':
      filteredEmployees = filteredEmployees.filter(
        employee => employee.position.toLowerCase() === 'android',
      );
      break;
    case 'iOS':
      filteredEmployees = filteredEmployees.filter(employee => employee.position === 'iOS');
      break;
    default:
      filteredEmployees;
      break;
  }

  switch (sort) {
    case 'Sort by alphabet':
      filteredEmployees = filteredEmployees.slice().sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'Sort by birthday':
      filteredEmployees = filteredEmployees
        .slice()
        .sort((a, b) => new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime());
      break;
  }

  if (searchText) {
    filteredEmployees = filteredEmployees.filter(
      employee =>
        employee.name.toLowerCase().includes(searchText) ||
        employee.email.toLowerCase().includes(searchText) ||
        employee.tag.toLowerCase().includes(searchText),
    );
  }

  return filteredEmployees;
};

export const { setEmployees } = employeesListSlice.actions;
export default employeesListSlice.reducer;
