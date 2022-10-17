import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    postsData: Array<PostType>
    newPostText: string
    profile: ProfileType | null
}

export type ProfileType = {
    aboutMe: string | null,
    contacts: {
        facebook: string | null
        github: string | null
        instagram: string | null
        mainLink: string | null
        twitter: string | null
        vk: string | null
        website: string | null
        youtube: string | null
    },
    fullName: string | null,
    lookingForAJob: boolean | null,
    lookingForAJobDescription: string | null,
    photos: {
        large: string | undefined,
        small: string | undefined,
    },
    userId: number | null
}

export type AddPostAT = {
    type: 'ADD-POST'
}
export  type UpdateNewPostAT = {
    type: 'UPDATE-NEW-POST-TEXT',
    newText: string
}
export type SetUserProfileAT = {
    type: 'SET-USER-PROFILE',
    profile: ProfileType

}
export type ProfileActionTypes = AddPostAT | UpdateNewPostAT | SetUserProfileAT


const initialState = {
    postsData: [
        {id: 1, message: 'Hi,how are you?', likesCount: 5},
        {id: 1, message: "It's my first post", likesCount: 7},
        {id: 1, message: "I like React!", likesCount: 10}
    ] as Array<PostType>,
    newPostText: "Hello",
    profile: {} as ProfileType
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
        case "SET-USER-PROFILE": {

            return {
                ...state,
                profile: action.profile
            }
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
export const setUserProfile = (profile: ProfileType): SetUserProfileAT => {
    return {
        type: 'SET-USER-PROFILE',
        profile
    }
}
export const getUserProfile = (userId: string) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId).then(res => dispatch(setUserProfile(res.data)))
}