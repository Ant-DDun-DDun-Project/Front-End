import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

// childComment 작성하기
export const AddChildDB = createAsyncThunk(
  "multiPost/AddChildDB",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/posts/multi/${data.multiId}/comment/${data.id}`,
        data.data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// childComment 수정하기
export const EditChildDB = createAsyncThunk(
  "multiPost/EditChildDB",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/posts/multi/${data.multiId}/childComment/${data.id}/edit`,
        data.data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// childComment 삭제하기
export const DelChildDB = createAsyncThunk(
  "multiPost/DelChildDB",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/posts/multi/${data.multiId}/childComment/${data.id}/delete`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
