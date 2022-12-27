import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {AuthStateType} from "../../redux/auth-reducer";

const Header = (props:AuthStateType) => {

    return (
        <header className={s.header}>
            <div className={s.logoBlock}>SNet</div>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>
                        {props.login}
                </div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    );
};

export default Header;