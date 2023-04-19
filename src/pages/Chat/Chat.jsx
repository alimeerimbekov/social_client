import React, {useEffect, useState} from 'react';
import {Avatar, Input} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {myFriendsSelector, userSelector} from "../../redux/reselect";
import EmojiPicker from "emoji-picker-react";
import {GrEmoji} from "react-icons/gr";
import axios from "../../utils/axios";
import ChatUser from "../../components/ChatUser/ChatUser";
import {getMyFriends} from "../../redux/reducers/myFriends";


const Chat = () => {

    const {user} = useSelector(userSelector)

    const dispatch = useDispatch()

    const {data} = useSelector(myFriendsSelector)

    const [chats, setChats] = useState([])

    const [selectEmoji, setSelectEmoji] = useState(false)

    useEffect(() => {
        dispatch(getMyFriends())

        axios(`/chats/${user._id}`)
            .then(({data}) => setChats(data))
    }, [])


    return (
        <section className='chat'>
            <div className="chat__content">
                <div className="chat__sidebar">
                    <div className="chat__search">
                        <input type="search"/>
                    </div>
                    <div className="chat__friends">
                        {
                            data.map((item) => (
                                <div className='chat__friends-avatar'>
                                    <Avatar key={item.id} src={`${process.env.REACT_APP_URL}${item.image}`}/>
                                    <p className='chat__friends-name'>{item.name} {item.surname}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="chat__list">
                        {
                            chats.map((item) => (
                                <ChatUser key={item._id} chatId={item._id}
                                          id={item.members.filter(el => el !== user._id)}/>
                            ))
                        }
                    </div>
                </div>
                <div className="chat__block">
                    <div className="chat__block-top">
                        <h2>akm almckas</h2>
                        <Avatar/>
                    </div>

                    <div className="chat__block-bottom">
                        <Input className='chat__block-field' placeholder={'dld,,cc,lc'}/>
                        <span className='chat__block-emoji'>
                            {
                                selectEmoji ?
                                    <div className=' profile__emoji-block chat__block-emoji-block'
                                         onMouseEnter={() => setSelectEmoji(false)}>
                                        <EmojiPicker/>
                                    </div>
                                    :
                                    <GrEmoji onClick={() => setSelectEmoji(true)} size={28}/>
                            }
                      </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Chat;