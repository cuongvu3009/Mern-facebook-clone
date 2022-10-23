import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export default function ProfileFeed() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const profileRes = await axios.get(`/posts/myposts`);

        setPosts(profileRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [dispatch]);
  console.log(posts);

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
