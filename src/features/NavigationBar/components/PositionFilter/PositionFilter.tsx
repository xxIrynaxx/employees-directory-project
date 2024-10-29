import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '@/store';
import { FilterByPosition, positionFilterList } from '@/types/employeesDirectoryTypes';
import { setPositionFilter } from '../../positionFilterSlice';
import { selectFilter } from '../../navigationSelector';
import './position-filter.scss';

const PositionFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilter = useSelector(selectFilter);
  const dispatch = useDispatch<AppDispatch>();

  const queryParams = Object.fromEntries([...searchParams]);
  const position = queryParams.position || 'All';

  const changeFilter = (filterType: FilterByPosition) => {
    dispatch(setPositionFilter(filterType));
    localStorage.setItem('filterType', filterType);
    setSearchParams({ ...queryParams, position: filterType });
  };

  useEffect(() => {
    const savedFilterType = position || localStorage.getItem('filterType');
    if (savedFilterType) {
      dispatch(setPositionFilter(savedFilterType as FilterByPosition));
    }
  }, [dispatch, position]);

  return (
    <div className="position-filter">
      <ul className="position-filter__list">
        {positionFilterList.map(filter => (
          <li
            key={filter}
            onClick={() => changeFilter(filter)}
            className={`position-filter__list-item ${
              selectedFilter === filter ? 'position-filter__list-item_active' : ''
            }`}
          >
            {filter}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PositionFilter;
