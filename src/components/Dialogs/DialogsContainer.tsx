import React from 'react';

import {MessagePageType, sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";


type MapStateToPropsType = {
    messagesPage: MessagePageType
}
type MapDispatchToPropsType = {
    sendMessageHandler: () => void
    ChangeNewMessageHandler: (body: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        messagesPage: state.dialogs
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
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);


export default DialogsContainer;