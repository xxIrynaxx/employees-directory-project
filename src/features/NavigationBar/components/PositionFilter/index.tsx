import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterByPosition, positionFilterList } from '@/types';
import './index.scss';

const PositionFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const positionFilter = (searchParams.get('position') as FilterByPosition) || 'All';

  const changeFilter = (filterType: FilterByPosition) => {
    if (filterType === 'All') {
      searchParams.delete('position');
      setSearchParams(searchParams);
    } else {
      searchParams.set('position', filterType);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="position-filter">
      <ul className="position-filter__list">
        {positionFilterList.map(filter => (
          <li
            key={filter}
            onClick={() => changeFilter(filter)}
            className={`position-filter__list-item ${
              positionFilter === filter ? 'position-filter__list-item_active' : ''
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
