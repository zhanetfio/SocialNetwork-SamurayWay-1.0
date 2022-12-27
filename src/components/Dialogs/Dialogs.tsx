import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {sendMessageAC} from "../../redux/dialogs-reducer";
import {DialogsPropsType} from "./DialogsContainer";
import {Navigate} from "react-router-dom";


export const Dialogs = (props: DialogsPropsType) => {

    const state = props.messagesPage

    const newMessageBody = state.newMessageBody;

    const sendMessageHandler = () => {
        sendMessageAC()
    }
    const ChangeNewMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const body = e.target.value;
        props.ChangeNewMessageHandler(body)
    }
    if (!props.isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.dialogs}>
            <div>
                {state.dialogData.map(d =>
                    <DialogItem key={d.id}
                                name={d.name}
                                id={d.id}
                    />)}
            </div>
            <div>
                <div>{state.messageData.map(m =>
                    <Message key={m.id}
                             message={m.message}
                             id={m.id}
                    />)}</div>
                <div>
                    <div><textarea
                        value={newMessageBody}
                        onChange={ChangeNewMessageHandler}
                        placeholder='Enter your message'></textarea></div>
                    <div>
                        <button onClick={sendMessageHandler}>Send</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

