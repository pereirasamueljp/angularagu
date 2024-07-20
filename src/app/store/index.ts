import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { TasksReducer } from "./tasks/tasks.reducer";
import { UserReducer } from "./user/user.reducer";





export interface State {}; 

export const reducers: ActionReducerMap<State> = {
    tasks: TasksReducer,
    user: UserReducer
};

export const metaReducers: MetaReducer<State>[] = [];