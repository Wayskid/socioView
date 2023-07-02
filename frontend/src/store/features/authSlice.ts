import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthInitialStateType {
  token: String;
  isReg: Boolean;
}

const initialState: AuthInitialStateType = {
  token: "",
  isReg: false,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<String>) => {
      state.token = action.payload;
    },
    setIsReg: (state, action: PayloadAction<Boolean>) => {
      state.isReg = action.payload;
    },
  },
});

export const { setToken, setIsReg } = AuthSlice.actions;
export default AuthSlice.reducer;
