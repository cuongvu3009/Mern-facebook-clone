import './profile.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import ProfileFeed from '../../components/feed/ProfileFeed';

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className='profile'>
        <Sidebar />
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
                src='assets/person/7.jpeg'
                alt=''
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>Safak Kocaoglu</h4>
              <span className='profileInfoDesc'>Hello my friends!</span>
            </div>
          </div>

          <div className='profileRightBottom'>
            <ProfileFeed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
