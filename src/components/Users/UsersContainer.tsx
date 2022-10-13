import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {
    followAC,
    setUsersAC,
    setUsersCurrentPageAC, setUsersTotalCountAC, toggleIsFetchingAC,
    unFollowAC,
    UserType
} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching:boolean
}
type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setUsersCurrentPage: (currentPage: number) => void
    setUsersTotalCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}
export type UsersMapPropsType = MapStateToPropsType & MapDispatchToPropsType


class UsersContainer extends React.Component<UsersMapPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        // axios.get("https://social-network.samuraijs.com/api/1.0/users")
        //     .then(response => {
                usersAPI.getUsers(this.props.currentPage,this.props.pageSize)
                    .then(data => {
                        this.props.setUsers(data.items)
                        this.props.setUsersTotalCount(data.totalCount)
                        this.props.toggleIsFetching(false)
                    })

                }

    onPageChanged = (pageNumber: number) => {
        this.props.setUsersCurrentPage(pageNumber)

        usersAPI.getUsers(pageNumber,this.props.pageSize,).then(data => {
            this.props.setUsers(data.items)
        })
    }

    render() {
        return (
            <>
                {this.props.isFetching
                    ? <div><Preloader/></div>
                    : null}
            <Users totalUserCount={this.props.totalUserCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
            />
            </>
        );
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: state.users.users,
        pageSize: state.users.pageSize,
        totalUserCount: state.users.totalUserCount,
        currentPage: state.users.currentPage,
        isFetching:state.users.isFetching,
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
        },
        toggleIsFetching: (isFetching: boolean) =>{
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }
}

export const UserContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);


