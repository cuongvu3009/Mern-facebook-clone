import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Post from '../../components/post/Post';
import Topbar from '../../components/topbar/Topbar';
import './singlePost.css';

const SinglePost = () => {
  const path = useLocation();
  const postId = path.pathname.split('/')[2];
  const { currentPost } = useSelector((state) => state.post);

  const post = currentPost.filter((p) => p._id === postId);

  return (
    <div>
      <Topbar />
      <div className='single-post-container'>
        <Post post={post[0]} />
      </div>
    </div>
  );
};

export default SinglePost;
