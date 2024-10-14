import React from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import PositionFilter from './components/PositionFilter/PositionFilter';
import './navigation-bar.scss';

const NavigationBar = () => {
  return (
    <div className="navigation">
      <h2 className="navigation__title">Search</h2>
      <SearchBar />
      <PositionFilter />
    </div>
  );
};

export default NavigationBar;
