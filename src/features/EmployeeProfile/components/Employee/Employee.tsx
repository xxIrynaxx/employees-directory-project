import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getEmployeeProfile } from '@/gateway/gateway';
import moment from 'moment';
import ErrorPage from '@/features/ErrorPage';
import SkeletonEmployee from '../SkeletonEmployee/SkeletonEmployee';

const Employee = () => {
  const { id } = useParams();
  const employee = useSelector((state: RootState) => state.employeeProfile.employee);
  const isLoading = useSelector((state: RootState) => state.employeeProfile.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getEmployeeProfile(id));
    }
  }, [dispatch, id]);

  if (isLoading === 'failed') {
    return <ErrorPage type="Unexpected" />;
  }

  if (isLoading === 'loading') {
    return <SkeletonEmployee />;
  }

  return (
    <>
      <div className="employee-profile__card-info">
        <Link to="/">
          <img
            src="/assets/icon/left.svg"
            alt="Left arrow exit profile"
            className="employee-profile__exit"
          />
        </Link>
        <div className="employee-profile__card">
          <img className="employee-profile__card-img" src={employee.avatar} alt={employee.name} />
          <div className="employee-profile__card-information">
            <div className="employee-profile__card-name-tag">
              <div className="employee-profile__card-name">{employee.name}</div>
              <div className="employee-profile__card-tag">{employee.tag}</div>
            </div>
            <div className="employee-profile__card-position">
              {employee.position
                ? `${employee.position[0].toUpperCase()}${employee.position.substring(1)}`
                : ''}
            </div>
          </div>
        </div>
      </div>
      <div className="employee-profile__additional-info">
        <div className="employee-profile__birthdate">
          <img
            src="/assets/icon/favorite.svg"
            alt="Star"
            className="employee-profile__birthdate-img"
          />
          <div className="employee-profile__birthdate-date">
            {moment(employee.birthDate).format('D MMMM YYYY')}
          </div>
          <div className="employee-profile__birthdate-year">
            {`${moment().diff(employee.birthDate, 'years')} years`}
          </div>
        </div>
        <div className="employee-profile__phone">
          <img
            src="/assets/icon/phone-alt.svg"
            alt="Phone"
            className="employee-profile__phone-img"
          />
          <div className="employee-profile__phone-number">{employee.phone}</div>
        </div>
      </div>
    </>
  );
};

export default Employee;
