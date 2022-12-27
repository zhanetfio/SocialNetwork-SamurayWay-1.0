import {ProfileActionTypes, profileReducer} from "./profile-reducer";
import {DialogsActionTypes, dialogsReducer} from "./dialogs-reducer";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {UserActionsType, usersReducer} from "./users-reducer";
import {AuthActionsType, authReducer} from "./auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";


const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    users: usersReducer,
    auth: authReducer
})

//store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;

//types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppActionsType = AuthActionsType | ProfileActionTypes | DialogsActionTypes | UserActionsType
