import { createAction, props } from '@ngrx/store';

export const userActions = {
    add: createAction('[User] Add', props<{playload: any}>()),
    update: createAction('[User] Update', props<{playload: any}>()),
    reset: createAction('[User] Reset', props<{playload: any}>()),
}
