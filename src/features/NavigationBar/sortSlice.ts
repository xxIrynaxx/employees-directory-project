import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortTypes } from '@/types/employeesDirectoryTypes';

const getInitialSortType = (): SortTypes => {
  const savedSortType = localStorage.getItem('sortType');
  return savedSortType === 'birthday' ? 'Sort by birthday' : 'Sort by alphabet';
};

type SortState = {
  sortType: SortTypes;
  visible: boolean;
};

const initialState: SortState = {
  sortType: getInitialSortType(),
  visible: false,
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortTypes>) => {
      state.sortType = action.payload;
    },
    toggleVisibility: state => {
      state.visible = !state.visible;
    },
  },
});

export const isSortType = (value: any): value is SortTypes => {
  return value === 'Sort by alphabet' || value === 'Sort by birthday';
};

export const { setSortType, toggleVisibility } = sortSlice.actions;
export default sortSlice.reducer;
