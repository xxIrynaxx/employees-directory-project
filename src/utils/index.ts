import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Employee } from '@/types';

export const useFilteredEmployees = (employees: Employee[]): Employee[] => {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const { position: filterType = 'All', searchText, sortBy } = Object.fromEntries(searchParams);

    const filteredData = employees.filter(({ position, name, tag, email }) => {
      return (
        (filterType === 'All' ||
          position.toLowerCase() + 's' === filterType.toLowerCase() ||
          position.toLowerCase() === filterType.toLowerCase()) &&
        (!searchText ||
          [name, tag, email].some(field =>
            field?.toString().toLowerCase().includes(searchText.toLowerCase()),
          ))
      );
    });

    console.log(sortBy);

    return sortBy === 'birthDate'
      ? filteredData.sort(
          (a, b) => new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime(),
        )
      : filteredData.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }, [employees, searchParams]);
};
