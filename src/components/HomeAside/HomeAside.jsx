import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {FiUsers} from "react-icons/fi";
import {FaUsers} from "react-icons/fa";
import {HiPhotograph} from "react-icons/hi";
import {FiMessageCircle} from "react-icons/fi";
import {BiUserCircle} from "react-icons/bi";

const HomeAside = () => {

    const navigate = useNavigate()

    return (
        <aside className='aside'>
            <ul className="aside__menu">
                <li className="aside__item" onClick={() => navigate('/myprofile')}>
                    <span><BiUserCircle/></span>
                    <p>Моя страница</p>
                </li>
                <li className="aside__item" onClick={() => navigate('/friends')}>
                    <span><FiUsers/></span>
                    <p>Друзья</p>
                </li>
                <li className="aside__item" onClick={() => navigate('/friends')}>
                    <span><FaUsers/></span>
                    <p>Сообщества</p>
                </li>
                <li className="aside__item" onClick={() => navigate('/photos')}>
                    <span><HiPhotograph/></span>
                    <p>Фотографии</p>
                </li>
                <li className="aside__item" onClick={() => navigate('/chat')}>
                    <span><FiMessageCircle/></span>
                    <p>Мессенджер</p>
                </li>
            </ul>
        </aside>
    );
};

export default HomeAside;