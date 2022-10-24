import axios from 'axios';
import './online.css';

export default function Online({ user }) {
  const handleAddFriend = async () => {
    try {
      await axios.put(`/users/sub/${user._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className='rightbarFriend'>
      <div className='rightbarProfileImgContainer'>
        <img className='rightbarProfileImg' src={user.profilePicture} alt='' />
        <span className='rightbarOnline'></span>
      </div>
      <span className='rightbarUsername'>{user.username}</span>

      <div>
        <button className='friend-req accept' onClick={handleAddFriend}>
          Accept
        </button>
        <button className='friend-req remove'>Remove</button>
      </div>
    </li>
  );
}
