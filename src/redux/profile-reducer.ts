import {Dispatch} from "redux";
import {profileAPI } from "../api/api";

export type PostType = {
    id: number
    message: string
    likesCount: number
    photo:string
    name:string
}
export type ProfilePageType = {
    postsData: Array<PostType>
    newPostText: string
    profile: ProfileType | null
    status: string
}

export type ProfileType = {
    aboutMe?: string | null,
    contacts?: {
        facebook: string | null
        github: string | null
        instagram: string | null
        mainLink: string | null
        twitter: string | null
        vk: string | null
        website: string | null
        youtube: string | null
    },
    fullName?: string | null,
    lookingForAJob?: boolean | null,
    lookingForAJobDescription?: string | null,
    photos?: {
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
export type SetStatusAT = {
    type: 'SET-STATUS',
    status: string

}
export type ProfileActionTypes = AddPostAT | UpdateNewPostAT | SetUserProfileAT | SetStatusAT


const initialState = {
    postsData: [
        {id: 1, message: 'Hi,how are you?', likesCount: 5},
        {id: 1, message: "It's my first post", likesCount: 7},
        {id: 1, message: "I like React!", likesCount: 10}
    ] as Array<PostType>,
    newPostText: "",
    profile: {} as ProfileType,
    status: ""
} as ProfilePageType
export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionTypes): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {
                id: 1,
                message: state.newPostText,
                likesCount: 0,
                name:'',
                photo:''
            };
           return {
                ...state,
                postsData: [...state.postsData,
                    newPost],
                newPostText: ''
            }

        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {...state, newPostText: action.newText};

        }
        case 'SET-STATUS': {
            return {
                ...state,
                status: action.status
            }
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

export const addPostAC = (): AddPostAT => ({type: 'ADD-POST'})
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
export const setStatus = (status: string): SetStatusAT => ({type: 'SET-STATUS', status})


export const getUserProfile = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getProfile(userId).then(res => dispatch(setUserProfile(res.data)))
}
export const getStatus = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId).then(res => dispatch(setStatus(res.data)))
}
export const updateStatus=(status:string)=>(dispatch:Dispatch)=>{
    profileAPI.updateStatus (status).then(res=>{
            if(res.data.resultCode===0) {
                dispatch(setStatus(status))
            }
        })
}