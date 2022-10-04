import React, {ChangeEvent} from 'react';
import Post from "./Post/Post";
import s from './MyPosts.module.css';
import {MyPostsPropsType} from "./MyPostsContainer";



const MyPosts = (props:MyPostsPropsType) => {

    const postsElements=props.postsData.map(post=><Post  key={post.id} message={post.message} likesCount={post.likesCount}/>)

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
            {postsElements}

        </div>

    );
};

export default MyPosts;