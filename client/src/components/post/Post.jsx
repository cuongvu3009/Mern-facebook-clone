import './post.css';

import { FiMoreVertical } from 'react-icons/fi';
import { Users } from '../../dummyData';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [username, setUsername] = useState('');
  const [userImg, setUserImg] = useState('');

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`users/find/${post.userId}`);
      console.log(res.data);
      setUsername(res.data?.username);
      setUserImg(res.data?.profilePicture);
    };
    getUser();
  }, [post.userId]);

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <img className='postProfileImg' src={userImg} alt='' />
            <span className='postUsername'>{username}</span>
            <span className='postDate'>{post.createdAt}</span>
          </div>
          <div className='postTopRight'>
            <FiMoreVertical />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post?.desc}</span>
          <img className='postImg' src={post.img} alt={post.img} />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              className='likeIcon'
              src='assets/like.png'
              onClick={likeHandler}
              alt=''
            />
            <img
              className='likeIcon'
              src='assets/heart.png'
              onClick={likeHandler}
              alt=''
            />
            <span className='postLikeCounter'>
              {post.likes.length} people like it
            </span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>0 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
