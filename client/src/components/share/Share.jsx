import React, { useState, useEffect } from 'react';
import './share.css';
import { MdPermMedia, MdLabel } from 'react-icons/md';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../../firebase';
import axios from 'axios';

export default function Share() {
  const [img, setImg] = useState('');
  const [desc, setDesc] = useState('');
  const [imgSrc, setImgSrc] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [imgPerc, setImgPerc] = useState(0);
  const [isSent, setIsSent] = useState(false);

  const handleTags = (e) => {
    e.preventDefault();
    setTags(e.target.value.split(','));
  };

  // urlType gonna be used later if video upload needed
  //	img as argument, and trigger upload file
  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',

      //	upload process percentage
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },

      (error) => {
        console.log(error);
      },

      //	set img download link to post it to server
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImg(downloadURL);
        });
      }
    );
  };

  //	2. trigger upload file if img from local exist
  useEffect(() => {
    imgSrc && uploadFile(imgSrc);
  }, [imgSrc]);

  const handleUpload = async () => {
    setIsSent(false);
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
          <img className='shareProfileImg' src='/assets/person/1.jpeg' alt='' />
          <input
            placeholder="What's in your mind Safak?"
            className='shareInput'
            onChange={(e) => setDesc(e.target.value)}
          ></input>
        </div>

        <hr className='shareHr' />

        <div className='shareBottom'>
          <div className='shareOptions'>
            <div className='shareOption'>
              <MdPermMedia htmlColor='tomato' className='shareIcon' />
              <input
                type='file'
                accept='image/*'
                //	1.start from here, get img from local
                onChange={(e) => setImgSrc(e.target.files[0])}
              ></input>
              {imgPerc}%
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
