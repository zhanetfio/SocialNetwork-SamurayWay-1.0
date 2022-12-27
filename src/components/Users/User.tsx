import React from 'react';
import {UserType} from "../../redux/users-reducer";
import s from './User.module.css'
import {NavLink} from "react-router-dom";


type UserPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: number[]
}
export const User = (props:UserPropsType) => {
    return (
        <div className={s.user}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + props.user.id}>
                        <img src={props.user.photos.small != null ? props.user.photos.small : ''} alt={`user's avatar`}
                             className={s.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {props.user.followed
                            ? <button className={s.followUnfollowButton}
                                      disabled={props.followingInProgress
                                          .some(id => id === props.user.id)} onClick={() => {
                                props.unfollow(props.user.id)
                            }}>Unfollow</button>
                            : <button className={s.followUnfollowButton}
                                      disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                                props.follow(props.user.id)
                            }}>Follow</button>}
                                </div>
                </span>
            {/*<span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                            <span>
                                <div>{user.location?.country}</div>
                                <div>{user.location?.city}</div>
                            </span>
                        </span>*/}
        </div>
    );
};

