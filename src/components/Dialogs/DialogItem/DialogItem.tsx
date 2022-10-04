import React from 'react';
import {NavLink} from "react-router-dom";

type DialogsType = {
    id: number
    name: string
}
const DialogItem = (props:DialogsType) => {
    let path='/dialogs/'+props.id

      return (
        <div>
           <NavLink to={path}>{props.name}</NavLink>
           {/* <textarea></textarea>
            <button onClick={() => {
            }}>Send
            </button>*/}
        </div>
    );
};

export default DialogItem;