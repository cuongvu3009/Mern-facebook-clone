import './profile.css';
import Topbar from '../../components/topbar/Topbar';
import ProfileFeed from '../../components/feed/ProfileFeed';
import { useSelector } from 'react-redux';
import ProfileRightbar from '../../components/rightbar/ProfileRightbar';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Topbar />
      <div className='profile'>
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                className='profileCoverImg'
                src='assets/post/3.jpeg'
                alt=''
              />
              <img
                className='profileUserImg'
                src={currentUser.profilePicture}
                alt=''
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>{currentUser.username}</h4>
              <span className='profileInfoDesc'>Hello my friends!</span>
            </div>
          </div>

          <div className='profileRightBottom'>
            <ProfileFeed />
            <ProfileRightbar />
          </div>
        </div>
      </div>
    </>
  );
}
