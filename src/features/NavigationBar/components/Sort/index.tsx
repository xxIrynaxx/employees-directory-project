import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './index.scss';

type SortProps = {
  toggleModal: () => void;
};

const Sort: React.FC<SortProps> = ({ toggleModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get('sortBy') || 'alphabet';

  const changeSort = (sortType: 'alphabet' | 'birthDate') => {
    if (sortType === 'alphabet') {
      searchParams.delete('sortBy');
      setSearchParams(searchParams);
    } else {
      searchParams.set('sortBy', sortType);
      setSearchParams(searchParams);
    }
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
            value="alphabet"
            checked={currentSort === 'alphabet'}
            onChange={() => changeSort('alphabet')}
          />
          <label htmlFor="alphabetSort" className="sort-modal__radio">
            By alphabet
          </label>

          <input
            id="birthdaySort"
            type="radio"
            name="sorting"
            value="birthday"
            checked={currentSort === 'birthday'}
            onChange={() => changeSort('birthDate')}
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
