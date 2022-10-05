import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, InitialStateType, setUsersAC, unFollowAC, UserType} from "../../redux/users-reducer";

type MapStateToPropsType = {
    users:InitialStateType
}
type MapDispatchToPropsType = {
follow:(userId:number)=>void
    unFollow:(userId:number)=>void
    setUsers:(users:Array<UserType>)=>void
}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps=(state:AppRootStateType):MapStateToPropsType=>{
    return {
        users: state.users
    }
}

const mapDispatchToProps=(dispatch:Dispatch):MapDispatchToPropsType=>{
return {
    follow:(userId:number)=>{
        dispatch(followAC(userId))
    },
    unFollow:(userId:number)=> {
        dispatch(unFollowAC(userId))
    },
    setUsers:(users:Array<UserType>)=>{
        dispatch(setUsersAC(users))
    }
}
}
export const UsersContainer=connect(mapStateToProps,mapDispatchToProps)(Users);