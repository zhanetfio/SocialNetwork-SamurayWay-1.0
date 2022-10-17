import {Dispatch} from "redux";
import {authAPI} from "../api/api";

export  type AuthStateType = {
    id: number
    email: string
    login: string
    isAuth: boolean
}

const initialState = {
    id: 0,
    email: '',
    login: '',
    isAuth: false
}
export  type SetUserDataAT = {
    type: 'SET-USER-DATA',
    data: {
        id: number,
        email: string,
        login: string
    }
}

export type ActionsType = SetUserDataAT

export const authReducer = (state: AuthStateType = initialState, action: ActionsType): AuthStateType => {
    switch (action.type) {
        case 'SET-USER-DATA': {
            return {
                ...state,
                ...action.data, isAuth: true
            }
        }

        default:
            return state
    }

}

export const setUserDataAC = (id: number, email: string, login: string): SetUserDataAT => {
    return {
        type: 'SET-USER-DATA',
        data: {
            id,
            email,
            login
        }
    }
}
export const getAuthUserDataTC = () => (dispatch: Dispatch) => {

    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserDataAC(response.data.data.id, response.data.data.email, response.data.data.login))
            }

        })
}