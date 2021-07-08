import { State } from '@store';
import { DeepPartial } from '@utils';

export const state: DeepPartial<State> = {
  app: {
    isSearching: false,
    isLoading: false,
    error: false,
  },
};
