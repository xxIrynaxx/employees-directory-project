import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoading } from './employeesSelector';
import { SortTypes } from '@/types';
import { useFilteredEmployees } from '@/utils';
import { RootState } from '@/store';
import EmployeesList from './components/EmployeesList';
import EmployeesListSkeleton from './components/EmployeesSkeleton';
import ErrorPage from '../ErrorPage';

type EmployeesProps = {
  sortType: SortTypes;
};

const Employees: React.FC<EmployeesProps> = ({ sortType }) => {
  const employees = useSelector((state: RootState) => state.employees.employeesList);
  const statusLoading = useSelector(selectLoading);

  const filteredEmployees = useFilteredEmployees(employees);

  if (statusLoading === 'loading') {
    return <EmployeesListSkeleton />;
  }

  if (statusLoading === 'failed') {
    return <ErrorPage type="Unexpected" />;
  }

  if (!filteredEmployees.length) {
    return <ErrorPage type="NotFound" />;
  }

  return (
    <div className="employees">
      <EmployeesList sortType={sortType} employees={filteredEmployees} />
    </div>
  );
};

export default Employees;
