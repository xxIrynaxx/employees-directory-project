import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch, RootState } from '@/store';
import { FilterByPosition, positionFilterList } from '@/types/employeesDirectoryTypes';
import { setPositionFilter } from '../../positionFilterSlice';
import './position-filter.scss';

const PositionFilter = () => {
  const selectedFilter = useSelector((state: RootState) => state.position.positionFilter);
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);
  const positionQuery = queryParams.positionQuery || 'All';

  const changeFilter = (filterType: FilterByPosition) => {
    dispatch(setPositionFilter(filterType));
    localStorage.setItem('filterType', filterType);
    setSearchParams({ ...queryParams, positionQuery: filterType });
  };

  useEffect(() => {
    const savedFilterType = positionQuery || localStorage.getItem('filterType');
    if (savedFilterType) {
      dispatch(setPositionFilter(savedFilterType as FilterByPosition));
    }
  }, [dispatch, positionQuery]);

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
