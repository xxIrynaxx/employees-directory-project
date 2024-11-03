import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortTypes } from '@/types';
import NavigationBar from '../../features/NavigationBar';
import Employees from '../../features/Employees';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy');
  const initialSortType = sortBy === 'birthday' ? 'Sort by birthday' : 'Sort by alphabet';

  const [sortType, setSortType] = useState<SortTypes>(initialSortType);

  const handleSortChange = (newSortType: SortTypes) => {
    setSortType(newSortType);
    const sortKey = newSortType === 'Sort by alphabet' ? 'alphabet' : 'birthday';
    setSearchParams({ sortBy: sortKey });
  };

  return (
    <>
      <NavigationBar sortType={sortType} setSortType={handleSortChange} />
      <Employees sortType={sortType} />
    </>
  );
};

export default MainPage;
