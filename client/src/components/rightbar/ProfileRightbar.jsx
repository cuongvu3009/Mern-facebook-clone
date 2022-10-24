import './rightbar.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import FriendCard from '../friendCard/FriendCard';

const ProfileRightbar = () => {
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      //	reset state
      setLoading(true);

      try {
        const res = await axios.get('/users/following');
        if (!res) throw new Error('Could not complete');
        setFollowings(res?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      //	reset state
      setLoading(true);

      try {
        const res = await axios.get('/users/followers');
        if (!res) throw new Error('Could not complete');
        setFollowers(res?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  return (
    <>
      <div className='rightbar'>
        <div className='rightbarWrapper'>
          {/* user info */}
          <h4 className='rightbarTitle'>User information</h4>
          <div className='rightbarInfo'>
            <div className='rightbarInfoItem'>
              <span className='rightbarInfoKey'>City:</span>
              <span className='rightbarInfoValue'>New York</span>
            </div>
            <div className='rightbarInfoItem'>
              <span className='rightbarInfoKey'>From:</span>
              <span className='rightbarInfoValue'>Madrid</span>
            </div>
            <div className='rightbarInfoItem'>
              <span className='rightbarInfoKey'>Relationship:</span>
              <span className='rightbarInfoValue'>Single</span>
            </div>
          </div>

          <hr />

          {/* following */}
          <h4 className='rightbarTitle'>Followings</h4>
          {loading ? (
            'Loading'
          ) : (
            <div className='rightbarFollowings'>
              {followings?.map((user) => (
                <>
                  {user ? (
                    <FriendCard user={user} key={user} />
                  ) : (
                    <p>You have no friends, let following</p>
                  )}
                </>
              ))}
            </div>
          )}

          <hr />

          {/* followers */}
          <h4 className='rightbarTitle'>Followers</h4>
          {loading ? (
            'Loading'
          ) : (
            <div className='rightbarFollowings'>
              {followers?.map((user) => (
                <>
                  {user ? (
                    <FriendCard user={user} key={user} />
                  ) : (
                    <p>You have no friends, let following</p>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileRightbar;
