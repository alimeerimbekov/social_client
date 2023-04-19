import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {emptyNotification, getAllNotifications} from "../../redux/reducers/notification";
import {Image, Button, useToast} from "@chakra-ui/react";
import axios from "../../utils/axios";
import {fillUser} from "../../redux/reducers/user";
import {notificationSelector, userSelector} from "../../redux/reselect";

const Notifications = () => {

    const {user} = useSelector(userSelector)
    const {data} = useSelector(notificationSelector)

    const dispatch = useDispatch()

    const toast = useToast()

    useEffect(() => {
        if (user.notification.length) {
            dispatch(getAllNotifications({arr : user.notification}))
        } else {
            dispatch(emptyNotification())
        }
    },[user])

    const acceptFriends = (id) => {
        axios.patch('/request/add', {
            senderId : id,
            recieverId: user._id
        })
            .then((res) => {
                toast({
                    title: 'Добавлен в друзья',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'center-top'
                })
                dispatch(fillUser(res.data))
            })
            .catch(() => {
                toast({
                    title: 'Запрос отклонен',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'center-top'
                })
            })
    }

    const cancelFriends = (id) => {
        axios.patch('/request/cancel', {
            senderId : id,
            recieverId: user._id
        })
            .then((res) => {
                toast({
                    title: 'Заявка в друзья отклонена',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'center-top'
                })
                dispatch(fillUser(res.data))
            })
            .catch(() => {
                toast({
                    title: 'Не удалость отклонить',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'center-top'
                })
            })
    }


    return (
        <section className='notification'>
            <div className="container">
                <div className="notification__content">
                    <h2 className="notification__title">Уведомление</h2>
                    <div className="notification__list">
                        {
                            data.map((item) => (
                                <div key={item._id} className='notification__card'>
                                    <div className="notification__left">
                                        <Image alt={item.login} className="notification__img"
                                               src={`${process.env.REACT_APP_URL}${item.image}`}
                                               fallbackSrc='https://via.placeholder.com/150' />
                                        <div className="notification__info">
                                            <h2 className="notification__name">{item.name} {item.surname}</h2>
                                            <p className="notification__desc">
                                                Хочет добавить вас в друзья
                                            </p>
                                            <div className="notification__desc">
                                                {item.city}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="notification__btns">
                                        <Button color='black' colorScheme='gray'
                                                onClick={() => cancelFriends(item._id)}>Отклонить</Button>
                                        <Button colorScheme='messenger'
                                                onClick={() => acceptFriends(item._id)}>Принять</Button>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Notifications;