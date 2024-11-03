import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { getEmployeesList } from './gateways';
import MainPage from './layout/MainPage/index';
import EmployeeProfile from './features/EmployeeProfile/index';
import ErrorPage from './features/ErrorPage/index';
import './styles/common.scss';

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
    element: <ErrorPage type="Unexpected" />,
  },
]);

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getEmployeesList());
  }, [dispatch]);

  return (
    <div className="page">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
