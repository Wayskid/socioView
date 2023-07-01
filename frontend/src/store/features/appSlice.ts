import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface appInitialStateType {
  openCloseChangePassword: Boolean;
  imageToShow: String;
  showImage: Boolean;
  darkMode: Boolean;
}

const initialState: appInitialStateType = {
  openCloseChangePassword: false,
  imageToShow: "",
  showImage: false,
  darkMode: false,
};

export const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setOpenCloseChangePassword: (state) => {
      state.openCloseChangePassword = !state.openCloseChangePassword;
    },
    setImageToShow: (state, action: PayloadAction<String>) => {
      state.imageToShow = action.payload;
    },
    setShowImage: (state) => {
      state.showImage = !state.showImage;
    },
    setDarkMode: (state)=>{
      state.darkMode = !state.darkMode
    }
  },
});

export const {
  setOpenCloseChangePassword,
  setImageToShow,
  setShowImage,
  setDarkMode,
} = AppSlice.actions;
export default AppSlice.reducer;
