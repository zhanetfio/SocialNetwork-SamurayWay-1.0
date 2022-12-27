import React, {ChangeEvent} from 'react';
import {Post} from "./Post/Post";
import s from './MyPosts.module.css';
import {MyPostsPropsType} from "./MyPostsContainer";



const MyPosts = (props:MyPostsPropsType) => {



    const newPostElement=React.createRef<HTMLTextAreaElement>();

    const onAddPost=()=>{
        props.addPost()
    }

    const onChangeHandler=(e:ChangeEvent<HTMLTextAreaElement>)=>{
        const newText = newPostElement.current?.value;
        if(newText) {
          props.updateNewPost(newText)
        }
    }

    return (
        <div className={s.postBlock}>
            <div>
                My posts
                <div>
                    <textarea
                        onChange={onChangeHandler}
                        value={props.newPostText}
                        ref={newPostElement}>

                    </textarea>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            {props.postsData.map(p=><Post
                key={p.id}
                message={p.message}
                likesCount={p.likesCount}
                id={p.id}
                photo={p.photo}
                name={p.name}

            />)}

        </div>

    );
};

export default MyPosts;