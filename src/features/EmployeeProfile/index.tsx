import React, { useEffect } from 'react';
import './employee-profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getEmployeeProfile } from './EmployeeProfileSlice';
import { useParams } from 'react-router-dom';
import { RootState } from '@/store';
import { Link } from 'react-router-dom';

const EmployeeProfile = () => {
  const { id } = useParams();
  const { avatar, name, tag, position, birthDate, phone } = useSelector((state: RootState) => ({
    avatar: state.employeeProfile.avatar,
    name: state.employeeProfile.name,
    tag: state.employeeProfile.tag,
    position: state.employeeProfile.position,
    birthDate: state.employeeProfile.birthDate,
    phone: state.employeeProfile.phone,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getEmployeeProfile(id));
    }
  }, [dispatch, id]);

  return (
    <div className="employee-profile">
      <div className="employee-profile__card-info">
        <Link to="/">
          <img
            src="/assets/icon/left-arrow.png"
            alt="Left arrow exit profile"
            className="employee-profile__exit"
          />
        </Link>
        <div className="employee-profile__card">
          <img className="employee-profile__card-img" src={avatar} alt={name} />
          <div className="employee-profile__card-information">
            <div className="employee-profile__card-name-tag">
              <div className="employee-profile__card-name">{name}</div>
              <div className="employee-profile__card-tag">{tag}</div>
            </div>
            <div className="employee-profile__card-position">
              {position ? `${position[0].toUpperCase()}${position.substring(1)}` : ''}
            </div>
          </div>
        </div>
      </div>
      <div className="employee-profile__additional-info">
        <div className="employee-profile__birthdate">
          <img
            src="/assets/icon/favorite.png"
            alt="Star"
            className="employee-profile__birthdate-img"
          />
          <div className="employee-profile__birthdate-date">
            {moment(birthDate).format('D MMMM YYYY')}
          </div>
          <div className="employee-profile__birthdate-year">
            {`${moment().diff(birthDate, 'years')} years`}
          </div>
        </div>
        <div className="employee-profile__phone">
          <img
            src="/assets/icon/phone-alt.png"
            alt="Phone"
            className="employee-profile__phone-img"
          />
          <div className="employee-profile__phone-number">{phone}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
