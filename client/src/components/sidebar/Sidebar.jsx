import './sidebar.css';

import { MdRssFeed, MdHelpCenter, MdWork } from 'react-icons/md';
import {
  BsChatLeftDotsFill,
  BsFillPlayCircleFill,
  BsFillBookmarkFill,
  BsCalendarEventFill,
} from 'react-icons/bs';
import { HiUserGroup } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <MdRssFeed className='sidebarIcon' />
            <span className='sidebarListItemText'>Feed</span>
          </li>
          <li className='sidebarListItem'>
            <BsChatLeftDotsFill className='sidebarIcon' />
            <span className='sidebarListItemText'>Chats</span>
          </li>
          <li className='sidebarListItem'>
            <BsFillPlayCircleFill className='sidebarIcon' />
            <span className='sidebarListItemText'>Videos</span>
          </li>
          <li className='sidebarListItem'>
            <HiUserGroup className='sidebarIcon' />
            <span className='sidebarListItemText'>Groups</span>
          </li>
          <li className='sidebarListItem'>
            <BsFillBookmarkFill className='sidebarIcon' />
            <span className='sidebarListItemText'>Bookmarks</span>
          </li>
          <li className='sidebarListItem'>
            <MdHelpCenter className='sidebarIcon' />
            <span className='sidebarListItemText'>Questions</span>
          </li>
          <li className='sidebarListItem'>
            <MdWork className='sidebarIcon' />
            <span className='sidebarListItemText'>Jobs</span>
          </li>
          <li className='sidebarListItem'>
            <BsCalendarEventFill className='sidebarIcon' />
            <span className='sidebarListItemText'>Events</span>
          </li>
        </ul>
        <button className='sidebarButton'>Show More</button>
        <hr className='sidebarHr' />
        <button className='logoutButton' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
