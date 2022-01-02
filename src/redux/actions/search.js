import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";
import { history } from "../configureStore";

export const search = createAsyncThunk(
  "/search/keyword",
  async (value, { rejectWithValue }) => {
    try {
      const response = await api.get(`/search`, { params: { keyword: value } });
      return response.data;
    } catch (err) {
      alert("서버와의 통신이 원활하지 않습니다");
      history.replace("/");
      return rejectWithValue(err.response.data);
    }
  },
);
