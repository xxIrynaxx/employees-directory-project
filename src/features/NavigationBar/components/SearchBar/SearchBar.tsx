import React, { useEffect } from 'react';
import './search-bar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { searchEmployees } from '../../searchBarSlice';
import { toggleVisibility } from '../../sortSlice';
import { SearchBy } from '@/types/employeesDirectoryTypes';

const SearchBar = () => {
  const text = useSelector((state: RootState) => state.search.text);
  const dispatch = useDispatch<AppDispatch>();

  const changeSearchBar = (searchText: string) => {
    dispatch(searchEmployees(searchText));
    localStorage.setItem('searchText', searchText);
  };

  useEffect(() => {
    const savedSearchText = localStorage.getItem('searchText');
    if (savedSearchText) {
      dispatch(searchEmployees(savedSearchText));
    }
  }, [dispatch]);

  return (
    <div className="search-bar">
      <div className="search-bar__enter">
        <img src="/assets/icon/search.png" alt="Search icon" />
        <input
          onChange={e => changeSearchBar(e.target.value)}
          type="text"
          value={text}
          placeholder="Enter name, tag, email..."
          className="search-bar__input"
        />
        <img
          src="/assets/icon/list-ui-alt.png"
          alt="Sort icon"
          className={`search-bar__sort-icon`}
          onClick={() => dispatch(toggleVisibility())}
        />
      </div>
    </div>
  );
};
export default SearchBar;
