import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { BiCheck } from "react-icons/bi";
import { setShowAlert } from "../../store/features/appSlice";

export default function Alerts() {
  const { showAlert, alertMsg } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (showAlert === true) {
      setTimeout(() => {
        dispatch(setShowAlert(false));
      }, 2000);
    }
  }, [showAlert]);

  return (
    <div
      className={`z-50 absolute bg-[#0caa49] w-60 flex  text-white justify-between py-2 px-3 text-sm rounded-md left-1/2 -translate-x-1/2 transition-[top] ${
        showAlert ? "top-2" : "-top-10"
      }`}
    >
      <p>{alertMsg}</p>
      <BiCheck className="text-xl" />
    </div>
  );
}
