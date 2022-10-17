import React from 'react';
import {ProfileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader/Preloader";
import  s from "./ProfileInfo.module.css"

type ProfileInfoPropsType = { profile: ProfileType | null }

const ProfileInfo = (props: ProfileInfoPropsType) => {
        if (!props.profile) {
            return <Preloader/>
        } else {
            return (
                <div>
                    <div>
                        <img
                            src='https://physics.uconn.edu/wp-content/uploads/sites/2234/2018/10/cmz_3color_full_image-1200x400.jpg'
                            alt='picture'/>
                    </div>
                    <div className={s.descriptionBlock}>
                        <img
                            src={props.profile.photos?.small} alt={'avatar'}/>
                    </div>
                </div>
            );
        }
    }
    export default ProfileInfo;