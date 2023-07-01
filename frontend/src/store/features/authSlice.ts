import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: initialStateType = {
  token: "",
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<String>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = AuthSlice.actions;
export default AuthSlice.reducer;
