import React from 'react';
import Header from "./Header";
import {AuthStateType, getAuthUserDataTC} from "../../redux/auth-reducer";
import {connect} from "react-redux";


type MapDispatchToPropsType = {
    getAuthUserDataTC: ()=> void

}
type MapStateToPropsType = {
    id: number | null
    email: string |null
    login: string | null
    isAuth: boolean
}
export type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {

        this.props.getAuthUserDataTC()

    }

    render() {
        return (
            <Header userId={this.props.id}
                    email={this.props.email}
                    login={this.props.login}
                    isAuth={this.props.isAuth}/>
        );
    }
}

const mapStateToProps = (state: AuthStateType): MapStateToPropsType => {
    return {
        id: state.userId,
        email: state.email,
        login: state.login,
        isAuth: state.isAuth
    }

}

export default connect(mapStateToProps, {getAuthUserDataTC})(HeaderContainer);