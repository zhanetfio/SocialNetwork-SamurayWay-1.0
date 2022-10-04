import React from 'react';
import s from './Post.module.css'

type PostItemType={
    message:string
    likesCount:number
}

const Post:React.FC<PostItemType> = (props) => {
    return (
        <div className={s.post}>
            <img src='https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg' alt='avatar'/>
            {props.message}
            <div className={s.likes}>Like: {props.likesCount}</div>
        </div>

    );
};

export default Post