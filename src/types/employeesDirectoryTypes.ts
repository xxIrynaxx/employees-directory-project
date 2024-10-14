import SearchBar from '@/features/NavigationBar/components/SearchBar/SearchBar';

export type Employee = {
  id: string;
  name: string;
  email: string;
  tag: string;
  position: string;
  phone: string;
  birthDate: number;
  avatar: string;
};

export type FilterByPosition = 'All' | 'Designers' | 'Analysts' | 'Managers' | 'iOS' | 'Android';

export const positionFilterList: FilterByPosition[] = [
  'All',
  'Designers',
  'Analysts',
  'Managers',
  'iOS',
  'Android',
];

export type SortTypes = 'Sort by alphabet' | 'Sort by birthday';

export type SearchBy = 'name' | 'tag' | 'email';

export type TypeLoading = 'loading' | 'completed' | 'failed';

export type ErrorType = '' | 'NotFound' | 'Unexpected';

export type ErrorObject = {
  errorImage: string;
  errorTitle: string;
  errorDescription: string;
  link: string;
};
