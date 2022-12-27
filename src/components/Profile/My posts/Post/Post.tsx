import React from 'react';
import s from './Post.module.css'

type PostItemType={
    message:string
    likesCount:number
    id:number
    photo:string
    name:string
}

export const Post:React.FC<PostItemType> = (props) => {
    return (
        <div className={s.post}>
            {props.photo}
            {props.name}
            <img src='https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg' alt='avatar'/>
            {props.message}
            <div className={s.likes}>Like: {props.likesCount}</div>
        </div>

    );
};
