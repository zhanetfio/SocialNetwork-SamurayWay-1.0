import React from 'react';
import s from './Profile.module.css'
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {PostType, ProfilePageType, ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {useParams} from 'react-router-dom';

type MapStateToPropsType ={
    postsData: Array<PostType>
    newPostText: string
    profile: ProfileType | null
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void

}
export type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & {
    params: {
        userId: string
    }
}
/*export type ProfileContainerPropsType = {
    postsData: Array<PostType>
    newPostText: string
    profile: ProfileType | null
    setUserProfile: (profile: ProfileType) => void
}*/

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props?.params?.userId;

        this.getProfile(userId ? userId : '2')
    }
    getProfile = (userId: string = '2') => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(res => {
                this.props.setUserProfile(res.data)
            })
    }

    render() {
        return (
            <div className={s.content}>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        );
    }
}

const mapStateToProps = (state: ProfilePageType) => ({
    postsData: state.postsData,
    profile: state.profile,
    newPostText: state.newPostText


})
function withParams(Component: React.ElementType) {
    return (props: any) => <Component {...props} params={useParams()}/>;
}

export default (withParams(connect(mapStateToProps, {setUserProfile})(ProfileContainer)))