import React from 'react';
import s from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";


class Users extends React.Component<UsersPropsType> {
    //Users = (props:UsersPropsType) => {

    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                    .then(response => {
                        this.props.setUsers(response.data.items)
                        this.props.setUsersTotalCount(response.data.totalCount)
                    })

            })
    }



    onPageChanged = (pageNumber: number) => {
        this.props.setUsersCurrentPage(pageNumber)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        let pagesCount = Math.ceil((this.props.totalUserCount > 54 ? 54 : this.props.totalUserCount) / this.props.pageSize)

        let pages: Array<number> = []
        for (let i = 1; i <= pagesCount; i++) {
            pages = [...pages, i]
        }

        return (
            <div>
                <div>
                    {pages.map(p => {
                        return <span onClick={() => {
                            this.onPageChanged(p)
                        }} className={this.props.currentPage === p ? s.selectedPage : ''}>{p}</span>
                    })}
                </div>
                {
                    this.props.users.users.map(u => <div key={u.id}>
                    <span>
                        <div className={s.imgLogo}>
                            <img src={u.photos.small != null ? u.photos.small : s.photo} className={s.photo} alt={''}/>
                        </div>
                         <div>
                            {u.followed
                                ? <button onClick={() => {
                                    this.props.follow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.unFollow(u.id)
                                }}>Follow</button>}
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
    ;
}

export default Users;