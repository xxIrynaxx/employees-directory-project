import React from 'react';
import Employee from './components/Employee/Employee';
import './components/Employee/employee-profile.scss';

const EmployeeProfile = () => {
  return (
    <div className="employee-profile">
      <Employee />
    </div>
  );
};

export default EmployeeProfile;
