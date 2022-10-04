import React from 'react';
import s from './Profile.module.css'
import MyPostsContainer from "./My posts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


 type ProfilePropsType ={}

const Profile= (props:ProfilePropsType) => {

    return (
        <div className={s.content}>
          <ProfileInfo/>
            <MyPostsContainer />
        </div>
    );
};

export default Profile;