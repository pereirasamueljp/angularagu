import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { remove, findIndex, isArray, cloneDeep } from 'lodash'
import { taskActions } from './tasks.actions';
import { ActionCallback } from '../models/action-playload';

export interface TasksState {
    tasks: Task[]
}

export const tasksInitialState: TasksState = {
    tasks: []
};


export const TasksReducer = createReducer(
    tasksInitialState,
    on(taskActions.add, addFunction),
    on(taskActions.update, updateFunction),
    on(taskActions.remove, removeFunction),
    on(taskActions.reset, resetFunction)
);

function addFunction(state: TasksState, action: ActionCallback<Task[] | Task>) {
    let newState = cloneDeep(state)
    if (!isArray(action.playload)) {
        newState.tasks.push(action.playload); return newState;
    } else {
        newState.tasks = newState.tasks.concat((action.playload)); return newState;
    }
}

function removeFunction(state: TasksState, action: ActionCallback<Task[] | Task>) {
    let newState = cloneDeep(state)
    if (!isArray(action.playload)) {
        let task = action.playload
        remove(newState.tasks, item => item.id == task.id); return newState;
    } else {
        let tasks = action.playload;
        remove(newState.tasks, (el) => findIndex(tasks, (task) => task.id == el.id) >= 0); return newState;
    }
}

function updateFunction(state: TasksState, action: ActionCallback<Task[] | Task>) {
    let newState = cloneDeep(state)
    if (!isArray(action.playload)) {
        let task = action.playload
        var index = findIndex(newState.tasks, { id: task.id });
        newState.tasks.splice(index, 1, task);
        return newState;
    } else {
        let tasks = action.playload;
        if (tasks.length >= newState.tasks.length) {
            newState.tasks = newState.tasks.splice(0, newState.tasks.length).concat(tasks)
        } else {
            newState.tasks.map(element => {
                let index = findIndex(tasks, (task) => task.id == element.id);
                let newElement: Task;
                index >= 0 ? newElement = tasks[index] : newElement = element;
                return newElement;
            })
        }
    }
    return newState;
}

function resetFunction(state: TasksState) {
    let newState = cloneDeep(state)
    newState.tasks.splice(0, state.tasks.length); return newState;
}