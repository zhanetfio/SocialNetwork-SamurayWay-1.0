import React from 'react';
import {addPostAC, PostType, updateNewPostAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";


type MapStateToPropsType={
    postsData:PostType[],
    newPostText:string
}
type MapDispatchToPropsType={
    addPost:()=>void
    updateNewPost:(newText:string)=>void
}
export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType
const mapStateToProps = (state:AppRootStateType):MapStateToPropsType => {
    return {
        postsData: state.profile.postsData,
        newPostText: state.profile.newPostText
    }
}
const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType=> {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        updateNewPost: (newText) => {
            dispatch(updateNewPostAC(newText))
        }
    }
}
const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)
export default MyPostsContainer;