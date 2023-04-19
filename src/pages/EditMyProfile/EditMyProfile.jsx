import React from 'react';
import {HiPencil} from "react-icons/hi";
import {Button, Image, Select} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";
import {months, days, years} from "../../utils/date";
import {useTranslation} from "react-i18next";





const EditMyProfile = () => {

    const {user} = useSelector(userSelector)

    const {t, i18n} = useTranslation()


    return (
        <section className='editMyProfile'>
            <div className="editMyProfile__home">
                <div className="profile__info">
                    <div className="editMyProfile__home-top">Профиль</div>
                    <div className="profile__info-top editMyProfile__home-bg">
                        <button className="profile__info-cover">
                            <span><HiPencil/></span>
                            <p>Change cover</p>
                        </button>
                    </div>
                    <div className="profile__info-bottom editMyProfile__home-bottom">
                        <div className="profile__info-right editMyProfile__home-right">
                            <div className="profile__info-avatar editMyProfile__home-img">
                                <Image
                                    borderRadius='50%'
                                    boxSize='120px'
                                    src={`${process.env.REACT_APP_URL}${user.image}`}
                                    alt={`${user.name} ${user.surname}`}
                                    className='profile__info-img'/>
                            </div>
                            <div className="profile__info-user editMyProfile__home-user">
                                <h3 className="profile__info-name">{user.name} {user.surname}</h3>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="editMyProfile__content">
                    <div className="editMyProfile__card">
                        <label className='editMyProfile__label editMyProfile__label-first' htmlFor="info">
                            Краткая информация:
                        </label>
                        <textarea className='editMyProfile__field' id='info'/>
                    </div>
                    <div className="editMyProfile__card">
                        <label className='editMyProfile__label' htmlFor="family">
                            Семейное положение:
                        </label>
                        <select placeholder='Не выбрано' className='editMyProfile__field' id='family'>
                            <option value="single">Не женат</option>
                            <option value="married">Женат</option>
                            <option value="in love">Влюблен</option>
                        </select>
                    </div>
                    <div className="editMyProfile__card">
                        <label className='editMyProfile__label' htmlFor="birthday">
                            День рождения:
                        </label>
                        <div className="editMyProfile__card-selected">
                            <select className='editMyProfile__field' id='birthday'>
                                {
                                    days.map((day) => (
                                        <option key={day} value={day}>{day}</option>
                                    ))
                                }
                            </select>
                            <select className='editMyProfile__field' id='birthday'>
                                {
                                    months.map((month) => (
                                        <option key={month.en}
                                                value={month.en}>{i18n.language === 'ru' ? month.ru : month.en}</option>
                                    ))
                                }
                            </select>
                            <select className='editMyProfile__field' id='birthday'>
                                {
                                    years(2009).map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="editMyProfile__card">
                        <label className='editMyProfile__label' htmlFor="city">
                            Родной город:
                        </label>
                        <input className='editMyProfile__field' id='city'/>
                    </div>
                    <div className="editMyProfile__card">
                        <label className='editMyProfile__label' htmlFor="lang">
                            Владение языками:
                        </label>
                        <input className='editMyProfile__field' id='lang'/>
                    </div>

                    <div className="editMyProfile__btns">
                        <Button color={'black'}>Сохранить</Button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EditMyProfile;