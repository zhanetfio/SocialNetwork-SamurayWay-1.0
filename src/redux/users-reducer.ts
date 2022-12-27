import {usersAPI} from "../api/api";
import {AppDispatch, AppThunk} from "./redux-store";

export type FollowAT = {
    type: 'FOLLOW'
    userId: number
}
export type UnFollowAT = {
    type: 'UNFOLLOW'
    userId: number
}
export type SetUsersAT = {
    type: 'SET-USERS'
    users: Array<UserType>
}
export  type  SetUsersCurrentPageAT = {
    type: 'SET-USERS-CURRENT-PAGE',
    currentPage: number
}
export type SetUsersTotalCountAT = {
    type: 'SET-USERS-TOTAL-COUNT'
    count: number
}
export type ToggleIsFetchingAT = {
    type: "TOGGLE-IS-FETCHING"
    isFetching: boolean
}
export type ToggleIsFollowingProgressAT = {
    type: 'TOGGLE-IS-FOLLOWING-PROGRESS'
    isFetching: boolean
    userId: number
}
export type UserActionsType =
    FollowAT
    | UnFollowAT
    | SetUsersAT
    | SetUsersCurrentPageAT
    | SetUsersTotalCountAT
    | ToggleIsFetchingAT
    | ToggleIsFollowingProgressAT

export type UserType = {
    name: string,
    id: number,
    //uniqueUrlName: string | null,
    photos: {
        small: string | null,
        large: string | null
    },
    status: string | null,
    followed: boolean
}

export type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>

}
const InitialState = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []

}


export const usersReducer = (state: InitialStateType = InitialState, action: UserActionsType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.userId
                        ? {...user, followed: true}
                        : user)
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.userId
                        ? {...user, followed: false}
                        : user)
            }
        }
        case 'SET-USERS': {
            return {...state, users: action.users}
        }
        case 'SET-USERS-CURRENT-PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET-USERS-TOTAL-COUNT':
            return {
                ...state,
                totalUserCount: action.count
            }
        case 'TOGGLE-IS-FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE-IS-FOLLOWING-PROGRESS': {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}
export const followSuccessAC = (userId: number): FollowAT => ({type: 'FOLLOW', userId});
export const unFollowSuccessAC = (userId: number): UnFollowAT => ({type: 'UNFOLLOW', userId});
export const setUsersAC = (users: Array<UserType>): SetUsersAT => ({type: 'SET-USERS', users});
export const setUsersCurrentPage = (currentPage: number): SetUsersCurrentPageAT => ({
    type: 'SET-USERS-CURRENT-PAGE',
    currentPage
})

export const setUsersTotalCountAC = (totalCount: number): SetUsersTotalCountAT => ({
    type: 'SET-USERS-TOTAL-COUNT',
    count: totalCount
})
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingAT => ({
    type: "TOGGLE-IS-FETCHING",
    isFetching: isFetching
})
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressAT => ({
    type: 'TOGGLE-IS-FOLLOWING-PROGRESS',
    isFetching,
    userId
})

export const getUsersTC=(currentPage:number,pageSize:number):AppThunk=>async (dispatch:AppDispatch)=> {
    dispatch(toggleIsFetchingAC(true))
    const data=await usersAPI.getUsers(currentPage, pageSize)
            dispatch(setUsersAC(data.items))
            dispatch(setUsersTotalCountAC(data.totalCount))
            dispatch(toggleIsFetchingAC(false))
}

    export const follow = (userId: number):AppThunk=>async (dispatch:AppDispatch) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        const response=await  usersAPI.follow(userId)
            if (response.data.resultCode === 0) {
                dispatch(followSuccessAC(userId))
            }
            dispatch(toggleIsFollowingProgress(false, userId))

    }
    export const unFollow = (userId: number):AppThunk=>async (dispatch:AppDispatch) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        const response=await usersAPI.unFollow(userId)
            if (response.data.resultCode === 0) {
                dispatch(unFollowSuccessAC(userId))
            }
            dispatch(toggleIsFollowingProgress(false, userId))

    }
