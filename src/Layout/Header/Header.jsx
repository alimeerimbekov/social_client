import React from 'react';
import {IoMdNotifications} from 'react-icons/io'
import HeaderSearch from "./HeaderSearch";
import {BiChevronsDown} from 'react-icons/bi'
import SwitchLang from "./SwitchLang/SwitchLang";
import {Link, useNavigate} from "react-router-dom";
import {AiFillSetting} from "react-icons/ai";
import {BsPaletteFill} from "react-icons/bs";
import {MdLanguage} from "react-icons/md";
import {CiLogin} from "react-icons/ci";
import {
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    Button, Icon
} from '@chakra-ui/react'
import {useDispatch, useSelector} from "react-redux";
import {logOutUser} from "../../redux/reducers/user";
import {userSelector} from "../../redux/reselect";

const Header = () => {

    const dispatch = useDispatch()

    const {user} = useSelector(userSelector)

    const navigate = useNavigate()

    return (
        <header className='header'>
            <div className="container">
                <nav className='header__nav'>
                    <div className='header__left'>
                        <Link to={'/'}>
                            <h1 className='header__title'>IT-RUN web</h1>
                        </Link>
                        <HeaderSearch/>
                    </div>
                    <div className='header__right'>
                        <Link to={'/notifications'} className='header__notif' >
                            <IoMdNotifications/>
                        </Link>
                        <Link to={'/requests'} className='header__notif' >
                            <IoMdNotifications/>
                        </Link>
                        <SwitchLang/>


                        <Popover placement={"top-end"} isLazy>
                            <PopoverTrigger>
                                <Button className='header__user'>
                                    <Avatar name={`${user.name} ${user.surname}`}
                                            src={`${process.env.REACT_APP_URL}${user.image}`}/>
                                    <span className='header__user-icon'>
                                <BiChevronsDown/>
                            </span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent  bg={'#181818'}>
                                <PopoverArrow bg={'#181818'}/>
                                <PopoverCloseButton/>
                                <div className="header__popover">
                                    <div className='header__popover-top' onClick={() => navigate('/myprofile')}>
                                        <Avatar name={`${user.name} ${user.surname}`}
                                                src={`${process.env.REACT_APP_URL}${user.image}`}/>
                                        <div>
                                            <h3 className='header__popover-title'>{user.name} {user.surname}</h3>
                                            <p className='header__popover-num'>{user.phone}</p>
                                        </div>
                                    </div>
                                    <ul className='header__popover-list'>
                                        <li className='header__popover-item'>
                                            <Icon as={AiFillSetting}/>
                                            <span className="header__popover-text">Настройки</span>
                                        </li>
                                        <li className='header__popover-item'>
                                            <Icon as={BsPaletteFill}/>
                                            <span className="header__popover-text">Тема</span>
                                        </li>
                                        <li className='header__popover-item'>
                                            <Icon as={MdLanguage}/>
                                            <SwitchLang/>
                                        </li>
                                        <li className='header__popover-item' onClick={() => dispatch(logOutUser())}>
                                            <Icon as={CiLogin}/>
                                            <span className="header__popover-text">Выйти</span>
                                        </li>
                                    </ul>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;