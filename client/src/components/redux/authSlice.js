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

//first ma result bhanne json from backend aucha jun chai post garda action ma userData bhayera bascha. user data bhitra data huncha, data bhitra result.
//userData.data bhaneko hamro backend bata aako result ho. Teslai hamile reducer ma userData bhanne array banayera rakhchau.
//Ani userData ko value ma bhako userid lai useSelector use garera value fetch garchau

export const postNewUser = createAsyncThunk(
  "post/users",
  async (payload, { rejectWithValue }) => {
    try {
      const url = "http://localhost:3001/blood";
      const userData = await axios.post(url, payload);
      console.log("signupppppp", payload);
      return [userData.data, null];
    } catch (error) {
      const err = rejectWithValue(error).payload.response.data;
      return [null, err];
    }
  }
);

export const verifyNewUser = createAsyncThunk(
  "post/verifyusers",
  async (payload, { rejectWithValue }) => {
    try {
      const url = "http://localhost:3001/verifyuser";
      const userData = await axios.post(url, payload);
      console.log(payload);
      return [userData, null];
    } catch (error) {
      const err = rejectWithValue(error).payload.response.data;
      return [null, err];
    }
  }
);

export const loginNewUser = createAsyncThunk(
  "post/login",
  async (payload, { rejectWithValue }) => {
    try {
      const url = "http://localhost:3001/userlogin";
      const userData = await axios.post(url, payload);
      console.log("login", userData);
      return [userData.data, null]; //.data thiyo
    } catch (error) {
      const err = rejectWithValue(error).payload.response.data;
      return [null, err];
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "post/forgetpassword",
  async (payload, { rejectWithValue }) => {
    try {
      const url = "http://localhost:3001/userresetpassword";
      const userData = await axios.post(url, payload);
      console.log("here", payload);
      return [userData, null];
    } catch (error) {
      const err = rejectWithValue(error).payload.response.data;
      return [null, err];
    }
  }
);

export const setPassword = createAsyncThunk(
  "post/setpassword",
  async (payload, { rejectWithValue }) => {
    try {
      const url = "http://localhost:3001/usersetpassword";
      const userData = await axios.post(url, payload);
      console.log("here", payload);
      return [userData, null];
    } catch (error) {
      const err = rejectWithValue(error).payload.response.data;
      return [null, err];
    }
  }
);

export const becomeDonor = createAsyncThunk(
  "post/becomedonor",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("payloaaaaaaaaaad", payload);
      const url = `http://localhost:3001/becomeDonor/${payload}`;

      const userData = await axios.post(url, payload);
      console.log("here", payload);
      console.log(userData);
      return [userData.data, null];
    } catch (error) {
      const err = rejectWithValue(error).payload.response.data;
      return [null, err];
    }
  }
);

export const editProfile = createAsyncThunk(
  "post/editprofile",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("payloaaaaaaaaaad", payload);
      const url = `http://localhost:3001/editprofile`;

      const userData = await axios.post(url, payload);
      console.log("here", payload);
      console.log(userData);
      return [userData.data, null];
    } catch (error) {
      const err = rejectWithValue(error).payload.response.data;
      return [null, err];
    }
  }
);

export const changePassword = createAsyncThunk(
  "post/changepassword",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("payloaaaaaaaaaad", payload);
      const url = `http://localhost:3001/changepassword`;

      const userData = await axios.post(url, payload);
      console.log("here", payload);
      console.log(userData);
      return [userData.data, null];
    } catch (error) {
      const err = rejectWithValue(error).payload.response.data;
      return [null, err];
    }
  }
);

export const searchDonor = createAsyncThunk(
  "post/searchdonors",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("payloaaaaaaaaaad", payload);
      const url = `http://localhost:3001/searchdonor`;

      const userData = await axios.post(url, payload);
      console.log("here", payload);
      console.log(userData);
      return [userData.data, null];
    } catch (error) {
      const err = rejectWithValue(error).payload.response.data;
      return [null, err];
    }
  }
);

export const logout = createAsyncThunk(
  "post/logout",
  async (payload, { rejectWithValue }) => {
    return [];
  }

  // {return null;}
);

const initialState = {
  loading: false,
  error: "",
  userData: [],
  auth: false,
  token: null,
  signUp: [],
  donors: [],
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
        state.signUp = userData;
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
        state.userData = userData;
      } else {
        state.error = error;
      }
    },
    [verifyNewUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [loginNewUser.fulfilled]: (state, action) => {
      state.loading = false;
      const [userData, error] = action.payload;
      if (!error) {
        state.userData = userData.result;
        state.auth = userData.auth;
        state.token = userData.token;
      } else {
        state.error = error;
      }
    },
    [loginNewUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [forgetPassword.fulfilled]: (state, action) => {
      state.loading = false;
      const [userData, error] = action.payload;
      if (!error) {
        state.userData = userData;
      } else {
        state.error = error;
      }
    },
    [forgetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [setPassword.fulfilled]: (state, action) => {
      state.loading = false;
      const [userData, error] = action.payload;
      if (!error) {
        state.userData = userData;
      } else {
        state.error = error;
      }
    },
    [setPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = false;
      state.token = null;
      const [userData, error] = action.payload;

      state.userData = [];
    },
    [becomeDonor.fulfilled]: (state, action) => {
      state.loading = false;
      const [userData, error] = action.payload;
      if (!error) {
        state.userData = userData.result;
      } else {
        state.error = error;
      }
    },
    [becomeDonor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [editProfile.fulfilled]: (state, action) => {
      state.loading = false;
      const [userData, error] = action.payload;
      if (!error) {
        state.userData = userData.result;
      } else {
        state.error = error;
      }
    },
    [editProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.loading = false;
      const [userData, error] = action.payload;
      if (!error) {
        state.userData = userData.result;
      } else {
        state.error = error;
      }
    },
    [changePassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [searchDonor.fulfilled]: (state, action) => {
      state.loading = false;
      const [userData, error] = action.payload;
      if (!error) {
        state.donors = userData.result;
      } else {
        state.error = error;
      }
    },
    [searchDonor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = userDetailSlice;

export const {} = actions;
export default reducer;
