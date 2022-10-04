
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    postsData: Array<PostType>
    newPostText:string
}


export type AddPostAT = {
    type: 'ADD-POST'
}
export  type UpdateNewPostAT = {
    type: 'UPDATE-NEW-POST-TEXT',
    newText: string
}
export type ProfileActionTypes = AddPostAT | UpdateNewPostAT

const initialState = {
    postsData: [
        {id: 1, message: 'Hi,how are you?', likesCount: 5},
        {id: 1, message: "It's my first post", likesCount: 7},
        {id: 1, message: "I like React!", likesCount: 10}
    ],
    newPostText: "Hello"
}
export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionTypes): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {
                id: 1,
                message: state.newPostText,
                likesCount: 0
            };
            const stateCopy = {
                ...state,
                postsData: [...state.postsData,
                    newPost],
                newPostText: ''
            }
            return stateCopy
        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {...state, newPostText: action.newText};

        }
        default:
            return state
    }
}

export const addPostAC = (): AddPostAT => {
    return {
        type: 'ADD-POST'
    }
}
export const updateNewPostAC = (text: string): UpdateNewPostAT => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: text
    }
}