import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { tasksReducer } from "./tasks/tasks.reducer";





export interface State {}; 

export const reducers: ActionReducerMap<State> = {
    tasks: tasksReducer
};

export const metaReducers: MetaReducer<State>[] = [];