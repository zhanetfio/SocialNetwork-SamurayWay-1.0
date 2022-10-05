export type FollowAT = {
    type: 'FOLLOW'
    userId: number
}
export type UnFollowAT = {
    type: 'UNFOLLOW'
    userId: number
}
export type SetUsersAT = {
    type: 'SET-USERS'
    users: Array<UserType>
}
export type ActionsType = FollowAT | UnFollowAT | SetUsersAT

export type UserType = {
    id: number
    photoUrl:string
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}
export type LocationType = {
    city: string
    country: string
}

export type InitialStateType = {
    users: Array<UserType>

}
const InitialState = {
    users: [
        {id: 1, photoUrl:'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200', followed: true, fullName: 'Dmitry', status: 'Big Boss', location: {city: 'Minsk', country: 'Belarus'}},
        {id: 2, photoUrl:'https://i0.wp.com/roohentertainment.com/wp-content/uploads/2018/06/user-avatar-1.png?ssl=1', followed: false, fullName: 'Kate', status: 'Admin', location: {city: 'Moscow', country: 'Russia'}},
        {id: 3, photoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU3RzSOxARHNXRfCNFBcna_XiBqxaobXmgAqUC71yGuD6hHi4k4oQ_DReOaKR67vhkNSw&usqp=CAU', followed: true, fullName: 'Jane', status: 'Manager', location: {city: 'Warshaw', country: 'Poland'}}
    ]
}


export const usersReducer = (state: InitialStateType = InitialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW': {
            return {...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })}
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })}
        }
        case 'SET-USERS': {
            return {...state,users:[...state.users,...action.users]}
        }
        default:
            return state
    }
}
export const followAC = (userId: number): FollowAT => ({type: 'FOLLOW', userId});
export const unFollowAC = (userId: number): UnFollowAT => ({type: 'UNFOLLOW', userId});
export const setUsersAC = (users: Array<UserType>): SetUsersAT => ({type: 'SET-USERS', users});
