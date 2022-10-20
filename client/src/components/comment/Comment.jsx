import React from 'react';
import { useSelector } from 'react-redux';
import './comment.css';

const Comment = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='comment-wrapper'>
      <div className='comment-bar'>
        <img
          src={currentUser.profilePicture}
          alt=''
          className='postProfileImg'
        />
        <input type='text' id='comment-box' placeholder='comment...' />
        <button className='comment-btn' type='submit'>
          Send
        </button>
      </div>
    </div>
  );
};

export default Comment;
