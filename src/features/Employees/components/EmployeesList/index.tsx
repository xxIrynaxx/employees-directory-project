import React from 'react';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import { Employee, SortTypes } from '@/types';
import './index.scss';

type EmployeesListProps = {
  employees: Employee[];
  sortType: SortTypes;
};

const EmployeesList: React.FC<EmployeesListProps> = ({ employees, sortType }) => {
  const location = useLocation();
  let currentYear: number | null = null;

  return (
    <ul className="employees__list">
      {employees.map(({ birthDate, id, avatar, name, tag, position }) => {
        const birthYear = new Date(birthDate).getFullYear();

        const showYear = birthYear !== currentYear;
        if (showYear) {
          currentYear = birthYear;
        }

        return (
          <React.Fragment key={id}>
            {sortType === 'Sort by birthday' && showYear && (
              <li key={`separator-${birthYear}`} className="employees__year-separator">
                <span className="employees__line"></span>
                <div className="employees__year-label">{birthYear}</div>
                <span className="employees__line"></span>
              </li>
            )}
            <li className="employees__list-item">
              <img className="employees__img" src={avatar} alt={name} />
              <div className="employees__information">
                <Link to={`/employees/${id}`} state={{ from: location.pathname + location.search }}>
                  <div className="employees__name-tag">
                    <div className="employees__name">{name}</div>
                    <div className="employees__tag">{tag}</div>
                    {sortType === 'Sort by birthday' && (
                      <span className="employees__birthdate">
                        {moment(birthDate).format('DD MMM')}
                      </span>
                    )}
                  </div>
                </Link>
                <div className="employees__position">
                  {position[0].toUpperCase() + position.substring(1)}
                </div>
              </div>
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default EmployeesList;
