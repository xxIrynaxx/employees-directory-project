import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '@/store';
import { selectSort } from '../../navigationSelector';
import { SortTypes } from '@/types/employeesDirectoryTypes';
import { setSortType, toggleVisibility } from '../../sortSlice';
import './sort.scss';

const Sort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSort = useSelector(selectSort);
  const dispatch = useDispatch<AppDispatch>();

  const queryParams = Object.fromEntries([...searchParams]);
  const sortBy = queryParams.sortBy || 'alphabet';

  const changeSort = (sortType: SortTypes) => {
    const sortKey = sortType === 'Sort by alphabet' ? 'alphabet' : 'birthday';
    dispatch(setSortType(sortType));
    localStorage.setItem('sortType', sortKey);
    setSearchParams({ ...queryParams, sortBy: sortKey });
  };

  return (
    <div className="sort-modal overlay" onClick={() => dispatch(toggleVisibility())}>
      <div className="sort-modal__content" onClick={e => e.stopPropagation()}>
        <div className="sort-modal__header">
          <h2 className="sort-modal__header-title">Sort</h2>
          <div className="sort-modal__icon-background">
            <i
              className="fa-solid fa-xmark sort-modal__close-icon"
              onClick={() => dispatch(toggleVisibility())}
            ></i>
          </div>
        </div>

        <form className="sort-modal__form">
          <input
            id="alphabetSort"
            type="radio"
            name="sorting"
            value="Sort by alphabet"
            checked={selectedSort === 'Sort by alphabet'}
            onChange={() => changeSort('Sort by alphabet')}
          />
          <label htmlFor="alphabetSort" className="sort-modal__radio">
            By alphabet
          </label>

          <input
            id="birthdaySort"
            type="radio"
            name="sorting"
            value="Sort by birthday"
            checked={selectedSort === 'Sort by birthday'}
            onChange={() => changeSort('Sort by birthday')}
          />
          <label htmlFor="birthdaySort" className="sort-modal__radio">
            By birthday
          </label>
        </form>
      </div>
    </div>
  );
};

export default Sort;
