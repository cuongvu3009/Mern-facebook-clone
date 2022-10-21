import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className='birthdayContainer'>
          <img className='birthdayImg' src='assets/gift.png' alt='' />
          <span className='birthdayText'>
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className='rightbarAd' src='assets/ad.png' alt='' />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className='rightbarFriendList'>
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchFriends = async () => {
        //	reset state
        setLoading(true);

        try {
          const res = await axios.get('/users');
          if (!res) throw new Error('Could not complete sign up');
          setUsers(res.data);
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

        {/* user friend */}
        <h4 className='rightbarTitle'>Followings</h4>
        {loading ? (
          'Loading'
        ) : (
          <div className='rightbarFollowings'>
            {users.map((user) => (
              <Link to={`/${user._id}`} className='styledLink'>
                <div className='rightbarFollowing' key={user._id}>
                  <img
                    src={user.profilePicture}
                    alt={user.profilePicture}
                    className='rightbarFollowingImg'
                  />
                  <span className='rightbarFollowingName'>{user.username}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <hr />

        {/* Friend accept */}
        <h4 className='rightbarTitle'>Friend requests</h4>
        {loading ? (
          'Loading'
        ) : (
          <div className='rightbarFollowings'>
            {users.map((user) => (
              <Link to={`/${user._id}`} className='styledLink'>
                <div className='rightbarFollowing' key={user._id}>
                  <img
                    src={user.profilePicture}
                    alt={user.profilePicture}
                    className='rightbarFollowingImg'
                  />
                  <span className='rightbarFollowingName'>{user.username}</span>
                  <button className='friend-req accept'>Accept</button>
                  <button className='friend-req remove'>Remove</button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </>
    );
  };
  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
