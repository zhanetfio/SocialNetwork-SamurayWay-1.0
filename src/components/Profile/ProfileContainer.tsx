import React from 'react';
import s from './Profile.module.css'
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileType, setStatus, updateStatus} from "../../redux/profile-reducer";
import {AppRootStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}
export type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & {

    params: {
        userId: string
    }
}

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId: number | null = +this.props.params.userId;
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <div className={s.content}>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppRootStateType) => {
    return {
        profile: state.profile.profile,
        status: state.profile.status,
    }
}
/* const AuthRedirectComponent = withAuthRedirect(ProfileContainer);

 export function withParams(Component: React.ElementType) {
     return (props: any) => <Component {...props} params={useParams()}/>;
 }
*/

/*
    export default withAuthRedirect(withParams(connect(mapStateToProps, {getUserProfile})(AuthRedirectComponent)))
*/

export function withParams(Component: React.ElementType) {
    return (props: any) => <Component {...props} params={useParams()}/>
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, setStatus, getStatus, updateStatus}),
    withParams,
    withAuthRedirect
)(ProfileContainer);