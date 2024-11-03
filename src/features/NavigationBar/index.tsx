import React, { useState } from 'react';
import { SortTypes } from '@/types';
import SearchBar from './components/SearchBar';
import PositionFilter from './components/PositionFilter';
import Sort from './components/Sort';
import './navigation-bar.scss';

type NavigationBarProps = {
  sortType: SortTypes;
  setSortType: (sortType: SortTypes) => void;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ sortType, setSortType }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="navigation">
      <h2 className="navigation__title">Search</h2>
      <SearchBar toggleModal={toggleModal} sortType={sortType} />
      <PositionFilter />
      {isVisible && (
        <Sort toggleModal={toggleModal} sortType={sortType} setSortType={setSortType} />
      )}
    </div>
  );
};

export default NavigationBar;
