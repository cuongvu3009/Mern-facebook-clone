import './topbar.css';

import { FaSearch } from 'react-icons/fa';
import { BsFillPersonFill, BsFillChatFill } from 'react-icons/bs';
import { MdNotificationsActive } from 'react-icons/md';
import { useSelector } from 'react-redux';

export default function Topbar() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <span className='logo'>MernSocial</span>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <FaSearch className='searchIcon' />
          <input
            placeholder='Search for friend, post or video'
            className='searchInput'
          />
        </div>
      </div>
      <div className='topbarRight'>
        <div className='topbarLinks'>
          <span className='topbarLink'>Homepage</span>
          <span className='topbarLink'>Timeline</span>
        </div>
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
        <img
          src={currentUser.profilePicture}
          alt={currentUser.profilePicture}
          className='topbarImg'
        />
      </div>
    </div>
  );
}
