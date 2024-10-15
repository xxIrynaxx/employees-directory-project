import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import NavigationBar from '../NavigationBar';
import Employees from '../Employees';
import Sort from '../NavigationBar/components/Sort/Sort';

const MainPage = () => {
  const isVisible = useSelector((state: RootState) => state.sort.visible);
  return (
    <>
      <NavigationBar />
      <Employees />
      {isVisible && <Sort />}
    </>
  );
};

export default MainPage;
