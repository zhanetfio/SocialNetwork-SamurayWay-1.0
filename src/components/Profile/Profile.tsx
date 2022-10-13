import React from 'react';
import s from './Profile.module.css'
import MyPostsContainer from "./My posts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileContainerPropsType} from "./ProfileContainer";



const Profile= (props:ProfileContainerPropsType) => {

    return (
        <div className={s.content}>
          <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    );
};

export default Profile;