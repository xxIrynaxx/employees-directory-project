import { FilterByPosition, positionFilterList } from '@/types/employeesDirectoryTypes';
import React, { useEffect } from 'react';
import './position-filter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { setPositionFilter } from '../../positionFilterSlice';

const PositionFilter = () => {
  const selectedFilter = useSelector((state: RootState) => state.position.positionFilter);
  const dispatch = useDispatch<AppDispatch>();

  const changeFilter = (filterType: FilterByPosition) => {
    dispatch(setPositionFilter(filterType));
    localStorage.setItem('filterType', filterType);
  };

  useEffect(() => {
    const savedFilterType = localStorage.getItem('filterType');
    if (savedFilterType) {
      dispatch(setPositionFilter(savedFilterType as FilterByPosition));
    }
  }, [dispatch]);

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
