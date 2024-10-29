import { RootState } from '@/store';
import { Employee } from '@/types/employeesDirectoryTypes';

export const selectEmployeeById = (state: RootState, id: string): Employee | undefined => {
  return state.employees.employeesList.find(employee => employee.id === id);
};

export const selectLoading = (state: RootState) => state.employees.isLoading;
export const selectError = (state: RootState) => state.employees.error;
