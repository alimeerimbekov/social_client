import React, {useRef, useState} from 'react';
import {Button, CloseButton, Input} from '@chakra-ui/react'
import axios from "../../utils/axios";
import {Fancybox as NativeFancybox} from "@fancyapps/ui/dist/fancybox.esm";
import "@fancyapps/ui/dist/fancybox.css";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";
import {v4 as uuidv4} from 'uuid';
import {fillUser} from "../../redux/reducers/user";


const Photos = () => {

    const image = useRef()

    const [photo, setPhoto] = useState('')
    const [desc, setDesc] = useState('')

    const {user} = useSelector(userSelector)

    const dispatch = useDispatch()

    const handleImage = async (e) => {
        try {

            const formData = new FormData()
            const file = e.target.files[0]
            formData.append('image', file)

            await axios.post('/upload', formData)
                .then(({data}) => setPhoto(data.url))

        } catch (err) {
            console.log(err, 'Ошибка')
        }
    }

    const resetHandler = () => {
        setPhoto('')
        setDesc('')
    }

    const addPhoto = async () => {

        try {
            const res = await axios.patch(`/users/${user._id}/addphoto`, {
                url: photo,
                description: desc,
                id: uuidv4()
            })

            dispatch(fillUser(res.data))

            setDesc('')
            setPhoto('')

        } catch (err) {
            console.log(err)
        }
    }



    return (
        <section className='photos'>
            <div className="container">

                <div className="photos__content">
                    <div className="photos__top">
                        <h2 className="photos__title">Мои картинки</h2>
                        <div className="photos__btns">
                            <Button colorScheme='facebook'>Создать альбом</Button>
                            <Button onClick={() => image.current.click()} textColor='black' colorScheme='gray'>Добавить
                                фотографии</Button>

                            <input onChange={handleImage} ref={image} hidden type="file" id='image'/>

                        </div>
                    </div>

                    {
                        photo.length ?
                            <>
                                <div className="photos__images">
                                    <CloseButton className='photos__images-close' onClick={resetHandler}/>
                                    <img className='photos__images-img' data-fancybox data-caption={desc}
                                         data-src={`${process.env.REACT_APP_URL}${photo}`}
                                         src={`${process.env.REACT_APP_URL}${photo}`}
                                         alt={desc}/>
                                    <Input value={desc} onChange={(e) => setDesc(e.target.value)}
                                           width={'300px'} className='photos__images-field'
                                           placeholder='Добавить описание'/>
                                </div>
                                <div className='photos__images-btns'>
                                    <Button colorScheme={"teal"} size={"lg"} onClick={addPhoto}>Опубликовать на моей
                                        странице</Button>
                                </div>
                            </>
                            :
                            user.photos.length ?
                                <>
                                    <div className="photos__row">
                                        {
                                            user.photos.map((item) => (
                                                <img className='photos__row-img' data-fancybox='gallery' data-caption={item.description}
                                                     key={item.id} src={`${process.env.REACT_APP_URL}${item.url}`} alt=""/>
                                            ))
                                        }
                                    </div>
                                </>
                                :
                                <div className="photos__empty">
                                    Вы можете загружать тысячи фотографий ВКонтакте и помещать их в альбомы
                                </div>
                    }


                </div>

            </div>
        </section>
    );
};

export default Photos;