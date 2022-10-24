import './rightbar.css';

import Online from '../online/Online';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const HomeRightbar = () => {
  const [users, setUsers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [notFollowings, setNotFollowings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      //	reset state
      setLoading(true);

      try {
        const res = await axios.get('/users/');
        if (!res) throw new Error('Could not complete');
        setUsers(res?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      //	reset state

      try {
        const res = await axios.get('/users/following');
        if (!res) throw new Error('Could not complete');
        setFollowings(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, []);

  useEffect(() => {
    const getNotFollow = () => {
      if (followings.length === 0) {
        let notFollow = users.filter((u) => u._id !== currentUser._id);
        setNotFollowings(notFollow);
      }
      for (let i = 0; i < followings.length; i++) {
        let notFollow = users.filter(
          (u) => u._id !== followings[i] && u._id !== currentUser._id
        );

        setNotFollowings(notFollow);
      }
    };
    getNotFollow();
  }, [followings, currentUser._id, users]);

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <div className='rightbar'>
          <div className='rightbarWrapper'>
            <div className='birthdayContainer'>
              <img className='birthdayImg' src='assets/gift.png' alt='' />
              <span className='birthdayText'>
                <b>Pola Foster</b> and <b>3 other friends</b> have a birhday
                today.
              </span>
            </div>
            <img className='rightbarAd' src='assets/ad.png' alt='' />
            <h4 className='rightbarTitle'>Friends you can make</h4>
            <ul className='rightbarFriendList'>
              {notFollowings.map((u) => (
                <Online key={u.id} user={u} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeRightbar;
