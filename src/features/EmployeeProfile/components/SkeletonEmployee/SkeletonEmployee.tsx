import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './skeleton-employee.scss';

const SkeletonEmployee = () => {
  return (
    <>
      <div className="skeleton-profile">
        <div className="skeleton-profile__avatar">
          <Skeleton circle width={104} height={104} style={{ marginBottom: 24 }} />
          <Skeleton width="100%" height={28} style={{ marginBottom: 12 }} />
          <Skeleton width="100%" height={16} />
        </div>
      </div>
      <Skeleton width="40%" height={24} style={{ marginBottom: 44, marginLeft: 16 }} />
      <Skeleton width="40%" height={24} style={{ marginLeft: 16 }} />
    </>
  );
};

export default SkeletonEmployee;
