import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import Friends from "../pages/Friends/Friends";
import MyProfile from "../pages/MyProfile/MyProfile";
import NotFound from "../pages/NotFound/NotFound";
import Notifications from "../pages/Notifications/Notifications";
import Requests from "../pages/Requests/Requests";
import Photos from "../pages/Photos/Photos";
import EditMyProfile from "../pages/EditMyProfile/EditMyProfile";
import Chat from "../pages/Chat/Chat";

const PrivatRouting = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='' element={<Home/>}/>
                <Route path='friends' element={<Friends/>}/>
                <Route path='myprofile' element={<MyProfile/>}/>
                <Route path='notifications' element={<Notifications/>}/>
                <Route path='requests' element={<Requests/>}/>
                <Route path='photos' element={<Photos/>}/>
                <Route path='editmyprofile' element={<EditMyProfile/>}/>
                <Route path='chat/*' element={<Chat/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default PrivatRouting;