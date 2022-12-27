import {authAPI, LoginDataType} from "../api/api";
import {AppDispatch} from "./redux-store";

export  type AuthStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}


export type AuthActionsType = ReturnType<typeof setUserDataAC>


export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }

        default:
            return state
    }

}

export const setUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'SET-USER-DATA',
        payload: {
            id,
            email,
            login,
            isAuth
        }

    } as const
}

export const getAuthUserDataTC = () => (dispatch: AppDispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setUserDataAC(res.data.id, res.data.email, res.data.login, true))
            }

        })
}
export const setLoginDataTC = (data: LoginDataType) => (dispatch: AppDispatch) => {
    authAPI.login(data)
        .then(res => {
            dispatch(getAuthUserDataTC())
        })

}

export const setLogoutTC = () => (dispatch: AppDispatch) => {
    authAPI.logout()
        .then(res => {
            dispatch(setUserDataAC(null,null,null,false))
        })

}