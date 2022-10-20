import './post.css';

import { FiMoreVertical } from 'react-icons/fi';
import { Users } from '../../dummyData';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            {/* <img
              className='postProfileImg'
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=''
            /> */}
            <span className='postUsername'>
              {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
            </span>
            {/* <span className='postDate'>{post.createdAt}</span> */}
          </div>
          <div className='postTopRight'>
            <FiMoreVertical />
          </div>
        </div>
        <div className='postCenter'>
          {/* <span className='postText'>{post?.desc}</span>
          <img className='postImg' src={post.img} alt={post.img} /> */}
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
            {/* <span className='postLikeCounter'>{post.likes} people like it</span> */}
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>0 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
