import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SelectedServicii, AppState } from './reducer';

export const selectFeatureState = createFeatureSelector<AppState>('app');

export const selectSelectedServicii = createSelector(
  selectFeatureState,
  (state: AppState) => state.selectedServicii
);
