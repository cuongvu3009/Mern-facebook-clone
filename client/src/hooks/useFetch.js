import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchFailure, fetchStart, fetchSuccess } from '../redux/postSlice';

export const useFetch = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(fetchStart);
      try {
        const res = await axios.get('/posts');
        dispatch(fetchSuccess(res.data));

        console.log(res.data);
      } catch (error) {
        console.log(error);
        dispatch(fetchFailure());
      }
    };
    fetchPosts();
  }, [dispatch]);
};
