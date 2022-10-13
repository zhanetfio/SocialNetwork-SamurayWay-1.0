import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import {AppRootStateType} from "./redux/redux-store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {UserContainer} from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

export type AppType = {
    store: AppRootStateType

}

function App(props: AppType) {

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path="/profile" element={<ProfileContainer/>}>
                        <Route path=":userId/*" element={<ProfileContainer/>}/>
                    </Route>
                    <Route path="/dialogs" element={<DialogsContainer/>}/>
                    <Route path="/users" element={<UserContainer/>}/>

                </Routes>
            </div>


        </div>
    );
}

export default App;
