import "../../styles/loader.scss";

export default function BtnLoader() {
  return (
    <div className="loader border-none justify-self-center -translate-y-1">
      <div className="loaderWrapper flex justify-center justify-self-center gap-1">
        <div
          className={`firstSquare animate-[bounce1_1s_infinite] w-1 h-1 origin-center bg-slate-100`}
        ></div>
        <div
          className={`secondSquare animate-[bounce1_1s_infinite] w-1 h-1 origin-center bg-slate-100`}
        ></div>
        <div
          className={`thirdSquare animate-[bounce1_1s_infinite] w-1 h-1 origin-center bg-slate-100`}
        ></div>
      </div>
    </div>
  );
}
