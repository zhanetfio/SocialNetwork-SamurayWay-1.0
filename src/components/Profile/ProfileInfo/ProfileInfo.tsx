import React from 'react';
import {ProfileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css"
import ProfileStatus from "./ProfileStatus";
import {useAppSelector} from "../../common/hooks/hooks";

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus:(status: string) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
   const avatar=useAppSelector(state=>state.profile.profile?.photos?.large)

    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                <div className={s.descriptionBlock}>
                    <img
                        src={avatar} alt={'avatar'}/>
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>

                </div>
            </div>
        );
    }
}
export default ProfileInfo;