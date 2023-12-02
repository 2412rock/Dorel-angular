// reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as ServiciiActions from './actions';

export interface SelectedServicii {
  servicii: string[];
  judete: string[];
  remainingServicii: string[];
}

export interface AppState {
  selectedServicii: SelectedServicii;
}

export const initialState: AppState = {
  selectedServicii: {
    servicii: [],
    judete: [],
    remainingServicii: [],
  },
};

export const serviciiReducer = createReducer(
  initialState,
  on(ServiciiActions.setSelectedServicii, (state, { selectedServicii }) => ({
    ...state,
    selectedServicii,
  }))
);