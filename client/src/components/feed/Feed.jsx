import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchFailure, fetchStart, fetchSuccess } from '../../redux/postSlice';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async ({ type }) => {
      dispatch(fetchStart());
      try {
        const postRes = await axios.get('/posts');
        setPosts(postRes.data);
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
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
