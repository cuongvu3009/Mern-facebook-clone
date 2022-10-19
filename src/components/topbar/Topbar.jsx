import './topbar.css';

import { FaSearch } from 'react-icons/fa';
import { BsFillPersonFill, BsFillChatFill } from 'react-icons/bs';
import { MdNotificationsActive } from 'react-icons/md';

export default function Topbar() {
  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <span className='logo'>Lamasocial</span>
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
        <img src='/assets/person/1.jpeg' alt='' className='topbarImg' />
      </div>
    </div>
  );
}
