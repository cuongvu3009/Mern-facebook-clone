import './post.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Comment from '../comment/Comment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [username, setUsername] = useState('');
  const [userImg, setUserImg] = useState('');
  const [postComments, setPostComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const [desc, setDesc] = useState('');

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/users/find/${post.userId}`);
      setUsername(res.data?.username);
      setUserImg(res.data?.profilePicture);
    };
    getUser();
  }, [post.userId]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`/comments/${post._id}`);
        setPostComments(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [post._id]);

  const handleAddCmt = (e) => {
    e.preventDefault();
    try {
      const createComment = async () => {
        const res = await axios.post(`/comments/`, {
          userId: currentUser._id,
          postId: post._id,
          desc,
        });
        console.log(res.data);
      };
      createComment();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <Link to={`/${post.userId}`} className='styledLink'>
            <div className='postTopLeft'>
              <img className='postProfileImg' src={userImg} alt='' />
              <span className='postUsername'>{username}</span>
            </div>
          </Link>
          <div className='postTopRight'>
            <span className='postDate'>{Date(post.createdAt)}</span>
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post?.desc}</span>

          <div>
            {post?.tags.map((tag) => (
              <span className='postTags'>#{tag} </span>
            ))}
          </div>
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
            <span className='postCommentText'>
              {postComments.length} comments
            </span>
          </div>
        </div>
        <div className='comment-wrapper'>
          <div className='comment-bar'>
            <img
              src={currentUser.profilePicture}
              alt=''
              className='postProfileImg'
            />
            <input
              type='text'
              id='comment-box'
              placeholder='comment...'
              onChange={(e) => setDesc(e.target.value)}
            />
            <button className='comment-btn' onClick={handleAddCmt}>
              Send
            </button>
          </div>
          {postComments.map((comment) => (
            <Comment
              comment={comment}
              key={comment._id}
              commentId={comment._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
