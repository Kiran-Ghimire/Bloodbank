import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// export const fetchUserDetail = createAsyncThunk(
//   "get/user/",
//   async (payload) => {
//     try {
//       const userData = await axios.get(`http://localhost:3001`);
//       return [userData.data, null];
//     } catch (error) {
//       return [null, JSON.parse(error)];
//     }
//   }
// );

export const postNewUser = createAsyncThunk(
  "post/users",
  async (payload, { rejectWithValue }) => {
    try {
      const url = "http://localhost:3001/blood";
      const userData = await axios.post(url, payload);
      console.log(payload);
      return [userData.data, null];
    } catch (error) {
      const err = rejectWithValue(error).payload.response.data;
      return [null, err];
    }
  }
);

export const verifyNewUser = createAsyncThunk(
  "post/users",
  async (payload, { rejectWithValue }) => {
    try {
      const url = "http://localhost:3001/verifyuser";
      const userData = await axios.post(url, payload);
      console.log(payload);
      return [userData.data, null];
    } catch (error) {
      const err = rejectWithValue(error).payload.response.data;
      return [null, err];
    }
  }
);

// export const updateExistingUser = createAsyncThunk(
//   "patch/user",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const url = "/users";
//       const userData = await axiosInstance.patch(url, payload);
//       return [userData.data, null];
//     } catch (error) {
//       const err = rejectWithValue(error).payload.response.data;
//       return [null, err];
//     }
//   }
// );

const initialState = {
  data: [],
  loading: false,
  error: "",
};
const userDetailSlice = createSlice({
  initialState,
  name: "userDetail",
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    // [postNewUser.pending]: (state, action) => {
    //   state.loading = true;
    // },
    [postNewUser.fulfilled]: (state, action) => {
      state.loading = false;
      const [userData, error] = action.payload;
      if (!error) {
        state.data = userData.user;
      } else {
        state.error = error;
      }
    },
    [postNewUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [verifyNewUser.fulfilled]: (state, action) => {
      state.loading = false;
      const [userData, error] = action.payload;
      if (!error) {
        state.data = userData.user;
      } else {
        state.error = error;
      }
    },
    [verifyNewUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = userDetailSlice;

export const {} = actions;
export default reducer;
