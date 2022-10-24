import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const FriendCard = ({ user }) => {
  const [friend, setFriend] = useState({});

  useEffect(() => {
    const fetchFriend = async () => {
      const res = await axios.get(`/users/find/${user}`);
      setFriend(res?.data);
    };

    fetchFriend();
  }, [user]);

  return (
    <div className='rightbarFollowing' key={friend._id}>
      <img
        src={friend.profilePicture}
        alt={friend.profilePicture}
        className='rightbarFollowingImg'
      />
      <span className='rightbarFollowingName'>{friend.username}</span>
    </div>
  );
};

export default FriendCard;
