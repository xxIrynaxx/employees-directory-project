import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '@/store';
import { searchBarText, selectSort } from '../../navigationSelector';
import { clearInput, searchEmployees } from '../../searchBarSlice';
import { toggleVisibility } from '../../sortSlice';
import './search-bar.scss';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const text = useSelector(searchBarText);
  const sortType = useSelector(selectSort);
  const dispatch = useDispatch<AppDispatch>();

  const queryParams = Object.fromEntries([...searchParams]);
  const searchText = queryParams.searchText || '';

  const changeSearchBar = (searchText: string) => {
    dispatch(searchEmployees(searchText));
    localStorage.setItem('searchText', searchText);
    if (searchText.trim() === '') {
      const { searchText, ...restParams } = queryParams;
      setSearchParams(restParams);
    } else {
      setSearchParams({ ...queryParams, searchText: searchText });
    }
  };

  const handleClearInput = () => {
    dispatch(clearInput());
    localStorage.removeItem('searchText');
    const { searchText, ...restParams } = queryParams;
    setSearchParams(restParams);
  };

  useEffect(() => {
    const savedSearchText = searchText || localStorage.getItem('searchText');
    if (savedSearchText) {
      dispatch(searchEmployees(savedSearchText));
    }
  }, [dispatch, searchText]);

  return (
    <div className="search-bar">
      <div className="search-bar__enter">
        <img src="/assets/icon/search.svg" alt="Search icon" />
        <input
          onChange={e => changeSearchBar(e.target.value)}
          type="text"
          value={text}
          placeholder="Enter name, tag, email..."
          className="search-bar__input"
        />
        {text.length === 0 && (
          <>
            {sortType === 'Sort by alphabet' ? (
              <img
                src="/assets/icon/list-ui-alt.svg"
                alt="Sort icon"
                className={`search-bar__sort-icon`}
                onClick={() => dispatch(toggleVisibility())}
              />
            ) : (
              <img
                src="/assets/icon/list-ui-alt-active.svg"
                alt="Sort icon"
                className={`search-bar__sort-icon`}
                onClick={() => dispatch(toggleVisibility())}
              />
            )}
          </>
        )}
      </div>
      {text.length > 0 && (
        <div className="search-bar__cancel-enter" onClick={() => handleClearInput()}>
          Cancel
        </div>
      )}
    </div>
  );
};
export default SearchBar;
