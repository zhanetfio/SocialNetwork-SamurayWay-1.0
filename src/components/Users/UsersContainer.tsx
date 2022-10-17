import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {
    follow,
     getUsersTC,
     setUsersCurrentPage,
     toggleIsFollowingProgress, unFollow,

    UserType
} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";

type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching:boolean
    followingInProgress:Array<number>
}
type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    //setUsers: (users: Array<UserType>) => void
    setUsersCurrentPage: (currentPage: number) => void
   // setUsersTotalCount: (totalCount: number) => void
    //toggleIsFetching: (isFetching: boolean) => void
    toggleIsFollowingProgress:(followingInProgress:boolean,userId:number)=>void
    getUsersTC: (currentPage: number, pageSize: number)=>(dispatch:Dispatch)=> void

}
export type UsersMapPropsType = MapStateToPropsType & MapDispatchToPropsType


class UsersContainer extends React.Component<UsersMapPropsType> {

    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
                }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersTC(pageNumber, this.props.pageSize)
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
                   toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                   followingInProgress={this.props.followingInProgress}
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
        followingInProgress: state.users.followingInProgress
    }
}

const mapDispatchToProps = (): MapDispatchToPropsType => {
    return {
        follow/*: (userId: number) => {
            dispatch(followSuccessAC(userId))
        }*/,
        unFollow/*: (userId: number) => {
            dispatch(unFollowSuccessAC(userId))
        }*/,
        /*setUsersACs: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },*/
        setUsersCurrentPage/*: (currentPage: number) => {
            dispatch(setUsersCurrentPageAC(currentPage))
        }*/,
      /*  setUsersTotalCountAC*//*: (totalCount: number) => {
            dispatch(setUsersTotalCountAC(totalCount))
        }*/
      /*  toggleIsFetchingAC/!*: (isFetching: boolean) =>{
            dispatch(toggleIsFetchingAC(isFetching))
        }*!/,*/
        toggleIsFollowingProgress/*:(followingInProgress:boolean,userId:number)=>{
            dispatch(toggleIsFollowingProgressAC(followingInProgress,userId))
        }*/,
        getUsersTC/*:(currentPage:number,pageSize:number)=> {
            dispatch(getUsersTC(currentPage,pageSize)(dispatch))
        }*/

    }
}

export const UserContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);


