import React from 'react';
import moment from 'moment';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEmployeeById, selectLoading } from '../Employees/employeesSelector';
import { RootState } from '@/store';
import SkeletonEmployee from './components/EmployeeSkeleton';
import ErrorPage from '../ErrorPage';
import './employee-profile.scss';

const EmployeeProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const statusLoading = useSelector(selectLoading);
  const employee = useSelector((state: RootState) => selectEmployeeById(state, id!));

  if (statusLoading === 'loading') {
    return <SkeletonEmployee />;
  }

  if (!employee) {
    return <ErrorPage type="Unexpected" />;
  }

  const { avatar, name, tag, position, birthDate, phone } = employee;

  return (
    <div className="employee-profile">
      <div className="employee-profile__card-info">
        <Link to={location.state?.from || '/'}>
          <img
            src="/assets/icon/left.svg"
            alt="Left arrow exit profile"
            className="employee-profile__exit"
          />
        </Link>
        <div className="profile">
          <img className="profile__img" src={avatar} alt={name} />
          <div className="profile__information">
            <div className="profile__member">
              <div className="profile__name">{name}</div>
              <div className="profile__tag">{tag}</div>
            </div>
            <div className="profile__position">
              {position ? `${position[0].toUpperCase()}${position.substring(1)}` : ''}
            </div>
          </div>
        </div>
      </div>
      <div className="employee-profile__additional-info">
        <div className="birthday">
          <img src="/assets/icon/favorite.svg" alt="Star" className="birthday__img" />
          <div className="birthday__date">{moment(birthDate).format('D MMMM YYYY')}</div>
          <div className="birthday__year">{`${moment().diff(birthDate, 'years')} years`}</div>
        </div>
        <div className="phone">
          <img src="/assets/icon/phone-alt.svg" alt="Phone" className="phone__img" />
          <div className="phone__number">{phone}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
