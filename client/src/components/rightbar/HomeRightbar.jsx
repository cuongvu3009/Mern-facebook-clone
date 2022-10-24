import './rightbar.css';

import Online from '../online/Online';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const HomeRightbar = () => {
  const [users, setUsers] = useState([]);
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
              {users.map((u) => (
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
