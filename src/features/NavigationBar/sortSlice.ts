import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortTypes } from '@/types/employeesDirectoryTypes';

const savedSortType = (localStorage.getItem('sortType') as SortTypes) || 'Sort by alphabet';

interface SortState {
  sortType: SortTypes;
  visible: boolean;
}

const initialState: SortState = {
  sortType: savedSortType,
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

export const { setSortType, toggleVisibility } = sortSlice.actions;
export default sortSlice.reducer;
