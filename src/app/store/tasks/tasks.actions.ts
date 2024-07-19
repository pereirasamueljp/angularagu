import { createAction, props } from '@ngrx/store';

export const taskActions = {
    add: createAction('[TaskList Component] Increment', props<{playload: any}>()),
    remove: createAction('[TaskList Component] Remove', props<{playload: any}>()),
    update: createAction('[TaskList Component] Update', props<{playload: any}>()),
    reset: createAction('[TaskList Component] Reset', props<{playload: any}>()),
}
