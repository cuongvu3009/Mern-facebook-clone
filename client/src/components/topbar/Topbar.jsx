import './topbar.css';

import { FaSearch } from 'react-icons/fa';
import { BsFillPersonFill, BsFillChatFill } from 'react-icons/bs';
import { MdNotificationsActive } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Topbar() {
  const { currentUser } = useSelector((state) => state.user);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${q}`);
  };

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <span className='logo'>
          <Link className='styledLink' to='/'>
            MernSocial
          </Link>
        </span>
      </div>
      <div className='topbarCenter'>
        <form className='searchbar' onSubmit={handleSearch}>
          <FaSearch className='searchIcon' />

          <input
            placeholder='Search for post or tags'
            className='searchInput'
            onChange={(e) => setQ(e.target.value)}
          />
        </form>
      </div>
      <div className='topbarRight'>
        <div className='topbarIcons'>
          <div className='topbarIconItem'>
            <BsFillPersonFill />
            <span className='topbarIconBadge'>1</span>
          </div>
          <div className='topbarIconItem'>
            <BsFillChatFill />
            <span className='topbarIconBadge'>2</span>
          </div>
          <div className='topbarIconItem'>
            <MdNotificationsActive />
            <span className='topbarIconBadge'>1</span>
          </div>
        </div>

        <Link className='styledLink' to={`/${currentUser._id}`}>
          <div className='topbarLinks'>
            <span className='topbarLink'>Hi, {currentUser.username}</span>
            <span className='topbarLink'>
              <img
                src={currentUser.profilePicture}
                alt={currentUser.profilePicture}
                className='topbarImg'
              />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
