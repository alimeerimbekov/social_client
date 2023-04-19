import React, {useEffect, useState} from 'react';
import {Avatar} from "@chakra-ui/react";
import axios from "../../utils/axios";
import {useNavigate, useParams} from "react-router-dom";

const ChatUser = ({id, chatId}) => {

    const [friend, setFriend] = useState({})

    const navigate = useNavigate()

    const params = useParams()

    useEffect(() => {
        axios(`/users/${id}`)
            .then(({data}) => setFriend(data))
    })




    return (
        <div style={{background: params['*'] === chatId ? 'rgb(57 125 204)' : 'transparent'}} className='header__popover-top' onClick={() => navigate(`/chat/${chatId}`)}>
            <Avatar name={`${friend.name}${friend.surname}`}
                    src={`${process.env.REACT_APP_URL}${friend.image}`}/>
            <div>
                <h3 className='header__popover-title'>{friend.name} {friend.surname}</h3>
                <p className='header__popover-num'>asadassa asdad</p>
            </div>
        </div>
    );
};

export default ChatUser;