import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {
    followAC,
    InitialStateType,
    setUsersAC,
    setUsersCurrentPageAC, setUsersTotalCountAC,
    unFollowAC,
    UserType
} from "../../redux/users-reducer";

type MapStateToPropsType = {
    users: InitialStateType
    pageSize: number
    totalUserCount: number
    currentPage: number
}
type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setUsersCurrentPage: (currentPage: number) => void
    setUsersTotalCount: (totalCount: number) => void
}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: state.users,
        pageSize: state.users.pageSize,
        totalUserCount: state.users.totalUserCount,
        currentPage: state.users.currentPage,

    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: number) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setUsersCurrentPage: (currentPage: number) => {
            dispatch(setUsersCurrentPageAC(currentPage))
        },
        setUsersTotalCount: (totalCount: number) => {
            dispatch(setUsersTotalCountAC(totalCount))
        }
    }
}
export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);