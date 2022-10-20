import React, { useState } from 'react';
import './share.css';
import { MdPermMedia, MdLabel } from 'react-icons/md';
import { projectStorage } from '../../firebase';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Share() {
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState([]);
  const [img, setImg] = useState('');
  const [imgErr, setImgErr] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  const handleTags = (e) => {
    e.preventDefault();
    setTags(e.target.value.split(','));
  };

  //	upload user profile picture
  const handleFileUpload = async (e) => {
    let selected = e.target.files[0];

    //	check if selected or not
    if (!selected) {
      setImgErr('Please select a file');
      return;
    }

    //	check if image
    if (!selected.type.includes('image')) {
      setImgErr('Selected file must be an image');
      return;
    }

    //	check image size
    if (selected.size > 10000000) {
      setImgErr('Image size must be less than 10mb');
      return;
    }

    const uploadPath = `posts/${currentUser.username}/${selected.name}`;
    const img = await projectStorage.ref(uploadPath).put(selected);
    const imgUrl = await img.ref.getDownloadURL();

    console.log(imgUrl);
    setImgErr(null);
    setImg(imgUrl);
    console.log('thumbnail upload!');
  };

  const handleUpload = async () => {
    try {
      await axios.post('/posts', { img, desc, tags });
      setImg('');
      setDesc('');
      setTags([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            className='shareProfileImg'
            src={currentUser.profilePicture}
            alt={currentUser.profilePicture}
          />
          <input
            placeholder="What's in your mind?"
            className='shareInput'
            onChange={(e) => setDesc(e.target.value)}
          ></input>
          {imgErr && <div className='error'>{imgErr}</div>}
        </div>

        <hr className='shareHr' />

        <div className='shareBottom'>
          <div className='shareOptions'>
            <div className='shareOption'>
              <MdPermMedia htmlColor='tomato' className='shareIcon' />

              <input type='file' accept='image/*' onChange={handleFileUpload} />
            </div>

            <div className='shareOption'>
              <MdLabel htmlColor='blue' className='shareIcon' />
              <input
                type='text'
                placeholder='Input a tags with commas.'
                onChange={handleTags}
              ></input>
            </div>
          </div>

          <button className='shareButton' onClick={handleUpload}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
