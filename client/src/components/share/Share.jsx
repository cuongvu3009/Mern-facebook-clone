import React, { useState } from 'react';
import './share.css';
import { MdPermMedia, MdLabel, MdEmojiEmotions } from 'react-icons/md';
import { ImLocation } from 'react-icons/im';

export default function Share() {
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState(undefined);
  const [tags, setTags] = useState([]);

  const handleTags = (e) => {
    e.preventDefault();
    setTags(e.target.value.split(','));
  };

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img className='shareProfileImg' src='/assets/person/1.jpeg' alt='' />
          <input
            placeholder="What's in your mind Safak?"
            className='shareInput'
          />
        </div>

        <hr className='shareHr' />

        <div className='shareBottom'>
          <div className='shareOptions'>
            <div className='shareOption'>
              <MdPermMedia htmlColor='tomato' className='shareIcon' />
              <span className='shareOptionText'>Photo or Video</span>
            </div>
            <div className='shareOption'>
              <MdLabel htmlColor='blue' className='shareIcon' />
              <input
                type='text'
                placeholder='Input a tags with commas.'
                onChange={handleTags}
              />
            </div>
          </div>

          <button className='shareButton'>Share</button>
        </div>
      </div>
    </div>
  );
}
