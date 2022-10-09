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
export  type  SetUsersCurrentPageAT = {
    type: 'SET-USERS-CURRENT-PAGE',
    currentPage: number
}
export type SetUsersTotalCountAT = {
    type: 'SET-USERS-TOTAL-COUNT'
    count: number
}
export type ActionsType = FollowAT | UnFollowAT | SetUsersAT | SetUsersCurrentPageAT | SetUsersTotalCountAT

export type UserType = {
    name: string,
    id: number,
    uniqueUrlName: string | null,
    photos: {
        small: string | null,
        large: string | null
    },
    status: string | null,
    followed: boolean
}
/*export type LocationType = {
    city: string
    country: string
}*/

export type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUserCount: number
    currentPage: number

}
const InitialState = {
    users: [
        /*  {
              name: "Arch",
              id: 25065,
              uniqueUrlName: null,
              photos: {
                  small: null,
                  large: null
              },
              status: null,
              followed: false
          },
          {
              name: "ArchersKing",
              id: 25064,
              uniqueUrlName: null,
              photos: {
                  small: null,
                  large: null
              },
              status: null,
              followed: false
          },
          {
              name: "Norair",
              id: 25063,
              uniqueUrlName: null,
              photos: {
                  small: null,
                  large: null
              },
              status: null,
              followed: false
          }*/],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1
}


export const usersReducer = (state: InitialStateType = InitialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }
        }
        case 'SET-USERS': {
            return {...state, users: [...state.users, ...action.users]}
        }
        case 'SET-USERS-CURRENT-PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET-USERS-TOTAL-COUNT':
            return {
                ...state,
                currentPage: action.count
            }
        default:
            return state
    }
}
export const followAC = (userId: number): FollowAT => ({type: 'FOLLOW', userId});
export const unFollowAC = (userId: number): UnFollowAT => ({type: 'UNFOLLOW', userId});
export const setUsersAC = (users: Array<UserType>): SetUsersAT => ({type: 'SET-USERS', users});
export const setUsersCurrentPageAC = (currentPage: number): SetUsersCurrentPageAT => ({
    type: 'SET-USERS-CURRENT-PAGE',
    currentPage
})
export const setUsersTotalCountAC = (totalCount: number): SetUsersTotalCountAT => ({
    type: 'SET-USERS-TOTAL-COUNT',
    count: totalCount
})