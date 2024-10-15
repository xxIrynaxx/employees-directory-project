import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterByPosition } from '@/types/employeesDirectoryTypes';
import { RootState } from '@/store';

type PositionFilter = {
  positionFilter: FilterByPosition;
};

const initialState: PositionFilter = {
  positionFilter: 'All',
};

const positionFilterSlice = createSlice({
  name: 'positionFilter',
  initialState,
  reducers: {
    setPositionFilter: (state, action: PayloadAction<FilterByPosition>) => {
      state.positionFilter = action.payload;
    },
  },
});

export const { setPositionFilter } = positionFilterSlice.actions;
export default positionFilterSlice.reducer;
