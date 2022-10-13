import { profileReducer } from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";


type PostType = {
    id: number
    message: string
    likesCount: number
}
type ProfilePageType = {
    postsData: Array<PostType>
    newPostText: string
}
type MessageType = {
    id: number
    message: string
}
type DialogsType = {
    id: number
    name: string
}
type MessagePageType = {
    dialogData: Array<DialogsType>
    messageData: Array<MessageType>
    newMessageBody: string
}
/*
export type SidebarType = {}
*/

export type RootStateType = {
    profilePage: ProfilePageType
    messagesPage: MessagePageType
}
export type StoreType = {
    _state: RootStateType
    _callSubscriber: (e:RootStateType) => void
    subscribe: (observer: (state:RootStateType) => void) => void
    getState: () => RootStateType
    dispatch: (action:any) => void
}


const store: StoreType = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: 'Hi,how are you?', likesCount: 5},
                {id: 1, message: "It's my first post", likesCount: 7},
                {id: 1, message: "I like React!", likesCount: 10}
            ],
            newPostText: "Hello"
        },
        messagesPage: {
            dialogData: [
                {id: 1, name: 'Mark'},
                {id: 2, name: 'Alex'},
                {id: 3, name: 'Kristi'},
                {id: 4, name: 'Helen'},
            ],
            messageData: [
                {id: 1, message: 'Hi yo!'},
                {id: 1, message: 'How are you'},
                {id: 1, message: 'Good night!'},
                {id: 1, message: 'Hello!'},
            ],
            newMessageBody: ""
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('State changed');
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
       // this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);

        this._callSubscriber(this._state)
    }
}


export default store;
