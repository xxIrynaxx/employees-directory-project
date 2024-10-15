import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { filterSortSearchEmployees } from '@/utils/utils';
import EmployeesList from './components/EmployeesList/EmployeesList';
import EmployeesListSkeleton from './components/SkeletonEmployees/SkeletonEmployees';
import ErrorPage from '../ErrorPage';

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
