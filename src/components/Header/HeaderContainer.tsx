import React from 'react';
import Header from "./Header";
import axios from "axios";
import {AuthStateType, getAuthUserDataTC, setUserDataAC} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {authAPI} from "../../api/api";


type MapDispatchToPropsType = {
    getAuthUserDataTC: ()=> void
}
type MapStateToPropsType = {
    id: number
    email: string
    login: string
    isAuth: boolean
}
export type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {

        this.props.getAuthUserDataTC()

    }

    render() {
        return (
            <Header id={this.props.id}
                    email={this.props.email}
                    login={this.props.login}
                    isAuth={this.props.isAuth}/>
        );
    }
}

const mapStateToProps = (state: AuthStateType): MapStateToPropsType => {
    return {
        id: state.id,
        email: state.email,
        login: state.login,
        isAuth: state.isAuth
    }

}



export default connect(mapStateToProps, {getAuthUserDataTC})(HeaderContainer);