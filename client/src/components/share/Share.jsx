import './share.css';
import { MdPermMedia, MdLabel, MdEmojiEmotions } from 'react-icons/md';
import { ImLocation } from 'react-icons/im';

export default function Share() {
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
              <span className='shareOptionText'>Tag</span>
            </div>
            <div className='shareOption'>
              <ImLocation htmlColor='green' className='shareIcon' />
              <span className='shareOptionText'>Location</span>
            </div>
            <div className='shareOption'>
              <MdEmojiEmotions htmlColor='goldenrod' className='shareIcon' />
              <span className='shareOptionText'>Feelings</span>
            </div>
          </div>
          <button className='shareButton'>Share</button>
        </div>
      </div>
    </div>
  );
}
