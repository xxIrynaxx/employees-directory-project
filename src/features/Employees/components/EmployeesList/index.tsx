import React from 'react';
import moment from 'moment';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Employee } from '@/types';
import './index.scss';

type EmployeesListProps = {
  employees: Employee[];
};

const EmployeesList: React.FC<EmployeesListProps> = ({ employees }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const sortType = searchParams.get('sortBy') === 'birthDate';
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
            {sortType && showYear && (
              <li key={`separator-${birthYear}`} className="employees__year-separator">
                <div className="employees__year-label">{birthYear}</div>
              </li>
            )}
            <li className="employees__list-item">
              <img className="employees__img" src={avatar} alt={name} />
              <div className="employees__information">
                <Link to={`/employees/${id}`} state={{ from: location.pathname + location.search }}>
                  <div className="employees__name-tag">
                    <div className="employees__name">{name}</div>
                    <div className="employees__tag">{tag}</div>
                    {sortType && (
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
