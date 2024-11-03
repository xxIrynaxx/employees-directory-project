import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortTypes } from '@/types';
import './index.scss';

type SearchBarProps = {
  toggleModal: () => void;
  sortType: SortTypes;
};

const SearchBar: React.FC<SearchBarProps> = ({ toggleModal, sortType }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [text, setText] = useState<string>('');
  const initialSearchText = searchParams.get('searchText') || '';

  const queryParams = Object.fromEntries([...searchParams]);

  const changeSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setText(inputText);

    if (inputText.trim() === '') {
      const { searchText, ...restParams } = queryParams;
      setSearchParams(restParams);
    } else {
      setSearchParams({ ...queryParams, searchText: inputText });
    }
  };

  const handleClearInput = () => {
    setText('');
    const { searchText, ...restParams } = queryParams;
    setSearchParams(restParams);
  };

  useEffect(() => {
    if (initialSearchText !== text) {
      setText(initialSearchText);
    }
  }, [initialSearchText]);

  return (
    <div className="search-bar">
      <div className="search-bar__enter">
        <img src="/assets/icon/search.svg" alt="Search icon" />
        <input
          onChange={changeSearchBar}
          type="text"
          value={text}
          placeholder="Enter name, tag, email..."
          className="search-bar__input"
        />
        {text.length === 0 && (
          <img
            src={`/assets/icon/list-ui-alt${sortType === 'Sort by alphabet' ? '' : '-active'}.svg`}
            alt="Sort icon"
            className="search-bar__sort-icon"
            onClick={() => toggleModal()}
          />
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
