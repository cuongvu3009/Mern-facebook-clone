import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPost: null,
  loading: false,
  error: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentPost = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      if (!state.currentPost.likes.includes(action.payload)) {
        state.currentPost.likes.push(action.payload);
        state.currentPost.dislikes.splice(
          state.currentPost.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.currentPost.dislikes.includes(action.payload)) {
        state.currentPost.dislikes.push(action.payload);
        state.currentPost.likes.splice(
          state.currentPost.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } =
  postSlice.actions;

export default postSlice.reducer;
