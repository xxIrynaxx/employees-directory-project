import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '@/store';
import { filterSortSearchEmployees } from '@/utils/utils';
import moment from 'moment';
import './employees-list.scss';

const EmployeesList = () => {
  const employees = useSelector(filterSortSearchEmployees);
  const sortType = useSelector((state: RootState) => state.sort.sortType);

  let currentYear: number | null = null;

  return (
    <ul className="employees__list">
      {employees.map(employee => {
        const birthYear = new Date(employee.birthDate).getFullYear();

        const showYear = birthYear !== currentYear;
        if (showYear) {
          currentYear = birthYear;
        }

        return (
          <React.Fragment key={employee.id}>
            {sortType === 'Sort by birthday'
              ? showYear && (
                  <li key={`separator-${birthYear}`} className="employees__year-separator">
                    <span className="employees__line"></span>
                    <div className="employees__year-label">{birthYear}</div>
                    <span className="employees__line"></span>
                  </li>
                )
              : ''}
            <li key={employee.id} className="employees__list-item">
              <img className="employees__img" src={employee.avatar} alt={employee.name} />
              <div className="employees__information">
                <Link to={`/employees/${employee.id}`}>
                  <div className="employees__name-tag">
                    <div className="employees__name">{employee.name}</div>
                    <div className="employees__tag">{employee.tag}</div>
                    {sortType === 'Sort by birthday' ? (
                      <span className="employees__birthdate">
                        {moment(employee.birthDate).format('DD MMM')}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </Link>
                <div className="employees__position">
                  {employee.position[0].toUpperCase() + employee.position.substring(1)}
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
