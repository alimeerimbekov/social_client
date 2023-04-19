import React, {useEffect} from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {Navigate,   Outlet} from 'react-router-dom'
import HomeAside from "../components/HomeAside/HomeAside";
import {useDispatch, useSelector} from "react-redux";
import axios from "../utils/axios";
import {fillUser} from "../redux/reducers/user";
import {userSelector} from "../redux/reselect";

const Layout = () => {

    const {user} = useSelector(userSelector)

    const dispatch = useDispatch()

    useEffect(() => {
       axios(`/users/${user._id}`)
           .then((res) => dispatch(fillUser(res.data)))
    },[])

    return (
        <div>
            <Header/>

            <main>
                <div className="container">
                   <div className="content">
                       <HomeAside/>
                       <Outlet/>
                   </div>
                </div>
            </main>

            <Footer/>

        </div>
    );
};

export default Layout;