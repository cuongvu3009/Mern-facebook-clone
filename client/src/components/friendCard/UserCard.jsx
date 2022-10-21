import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  const handleAddFriend = async () => {
    try {
      await axios.put(`/users/sub/${user._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <Link to={`/${user._id}`} className='styledLink'>
    <div className='rightbarFollowing' key={user._id}>
      <img
        src={user.profilePicture}
        alt={user.profilePicture}
        className='rightbarFollowingImg'
      />
      <span className='rightbarFollowingName'>{user.username}</span>
      <button className='friend-req accept' onClick={handleAddFriend}>
        Accept
      </button>
      <button className='friend-req remove'>Remove</button>
    </div>
    // </Link>
  );
};

export default UserCard;
