import React from 'react';

import {MessagePageType, sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {AuthStateType} from "../../redux/auth-reducer";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";


type MapStateToPropsType = {
    messagesPage: MessagePageType
    isAuth:AuthStateType
}
type MapDispatchToPropsType = {
    sendMessageHandler: () => void
    ChangeNewMessageHandler: (body: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        messagesPage: state.dialogs,
        isAuth:state.auth
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        sendMessageHandler: () => {
            dispatch(sendMessageAC())
        },
        ChangeNewMessageHandler: (body) => {
            dispatch(updateNewMessageBodyAC(body))
        }
    }
}
const AuthRedirectComponent=withAuthRedirect(Dialogs)
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);


export default DialogsContainer;