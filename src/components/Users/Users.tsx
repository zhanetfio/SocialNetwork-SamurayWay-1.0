import React from 'react';
import s from './Users.module.css'
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    pageSize: number
    totalUserCount: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
}
export const Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil((props.totalUserCount > 54 ? 54 : props.totalUserCount) / props.pageSize)
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages = [...pages, i]
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span onClick={() => {
                        props.onPageChanged(p)
                    }} className={props.currentPage === p ? s.selectedPage : ''}>{p}</span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div className={s.imgLogo}>
                            <NavLink to={`/profile/${u.id}`}>
                            <img src={u.photos.small != null ? u.photos.small : s.photo} className={s.photo} alt={''}/>
                                </NavLink>
                        </div>
                         <div>
                            {u.followed
                                ? <button onClick={() => {
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,  {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'e752a7cb-47a3-4c25-9f40-74c312d56809'
                                        }
                                    })
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'e752a7cb-47a3-4c25-9f40-74c312d56809'
                                        }
                                    })
                                }}>Follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    {/*<span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>*/}
                </div>)
            }
        </div>
    )
}


export default Users;