import "../../styles/loader.scss";

export default function Loader() {
  return (
    <div className="loader border-none justify-self-center my-2">
      <div className="loaderWrapper flex justify-center justify-self-center gap-2">
        <div
          className={`firstSquare animate-[bounce1_1s_infinite] w-2 h-2 origin-center bg-[#0caa41]`}
        ></div>
        <div
          className={`secondSquare animate-[bounce1_1s_infinite] w-2 h-2 origin-center bg-[#0caa41]`}
        ></div>
        <div
          className={`thirdSquare animate-[bounce1_1s_infinite] w-2 h-2 origin-center bg-[#0caa41]`}
        ></div>
      </div>
    </div>
  );
}
