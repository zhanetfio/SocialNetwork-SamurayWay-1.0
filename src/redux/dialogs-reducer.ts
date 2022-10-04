
export type MessageType = {
    id: number
    message: string
}
export type DialogsType = {
    id: number
    name: string
}
export type MessagePageType = {
    dialogData: Array<DialogsType>
    messageData: Array<MessageType>
    newMessageBody:string
}

export type SendMessageAT = {
    type: 'SEND-MESSAGE'
}
export type UpdateNewMessageBodyAT = {
    type: 'UPDATE-NEW-MESSAGE-BODY',
    body: string
}
export type DialogsActionTypes = SendMessageAT | UpdateNewMessageBodyAT

const initialState = {
    dialogData: [
        {id: 1, name: 'Mark'},
        {id: 2, name: 'Alex'},
        {id: 3, name: 'Kristi'},
        {id: 4, name: 'Helen'},
    ] as Array<DialogsType>,
    messageData: [
        {id: 1, message: 'Hi yo!'},
        {id: 1, message: 'How are you'},
        {id: 1, message: 'Good night!'},
        {id: 1, message: 'Hello!'},
    ] as Array<MessageType>,
    newMessageBody: ""
}

export const dialogsReducer = (state: MessagePageType = initialState, action: DialogsActionTypes): MessagePageType => {
    switch (action.type) {

        case 'UPDATE-NEW-MESSAGE-BODY': {
            return {...state, newMessageBody: action.body};
        }
        case 'SEND-MESSAGE': {

            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messageData: [...state.messageData, {id: 4, message: body}]
            }

        }
        default:
            return state
    }
}
export const sendMessageAC = (): SendMessageAT => {
    return {
        type: 'SEND-MESSAGE'
    }
}
export const updateNewMessageBodyAC = (body: string): UpdateNewMessageBodyAT => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        body: body
    }
}