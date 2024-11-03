import { ErrorType, ErrorObject } from '@/types';

export const errorDetails: Record<ErrorType, ErrorObject> = {
  '': {
    errorImage: '',
    errorTitle: '',
    errorDescription: '',
    link: '',
  },
  NotFound: {
    errorImage: '/assets/images/left-pointing-magnifying-glass.png',
    errorTitle: "We didn't find anyone",
    errorDescription: 'Try to adjust your request',
    link: '',
  },
  Unexpected: {
    errorImage: '/assets/images/flying-saucer.png',
    errorTitle: 'Unexpected error occurred...',
    errorDescription: 'Try again a bit later',
    link: '/',
  },
};
