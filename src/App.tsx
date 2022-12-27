import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {UserContainer} from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";



function App() {

    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path="profile" element={<ProfileContainer/>}>
                        <Route path=":userId/*" element={<ProfileContainer/>}/>
                    </Route>
                    <Route path="dialogs" element={<DialogsContainer />}/>
                    <Route path="users" element={<UserContainer/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="*" element={'NOT FOUND'}/>

                </Routes>
            </div>


        </div>
    );
}

export default App;
