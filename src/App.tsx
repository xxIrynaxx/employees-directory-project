import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './features/MainPage/index';
import EmployeeProfile from './features/EmployeeProfile/index';
import ErrorPage from './features/ErrorPage/index';
import './styles/common.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { getEmployeesList } from './features/Employees/EmployeesSlice';
import Sort from './features/NavigationBar/components/Sort/Sort';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/employees/:id',
    element: <EmployeeProfile />,
  },
  {
    path: '*',
    element: <ErrorPage type={''} />,
  },
  {
    path: '/error',
    element: <ErrorPage type={'Unexpected'} />,
  },
]);

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isVisible = useSelector((state: RootState) => state.sort.visible);

  useEffect(() => {
    dispatch(getEmployeesList());
  }, [dispatch]);

  return (
    <div className="page">
      <RouterProvider router={router} />
      {isVisible && <Sort />}
    </div>
  );
};

export default App;
