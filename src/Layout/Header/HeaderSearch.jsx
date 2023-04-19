import React from 'react';
import {AiOutlineSearch} from "react-icons/ai";
import {useTranslation} from "react-i18next";

const HeaderSearch = () => {

    const {t} = useTranslation()

    return (
        <label className='header__search'>
                            <span className='header__search-icon'>
                                   <AiOutlineSearch/>
                            </span>
            <input placeholder={t('header.field')} className='header__search-field'  type="text"/>
        </label>
    );
};

export default HeaderSearch;