import './rightbar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import FriendCard from '../friendCard/FriendCard';
import UserCard from '../friendCard/UserCard';

const ProfileRightbar = () => {
  const [users, setUsers] = useState([]);
  const [friendReq, setFriendReq] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      //	reset state
      setLoading(true);

      try {
        const res = await axios.get('/users/following');
        if (!res) throw new Error('Could not complete');
        setUsers(res?.data);
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
        const res = await axios.get('/users/notfollowing');
        if (!res) throw new Error('Could not complete');
        setFriendReq(res?.data);
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
              {users?.map((user) => (
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
          {/* <h4 className='rightbarTitle'>Followers</h4>
          {loading ? (
            'Loading'
          ) : (
            <div className='rightbarFollowings'>
              {users.map((user) => (
                <>
                  {user ? (
                    <Link to={`/${user._id}`} className='styledLink'>
                      <div className='rightbarFollowing' key={user._id}>
                        <img
                          src={user.profilePicture}
                          alt={user.profilePicture}
                          className='rightbarFollowingImg'
                        />
                        <span className='rightbarFollowingName'>
                          {user.username}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <p>You have no friends, let following</p>
                  )}
                </>
              ))}
            </div>
          )} */}

          <hr />

          {/* Friend accept */}
          <h4 className='rightbarTitle'>Explore new friends</h4>
          {loading ? (
            'Loading'
          ) : (
            <div className='rightbarFollowings'>
              {friendReq.map((user) => (
                <UserCard user={user} key={user._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileRightbar;
