import { RootState } from '@/store';

export const selectSort = (state: RootState) => state.sort.sortType;
export const selectVisibleSort = (state: RootState) => state.sort.visible;
export const searchBarText = (state: RootState) => state.search.text;
export const selectFilter = (state: RootState) => state.position.positionFilter;
