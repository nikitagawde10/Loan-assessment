import { createAction, props } from '@ngrx/store';
export const addCustomPermission = createAction(
  '[Perm] Add Custom Permission',
  props<{ userId: string; permissionIds: string[] }>()
);
