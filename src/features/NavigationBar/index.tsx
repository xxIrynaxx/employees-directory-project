import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import PositionFilter from './components/PositionFilter';
import Sort from './components/Sort';
import './navigation-bar.scss';

const NavigationBar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="navigation">
      <h2 className="navigation__title">Search</h2>
      <SearchBar toggleModal={toggleModal} />
      <PositionFilter />
      {isVisible && <Sort toggleModal={toggleModal} />}
    </div>
  );
};

export default NavigationBar;
