import React, {useState} from 'react';
import {HiPencil} from 'react-icons/hi'
import {Image, Menu, MenuList, MenuButton, Button, MenuItem} from "@chakra-ui/react";
import {ChevronDownIcon} from '@chakra-ui/icons'
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";
import EmojiPicker from "emoji-picker-react";
import {GrEmoji, GrLocal} from "react-icons/gr";
import axios from "../../utils/axios";
import {v4 as uuidv4} from "uuid";
import {fillUser} from "../../redux/reducers/user";
import {FcLike} from "react-icons/fc";
import {AiOutlineHeart} from "react-icons/ai";
import {FaRegComment} from "react-icons/fa"
import {RiShareForwardLine} from "react-icons/ri"
import {BsRecordBtn} from "react-icons/bs"
import TimeAgo from 'timeago-react';
import {useNavigate} from "react-router-dom";
import {GoLocation} from "react-icons/go";
import Emoji from "../../components/Emoji/Emoji";


const MyProfile = () => {

    const {user} = useSelector(userSelector)


    const [post, setPost] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const addPost = async () => {

        try {
            const res = await axios.patch(`/users/${user._id}/addpost`, {
                text: post,
                owner: user._id,
                id: uuidv4(),
                date: Date.now()
            })

            dispatch(fillUser(res.data))
            setPost('')

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <section className='profile'>
            <div className="profile__info">
                <div className="profile__info-top">
                    <button className="profile__info-cover">
                        <span><HiPencil/></span>
                        <p>Change cover</p>
                    </button>
                </div>
                <div className="profile__info-bottom">
                    <div className="profile__info-right">
                        <div className="profile__info-avatar">
                            <Image
                                borderRadius='50%'
                                boxSize='200px'
                                src={`${process.env.REACT_APP_URL}${user.image}`}
                                alt={`${user.name} ${user.surname}`}
                                className='profile__info-img'/>
                        </div>
                        <div className="profile__info-user">
                            <h3 className="profile__info-name">{user.name} {user.surname}</h3>
                            <div className="profile__info-location">
                                <div className="profile__info-loc-city">
                                    <span><GoLocation/></span>
                                    <p className="profile__info-city">{user.city}</p>
                                </div>
                                <a href="" className="profile__info-about">More <span> > </span></a>
                            </div>
                        </div>
                    </div>
                    <div className="profile__info-left">
                        <button className="profile__info-change" onClick={() => navigate('/editmyprofile')}>Change profile</button>
                        <Menu placement={'bottom-end'}>
                            <MenuButton bg={'#424242'} as={Button} rightIcon={<ChevronDownIcon/>}>
                                Еще
                            </MenuButton>
                            <MenuList bg={'#222222'} padding={'10px 20px'}>
                                <MenuItem bg={'#222222'}>Мои вопросы</MenuItem>
                                <MenuItem bg={'#222222'}>Воспоминания</MenuItem>
                                <MenuItem bg={'#222222'}>Мои желания</MenuItem>
                                <MenuItem bg={'#222222'}>Денежные переводы</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
            </div>

            <div className="profile__content">

                <div className="profile__left">

                    <div className="profile__addPost"   >
                        <div className='profile__addPost-top'>
                    <textarea value={post} onChange={(e) => setPost(e.target.value)} placeholder='Что у вас нового ?'
                              className='profile__addPost-field'/>
                            <span className='profile__addPost-emoji'>
                                <Emoji post={post} setPost={setPost}/>
                    </span>
                        </div>

                        <Button colorScheme='teal' variant='outline' onClick={addPost}>Опубликовать</Button>
                    </div>

                    <div className="profile__posts">
                        <div className="profile__posts-btns">
                            <Button colorScheme='gray' variant='outline'>Все записи</Button>
                            <Button colorScheme='gray' variant='outline'>Мои записи</Button>
                            <Button colorScheme='gray' variant='outline'>Архив записей</Button>
                        </div>
                        <div className="profile__posts-column">
                            {
                                user.posts.length ?
                                    <>
                                        {
                                            user.posts.map((item) => (
                                                <div key={item.id} className="profile__posts-row">
                                                    <div className="profile__posts-top">
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src={`${process.env.REACT_APP_URL}${user.image}`}
                                                            alt={user.login}
                                                        />
                                                        <div className="profile__posts-info">
                                                            <p className="profile__posts-name">{user.name} {user.surname}</p>
                                                            <p className="profile__time">
                                                                <TimeAgo datetime={item.date} locale='ru' style={{color: '#adb5bd', fontSize: '14px'}}/>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="profile__posts-post">{item.text}</p>

                                                    <div className="profile__posts-icons">
                                                        <span><AiOutlineHeart size={25}/></span>
                                                        <span><FaRegComment size={23}/></span>
                                                        <span><RiShareForwardLine size={25}/></span>
                                                    </div>
                                                </div>

                                            ))
                                        }
                                    </>
                                    :
                                    <p className="profile__posts-noPost profile__posts-post">
                                        <span><BsRecordBtn size={40}/></span>
                                        <p>На стене пока нет ни одной записи</p>
                                    </p>
                            }


                        </div>
                    </div>

                </div>

                <div className="profile__right">

                    <div className="profile__addPost"></div>

                </div>
            </div>
        </section>
    );
};

export default MyProfile;