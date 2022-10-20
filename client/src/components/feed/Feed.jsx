import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFailure, fetchStart, fetchSuccess } from '../../redux/postSlice';

export default function Feed() {
  const dispatch = useDispatch();
  const { currentPost } = useSelector((state) => state.post);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(fetchStart());
      try {
        const postRes = await axios.get('/posts');
        dispatch(fetchSuccess(postRes.data));
      } catch (error) {
        console.log(error);
        dispatch(fetchFailure());
      }
    };
    fetchPosts();
  }, [dispatch]);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <Share />
        {currentPost.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
