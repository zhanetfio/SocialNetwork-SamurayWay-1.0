import React from 'react';
import {ProfileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css"
import ProfileStatus from "./ProfileStatus";

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus:(status: string) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                {/*  <div>
                        <img
                            src='https://physics.uconn.edu/wp-content/uploads/sites/2234/2018/10/cmz_3color_full_image-1200x400.jpg'
                            alt='picture'/>
                    </div>*/}
                <div className={s.descriptionBlock}>
                    <img
                        src={props.profile.photos.small} alt={'avatar'}/>
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>

                </div>
            </div>
        );
    }
}
export default ProfileInfo;