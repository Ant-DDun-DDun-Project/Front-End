import { createSlice } from "@reduxjs/toolkit";

import {
  checkIdDup,
  checkNickDup,
  getProfileNick,
  login,
  signup,
  updateNick,
} from "../actions/user";

// 기본 state
export const initialState = {
  userInfo: { nickname: "GUEST", userId: null },
  profileNick: null,
  loginLoading: false, // 로그인 시도 중
  loginDone: false,
  loginError: null,
  signupLoading: false, // 회원가입 시도 중
  signupDone: false,
  signupError: null,
  checkIdDupLoading: false, // 아이디중복 체크 중
  checkIdDupDone: false,
  checkIdDupError: null,
  checkIdDupResult: null,
  checkNickDupLoading: false, // 닉네임중복 체크 중
  checkNickDupDone: false,
  checkNickDupError: null,
  checkNickDupResult: null,
  mainDataLoading: false, // 메인페이지 정보 get 시도 중
  mainDataDone: false,
  mainDataError: null,
  updateNickLoading: false,
  updateNickDone: false,
  updateNickError: null,
  getProfileNickLoading: false,
  getProfileNickDone: false,
  getProfileNickError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginCheck: state => {
      if (localStorage.getItem("nickname")) {
        state.userInfo.nickname = localStorage.getItem("nickname");
        state.userInfo.userId = Number(localStorage.getItem("userId"));
        return;
      }
      state.userInfo.nickname = "GUEST";
    },
    logoutUser: state => {
      state.userInfo = { nickname: "GUEST", userId: null };
      state.profileNick = null;
      state.loginDone = false;
      localStorage.removeItem("token");
      localStorage.removeItem("nickname");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: builder =>
    builder
      // login
      .addCase(login.pending, state => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        const base64Payload = action.payload.token.split(".")[1];
        const payload = Buffer.from(base64Payload, "base64");
        const result = JSON.parse(payload.toString());
        localStorage.setItem("userId", result.id);
        localStorage.setItem("nickname", action.payload.nickname);

        state.loginLoading = false;
        state.userInfo.nickname = action.payload.nickname;
        state.userInfo.userId = result.id;
        state.loginDone = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })
      // signup
      .addCase(signup.pending, state => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, state => {
        state.signupLoading = false;
        state.signupDone = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.payload;
      })
      // checkIdDup
      .addCase(checkIdDup.pending, state => {
        state.checkIdDupLoading = true;
        state.checkIdDupDone = false;
        state.checkIdDupError = null;
      })
      .addCase(checkIdDup.fulfilled, (state, action) => {
        state.checkIdDupLoading = false;
        state.checkIdDupDone = true;
        state.checkIdDupResult = action.payload.success;
      })
      .addCase(checkIdDup.rejected, (state, action) => {
        state.checkIdDupLoading = false;
        state.checkIdDupError = action.payload;
        state.checkIdDupResult = action.payload?.success;
      })
      // checkNickDup
      .addCase(checkNickDup.pending, state => {
        state.checkNickDupLoading = true;
        state.checkNickDupDone = false;
        state.checkNickDupError = null;
      })
      .addCase(checkNickDup.fulfilled, (state, action) => {
        state.checkNickDupLoading = false;
        state.checkNickDupDone = true;
        state.checkNickDupResult = action.payload.success;
      })
      .addCase(checkNickDup.rejected, (state, action) => {
        state.checkNickDupLoading = false;
        state.checkNickDupError = action.payload;
        state.checkNickDupResult = action.payload?.success;
      })
      // updateNick
      .addCase(updateNick.pending, state => {
        state.updateNickLoading = true;
        state.updateNickDone = false;
        state.updateNickError = null;
      })
      .addCase(updateNick.fulfilled, (state, action) => {
        state.updateNickLoading = false;
        state.updateNickDone = true;
        state.userInfo.nickname = action.payload.nickname;
        state.profileNick = action.payload.nickname;
        localStorage["nickname"] = action.payload.nickname;
      })
      .addCase(updateNick.rejected, (state, action) => {
        state.updateNickLoading = false;
        state.updateNickDone = false;
        state.updateNickError = action.payload;
        if (action.payload === "Validation error") {
          alert("이미 사용중인 닉네임입니다");
          return;
        }

        if (
          action.payload ===
          '"nickname" length must be less than or equal to 7 characters long'
        ) {
          alert("닉네임은 2~7자로 설정해 주세요");
        }
      })
      // getProfileNick
      .addCase(getProfileNick.pending, state => {
        state.getProfileNickLoading = true;
        state.getProfileNickDone = false;
        state.getProfileNickError = null;
      })
      .addCase(getProfileNick.fulfilled, (state, action) => {
        state.getProfileNickLoading = false;
        state.getProfileNickDone = true;
        state.profileNick = action.payload.nickname;
      })
      .addCase(getProfileNick.rejected, (state, action) => {
        state.getProfileNickLoading = false;
        state.getProfileNickDone = false;
        state.getProfileNickError = action.payload;
      }),
});

export const { loginCheck, logoutUser } = userSlice.actions;

export default userSlice;
