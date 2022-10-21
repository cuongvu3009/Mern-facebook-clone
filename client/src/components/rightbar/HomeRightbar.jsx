import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FriendCard from '../friendCard/FriendCard';

const HomeRightbar = () => {
  return (
    <>
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
          <h4 className='rightbarTitle'>Online Friends</h4>
          <ul className='rightbarFriendList'>
            {Users.map((u) => (
              <Online key={u.id} user={u} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomeRightbar;
