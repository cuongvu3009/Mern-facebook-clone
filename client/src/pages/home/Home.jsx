import './home.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import HomeRightbar from '../../components/rightbar/HomeRightbar';

export default function Home() {
  return (
    <>
      <Topbar />
      <div className='homeContainer'>
        <Sidebar />
        <Feed />
        <HomeRightbar />
      </div>
    </>
  );
}
