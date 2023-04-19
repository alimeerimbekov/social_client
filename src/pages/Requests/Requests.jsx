import React from 'react';
import {useCancelRequestMutation, useGetRequestsQuery} from "../../redux/reducers/requests";
import {useDispatch, useSelector} from "react-redux";
import {Button, Image} from "@chakra-ui/react";
import {fillUser} from "../../redux/reducers/user";
import {userSelector} from "../../redux/reselect";

const Requests = () => {

    const {user} = useSelector(userSelector)

    const dispatch = useDispatch()

    const [cancelRequest, obj] = useCancelRequestMutation()

    if (obj.data) {
        dispatch(fillUser(obj.data))
    }

    const {data = [], isLoading} = useGetRequestsQuery(obj.data ? obj.data.requests : user.requests)


    const handleCancelRequest = async (id) => {
        await cancelRequest({senderId: user._id, recieverId:id }).unwrap()
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <div className='requests'>
            <div className="container">
                <h2 className='notification__title'> Ваши запросы</h2>
                <div className="requests__row">
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
                                            Вы отправили запрос
                                        </p>
                                        <div className="notification__desc">
                                            {item.city}
                                        </div>
                                    </div>
                                </div>
                                <div className="notification__btns">
                                    <Button color='black' colorScheme='gray'
                                            onClick={() => handleCancelRequest(item._id)}>Отклонить</Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Requests;