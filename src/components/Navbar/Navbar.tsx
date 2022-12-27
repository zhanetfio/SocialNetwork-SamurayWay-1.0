import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";



export const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile">Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs">Dialogs</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users">Users</NavLink>
            </div>
           {/* <div><NavLink to="">News</NavLink></div>
            <div><NavLink to="">Music</NavLink></div>
            <div><NavLink to="">Settings</NavLink></div>*/}
        </nav>
    );
};

