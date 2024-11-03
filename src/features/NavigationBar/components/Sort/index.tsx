import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortTypes } from '@/types';
import './index.scss';

type SortProps = {
  toggleModal: () => void;
  sortType: SortTypes;
  setSortType: (sortType: SortTypes) => void;
};

const Sort: React.FC<SortProps> = ({ toggleModal, sortType, setSortType }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('sortBy')) {
      const sortBy = searchParams.get('sortBy') || 'alphabet';
      const initialSortType = sortBy === 'alphabet' ? 'Sort by alphabet' : 'Sort by birthday';
      setSortType(initialSortType as SortTypes);
    }
  }, []);

  const changeSort = (newSortType: SortTypes) => {
    const sortKey = newSortType === 'Sort by alphabet' ? 'alphabet' : 'birthday';
    setSortType(newSortType);
    setSearchParams({ sortBy: sortKey });
  };

  return (
    <div className="sort-modal overlay" onClick={toggleModal}>
      <div className="sort-modal__content" onClick={e => e.stopPropagation()}>
        <div className="sort-modal__header">
          <h2 className="sort-modal__header-title">Sort</h2>
          <div className="sort-modal__icon-background">
            <i className="fa-solid fa-xmark sort-modal__close-icon" onClick={toggleModal} />
          </div>
        </div>

        <form className="sort-modal__form">
          <input
            id="alphabetSort"
            type="radio"
            name="sorting"
            value="Sort by alphabet"
            checked={sortType === 'Sort by alphabet'}
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
            checked={sortType === 'Sort by birthday'}
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
