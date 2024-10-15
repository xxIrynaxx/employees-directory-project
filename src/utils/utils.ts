import { RootState } from '@/store';

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
