import React from 'react';
import s from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";


class Users extends React.Component<UsersPropsType>{
 //Users = (props:UsersPropsType) => {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then((res)=>{
                this.props.setUsers(res.data.items)
            })
    }

    render(){
    return (
        <div>

            {
                this.props.users.users.map(u=><div key={u.id}>
                    <span>
                        <div className={s.imgLogo}>
                            <img src={u.photos.small !=null ?u.photos.small : s.photo} className={s.photo} alt={''}/>
                        </div>
                         <div>
                            {u.followed
                                ? <button onClick={()=>{this.props.follow(u.id)}}>Unfollow</button>
                                : <button onClick={()=>{this.props.unFollow(u.id)}}>Follow</button>}
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
    )};
}

export default Users;