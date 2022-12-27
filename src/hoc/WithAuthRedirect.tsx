import React, {Component, ComponentType} from 'react';
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsType = {
    isAuth: boolean
}
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}


export function withAuthRedirect<T extends Component>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStateToPropsType) => {

        let {isAuth, ...restProps} = props

        if (!isAuth) {
            return <Navigate to={'/login'}/>;
        }
        return <Component {...restProps as T}/>;
    }
    return connect(mapStateToProps)(RedirectComponent)
}

