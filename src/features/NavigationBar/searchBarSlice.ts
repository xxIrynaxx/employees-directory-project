import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchBy } from '@/types/employeesDirectoryTypes';

type SearchBarState = {
  text: string;
  serchBarType: SearchBy;
};

const initialState: SearchBarState = {
  text: '',
  serchBarType: 'name',
};

const SearchBarSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchEmployees: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { searchEmployees } = SearchBarSlice.actions;
export default SearchBarSlice.reducer;
