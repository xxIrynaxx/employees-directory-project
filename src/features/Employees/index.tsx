import React from 'react';
import EmployeesList from './components/EmployeesList/EmployeesList';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import EmployeesListSkeleton from './components/SkeletonEmployees/SkeletonEmployees';
import ErrorPage from '../ErrorPage';
import { filterSortSearchEmployees } from './EmployeesSlice';

const Employees = () => {
  const isLoading = useSelector((state: RootState) => state.employees.isLoading);
  const employees = useSelector(filterSortSearchEmployees);

  if (isLoading === 'loading') {
    return <EmployeesListSkeleton />;
  }

  if (isLoading === 'failed') {
    return <ErrorPage type="Unexpected" />;
  }

  if (!employees.length) {
    return <ErrorPage type={'NotFound'} />;
  }

  return (
    <div className="employees">
      <EmployeesList />
    </div>
  );
};

export default Employees;
