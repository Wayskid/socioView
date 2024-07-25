import { BiX } from "react-icons/bi";
import { setImageToShow, setShowImage } from "../../store/features/appSlice";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";

export default function ImageModal() {
  const dispatch = useAppDispatch();
  const { imageToShow } = useAppSelector((state) => state.app);

  

  return (
    <div className="fixed w-full h-full top-0 left-0 bg-[#121212fb] z-50 grid ">
      <div className="grid justify-items-center items-center">
        <img
          src={imageToShow.toString()}
          alt="profile"
          className="w-[95%] max-h-[630px] md:max-h-[750px] object-contain"
        />
        <button className="justify-self-end absolute top-1 right-1 p-1 bg-white rounded-full">
          <BiX
            className="text-3xl"
            onClick={() => {
              dispatch(setImageToShow(""));
              dispatch(setShowImage());
            }}
          />
        </button>
      </div>
    </div>
  );
}
