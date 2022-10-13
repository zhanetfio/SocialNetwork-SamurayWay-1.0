import React from 'react';
import Header from "./Header";
import axios from "axios";
import {AuthStateType, setUserDataAC} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Dispatch} from "redux";


type MapDispatchToPropsType = {
    setUserDataAC: (id: number, email: string, login: string) => void
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
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(response => {
            if (response.data.resultCode === 0) {
                let{id,login,email}=response.data.data;
                this.props.setUserDataAC(id, email,login)
            }

            })

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

const mapDispatchToProps = (dispatch:Dispatch): MapDispatchToPropsType => {
    return {
        setUserDataAC: (id: number, email: string, login: string) =>{
        dispatch(setUserDataAC(id,email,login))
        }
    }
    }

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);