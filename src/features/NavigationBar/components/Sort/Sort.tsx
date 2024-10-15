import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState, AppDispatch } from '@/store';
import { SortTypes } from '@/types/employeesDirectoryTypes';
import { setSortType, toggleVisibility } from '../../sortSlice';
import './sort.scss';

const Sort = () => {
  const selectedSort = useSelector((state: RootState) => state.sort.sortType);
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);
  const sortQuery = queryParams.sortQuery || 'Sort by alphabet';

  const changeSort = (sortType: SortTypes) => {
    dispatch(setSortType(sortType));
    localStorage.setItem('sortType', sortType);
    setSearchParams({ ...queryParams, sortQuery: sortType });
  };

  useEffect(() => {
    const savedSortType = sortQuery || localStorage.getItem('sortType');
    if (savedSortType) {
      dispatch(setSortType(savedSortType as SortTypes));
    }
  }, [dispatch, sortQuery]);

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
