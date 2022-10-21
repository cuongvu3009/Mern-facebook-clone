import React, { useState, useEffect } from 'react';
import './comment.css';
import axios from 'axios';
import './comment.css';
import { AiFillDelete } from 'react-icons/ai';

const Comment = ({ comment, commentId }) => {
  const [user, setUser] = useState({});

  const deleteComment = () => {
    try {
      axios.delete(`/comments/${comment._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const getCommentUser = async () => {
        const res = await axios.get(`/users/find/${comment?.userId}`);
        setUser(res.data);
      };
      getCommentUser();
    } catch (error) {
      console.log(error);
    }
  }, [comment.userId]);

  return (
    <>
      <div className='comments-container'>
        <div className='user-comment'>
          <div className='flex-comment'>
            <img
              src={user.profilePicture}
              alt={user.profilePicture}
              className='postProfileImg'
            />
            <div className='comment-content'>
              <p className='user-comment-name'>{user.username}</p>{' '}
              <span key={comment._id} className='comment'>
                {comment.desc}
              </span>
            </div>
          </div>
          <button
            className='delete-comment-btn'
            onClick={() => deleteComment()}
          >
            <AiFillDelete size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Comment;
