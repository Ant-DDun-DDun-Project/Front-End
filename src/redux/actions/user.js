import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../shared/api";
import { history } from "../configureStore";

export const login = createAsyncThunk(
  "/users/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/login", data);
      history.push("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// export const loginCheck = createAsyncThunk(
//   "/users/loginCheck",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/users/login");
//       console.log(response.data);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

// export const logout = createAsyncThunk(
//   "/users/logout",
//   async (data, { rejectWithValue }) => {
//     try {
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       localStorage.removeItem("nickname");
//       const response = await api.get("/users/logout");
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

export const signup = createAsyncThunk(
  "/users/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/signup", data);
      alert("회원가입이 되었습니다");
      history.push("/login");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const checkIdDup = createAsyncThunk(
  "/users/signup/id",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/signup/id", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const checkNickDup = createAsyncThunk(
  "/users/signup/nick",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/signup/nick", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateNick = createAsyncThunk(
  "/profiles/updateNick",
  async (nickname, { rejectWithValue }) => {
    try {
      const response = await api.patch("/profiles/nick", { nickname });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getProfileNick = createAsyncThunk(
  "/profiles/getnick",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/profiles/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
