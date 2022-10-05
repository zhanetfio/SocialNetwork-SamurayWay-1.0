import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {combineReducers, legacy_createStore} from "redux";
import {usersReducer} from "./users-reducer";


const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    users:usersReducer
})
export const store = legacy_createStore(rootReducer);


export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;