import React from 'react';
import { useSelector } from 'react-redux';
import NavigationBar from '../NavigationBar';
import Employees from '../Employees';
import Sort from '../NavigationBar/components/Sort/Sort';
import { selectVisibleSort } from '../NavigationBar/navigationSelector';

const MainPage = () => {
  const isVisible = useSelector(selectVisibleSort);

  return (
    <>
      <NavigationBar />
      <Employees />
      {isVisible && <Sort />}
    </>
  );
};

export default MainPage;
