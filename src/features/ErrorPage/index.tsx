import React, { useEffect } from 'react';
import { ErrorType } from '@/types/employeesDirectoryTypes';
import { errorDetails } from './errorSlice';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './error-page.scss';

type ErrorProps = {
  type: ErrorType;
};

const ErrorPage: React.FC<ErrorProps> = ({ type }) => {
  const { errorImage, errorTitle, errorDescription, link } = errorDetails[type];

  const isMobile = useMediaQuery({ query: '(max-width: 1279px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const navigate = useNavigate();

  useEffect(() => {
    if (type === 'Unexpected' && isMobile) {
      navigate('/error');
    }
  }, [isMobile, type, navigate]);

  const errorUnexpectedClass =
    type === 'Unexpected' && isMobile
      ? 'error__unexpected-mobile'
      : type === 'Unexpected' && isDesktop
      ? 'error__unexpected-desktop'
      : 'error';
  return (
    <div className={errorUnexpectedClass}>
      <img className="error__img" src={errorImage} alt="Error" />
      <h4 className="error__title">{errorTitle}</h4>
      <p className="error__description">{errorDescription}</p>
      {link && (
        <a className="error__link" href={link}>
          Reload page
        </a>
      )}
    </div>
  );
};

export default ErrorPage;
