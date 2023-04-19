import React, {useState} from 'react';
import EmojiPicker from "emoji-picker-react";
import {GrEmoji} from "react-icons/gr";

const Emoji = ({post, setPost}) => {

    const [selectEmoji, setSelectEmoji] = useState(false)


    return (
        <div>
            {
                selectEmoji ?
                    <div className='profile__emoji-block' onMouseLeave={() => setSelectEmoji(false)}>
                        <EmojiPicker onEmojiClick={(emoji) => setPost(prev => post + emoji.emoji)}/>
                    </div>
                    :
                    <GrEmoji onMouseLeave={() => setSelectEmoji(true)} size={28}/>
            }
        </div>
    );
};

export default Emoji;