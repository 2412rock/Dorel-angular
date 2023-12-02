import { createAction, props } from '@ngrx/store';
import { SelectedServicii } from './reducer';

export const setSelectedServicii = createAction(
  '[Selected Servicii] Set Selected Servicii',
  props<{ selectedServicii: SelectedServicii }>()
);