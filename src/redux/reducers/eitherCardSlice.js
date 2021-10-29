import { createSlice } from "@reduxjs/toolkit";
import _concat from "lodash/concat";
import _remove from "lodash/remove";
import _find from "lodash/find";

import {
  PostDB,
  PostingDB,
  PostCompleteDB,
  addPostDB,
  editPostDB,
  deletePostDB,
  completePostDB,
  likePostDB,
  votePostDB,
} from "../actions/eitherCard";

// 기본 state
export const initialState = {
  PostDBLoading: false,
  PostDBDone: false,
  PostDBError: null,
  eitherPost: [],
  PostingDBLoading: false,
  PostingDBDone: false,
  PostingDBError: null,
  eitherPosting: [],
  PostCompleteDBLoading: false,
  PostCompleteDBDone: false,
  PostCompleteDBError: null,
  eitherPostComplete: [],
  addPostDBLoading: false,
  addPostDBDone: false,
  addPostDBError: null,
  editPostDBLoading: false,
  editPostDBDone: false,
  editPostDBError: null,
  deletePostDBLoading: false,
  deletePostDBDone: false,
  deletePostDBError: null,
  completePostDBLoading: false,
  completePostDBDone: false,
  completePostDBError: null,
  likePostDBLoading: false,
  likePostDBDone: false,
  likePostDBError: null,
  votePostDBLoading: false,
  votePostDBDone: false,
  votePostDBError: null,
};

// toolkit 사용방법
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // logoutUser: state => {
    //   state.userInfo = null;
    //   state.loginDone = false;
    // },
  },
  extraReducers: builder =>
    builder
      // Post 전체보기
      .addCase(PostDB.pending, state => {
        state.PostDBLoading = true;
        state.PostDBDone = false;
        state.PostDBError = null;
      })
      .addCase(PostDB.fulfilled, (state, action) => {
        state.PostDBLoading = false;
        state.PostDBDone = true;
        state.eitherPost = action.payload;
      })
      .addCase(PostDB.rejected, (state, action) => {
        state.PostDBLoading = false;
        state.PostDBError = action.error;
      })
      // Post 진행중보기
      .addCase(PostingDB.pending, state => {
        state.PostingDBLoading = true;
        state.PostingDBDone = false;
        state.PostingDBError = null;
      })
      .addCase(PostingDB.fulfilled, (state, action) => {
        state.PostingDBLoading = false;
        state.PostingDBDone = true;
        state.eitherPosting = action.payload;
      })
      .addCase(PostingDB.rejected, (state, action) => {
        state.PostDBLoading = false;
        state.PostDBError = action.payload;
      })
      // Post 종료보기
      .addCase(PostCompleteDB.pending, state => {
        state.PostCompleteDBLoading = true;
        state.PostCompleteDBDone = false;
        state.PostCompleteDBError = null;
      })
      .addCase(PostCompleteDB.fulfilled, (state, action) => {
        state.PostCompleteDBLoading = false;
        state.PostCompleteDBDone = true;
        state.eitherPostComplete = action.payload;
      })
      .addCase(PostCompleteDB.rejected, (state, action) => {
        state.PostCompleteDBLoading = false;
        state.PostCompleteDBError = action.payload;
      })
      // Post 작성하기
      .addCase(addPostDB.pending, state => {
        state.addPostDBLoading = true;
        state.addPostDBDone = false;
        state.addPostDBError = null;
      })
      .addCase(addPostDB.fulfilled, (state, action) => {
        state.addPostDBLoading = false;
        state.addPostDBDone = true;
        state.eitherPost.unshift(action.payload);
      })
      .addCase(addPostDB.rejected, (state, action) => {
        state.addPostDBLoading = false;
        state.addPostDBError = action.payload;
      })
      // Post 수정하기
      .addCase(editPostDB.pending, state => {
        state.editPostDBLoading = true;
        state.editPostDBDone = false;
        state.editPostDBError = null;
      })
      .addCase(editPostDB.fulfilled, (state, action) => {
        state.editPostDBLoading = false;
        state.editPostDBDone = true;
        const post = _find(state.eitherPost, { id: action.payload.eitherId });
        //검토 필요
        post.content = action.payload.content;
      })
      .addCase(editPostDB.rejected, (state, action) => {
        state.editPostDBLoading = false;
        state.editPostDBError = action.payload;
      })
      // Post 삭제하기
      .addCase(deletePostDB.pending, state => {
        state.deletePostDBLoading = true;
        state.deletePostDBDone = false;
        state.deletePostDBError = null;
      })
      .addCase(deletePostDB.fulfilled, (state, action) => {
        state.deletePostDBLoading = false;
        state.deletePostDBDone = true;
        _remove(state.eitherPost, { id: action.payload.eitherId });
      })
      .addCase(deletePostDB.rejected, (state, action) => {
        state.deletePostDBLoading = false;
        state.deletePostDBError = action.payload;
      })
      // Post 종료하기
      .addCase(completePostDB.pending, state => {
        state.completePostDBLoading = true;
        state.completePostDBDone = false;
        state.completePostDBError = null;
      })
      .addCase(completePostDB.fulfilled, (state, action) => {
        state.completePostDBLoading = false;
        state.completePostDBDone = true;
        const post = _find(state.eitherPost, { id: action.payload.eitherId });
        post.voted = action.payload.voted(true);
      })
      .addCase(completePostDB.rejected, (state, action) => {
        state.completePostDBLoading = false;
        state.completePostDBError = action.payload;
      })
      // Post 좋아요
      .addCase(likePostDB.pending, state => {
        state.likePostDBLoading = true;
        state.likePostDBDone = false;
        state.likePostDBError = null;
      })
      .addCase(likePostDB.fulfilled, (state, action) => {
        state.likePostDBLoading = false;
        state.likePostDBDone = true;
        const post = _find(state.eitherPost, { id: action.payload.eitherId });
        post.likeNum = action.payload.likeNum + 1;
      })
      .addCase(likePostDB.rejected, (state, action) => {
        state.likePostDBLoading = false;
        state.likePostDBError = action.payload;
      })
      // Post 투표하기
      .addCase(votePostDB.pending, state => {
        state.votePostDBLoading = true;
        state.votePostDBDone = false;
        state.votePostDBError = null;
      })
      .addCase(votePostDB.fulfilled, (state, action) => {
        state.votePostDBLoading = false;
        state.votePostDBDone = true;
      })
      .addCase(votePostDB.rejected, (state, action) => {
        state.votePostDBLoading = false;
        state.votePostDBError = action.payload;
      }),
});

export default postSlice;