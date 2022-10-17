import React from 'react';
import s from './Profile.module.css'
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, PostType, ProfilePageType, ProfileType} from "../../redux/profile-reducer";
import {AppRootStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

type MapStateToPropsType = {
    profile: ProfilePageType
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
    getUserProfile: (userId: string) => void
}
export type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & {

    params: {
        userId: string
    }
}

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props?.params?.userId;
        this.props.getUserProfile(userId ? userId : '2')
    }

    render() {
        return (
            <div className={s.content}>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        );
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profile: state.profile,
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
    export default compose<React.ComponentType>(
        connect(mapStateToProps, {getUserProfile}),
        withParams,
        withAuthRedirect
    )(ProfileContainer);