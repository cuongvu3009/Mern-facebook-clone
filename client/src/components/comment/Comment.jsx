import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './comment.css';
import axios from 'axios';
import './comment.css';
import { AiFillDelete } from 'react-icons/ai';

const Comment = ({ postComments }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [commentUserImg, setCommentUserImg] = useState('');
  const [commentUsername, setCommentUsername] = useState('');

  useEffect(() => {
    const getCommentUser = async () => {
      const res = await axios.get(`users/find/${postComments[0]?.userId}`);
      setCommentUsername(res.data?.username);
      setCommentUserImg(res.data?.profilePicture);
    };
    getCommentUser();
  }, [postComments, postComments.userId]);

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

      <div className='comments-container'>
        {postComments.map((comment) => (
          <div className='user-comment'>
            <div className='flex-comment'>
              <img
                src={commentUserImg}
                alt={commentUserImg}
                className='postProfileImg'
              />
              <div className='comment-content'>
                <p className='user-comment-name'>{commentUsername}</p>{' '}
                <span key={comment._id} className='comment'>
                  {comment.desc}
                </span>
              </div>
            </div>
            <button className='delete-comment-btn'>
              <AiFillDelete size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
