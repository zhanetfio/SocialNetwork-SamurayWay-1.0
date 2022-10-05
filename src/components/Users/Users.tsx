import React from 'react';
import s from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";

const Users = (props:UsersPropsType) => {
    return (
        <div>
            {
                props.users.users.map(u=><div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} className={s.photo}/>
                        </div>
                         <div>
                            {u.followed
                                ? <button onClick={()=>{props.follow(u.id)}}>Unfollow</button>
                                : <button onClick={()=>{props.unFollow(u.id)}}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </div>)
            }
        </div>
    );
};

export default Users;