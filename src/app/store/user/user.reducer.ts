import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { remove, findIndex, isArray, cloneDeep } from 'lodash'
import { userActions } from './user.actions';
import { ActionCallback } from '../models/action-playload';
import { User } from '../../models/user.model';

interface UserState {
    user: User | null
}

export const userInitialState: UserState = {
    user: null
};


export const UserReducer = createReducer(
    userInitialState,
    on(userActions.add, addFunction),
    on(userActions.update, updateFunction),
    on(userActions.reset, resetFunction)
);

function addFunction(state: UserState, action: ActionCallback<User | null>) {
    let newState = cloneDeep(state);

    if (!!action.playload) {
        newState.user = action.playload;
    }

    return newState;
}

function updateFunction(state: UserState, action: ActionCallback<User | null>) {
    let newState = cloneDeep(state);

    if (!!action.playload) {
        newState.user = action.playload;
    }

    return newState;
}

function resetFunction(state: UserState, action: ActionCallback<User | null>) {
    let newState = cloneDeep(state);
    newState.user = null;

    return newState;
}