import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface appInitialStateType {
  openCloseChangePassword: Boolean;
  imageToShow: String;
  showImage: Boolean;
  darkMode: Boolean;
  alertMsg: String;
  showAlert: Boolean;
}

const initialState: appInitialStateType = {
  openCloseChangePassword: false,
  imageToShow: "",
  showImage: false,
  darkMode: false,
  alertMsg: "",
  showAlert: false,
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
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setAlertMsg: (state, action: PayloadAction<String>) => {
      state.alertMsg = action.payload;
    },
    setShowAlert: (state, action: PayloadAction<Boolean>) => {
      state.showAlert = action.payload;
    },
  },
});

export const {
  setOpenCloseChangePassword,
  setImageToShow,
  setShowImage,
  setDarkMode,
  setAlertMsg,
  setShowAlert,
} = AppSlice.actions;
export default AppSlice.reducer;
