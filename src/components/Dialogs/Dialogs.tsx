import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {sendMessageAC} from "../../redux/dialogs-reducer";
import {DialogsPropsType} from "./DialogsContainer";


const Dialogs = (props: DialogsPropsType) => {
const state= props.messagesPage
    const dialogsElement =state.dialogData.map(dialog => <DialogItem key={dialog.id} name={dialog.name}
                                                                      id={dialog.id}/>)
    const messageElement =state.messageData.map(message => <Message key={message.id}
                                                                     message={message.message}
                                                                     id={message.id}/>)
    const newMessageBody = state.newMessageBody;

    const sendMessageHandler = () => {
      sendMessageAC()
    }
    const ChangeNewMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const body=e.target.value;
        props.ChangeNewMessageHandler(body)
    }
    return (
        <div className={s.dialogs}>
            <div>
                {dialogsElement}
            </div>
            <div>
                <div>{messageElement}</div>
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

export default Dialogs;