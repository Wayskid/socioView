import BtnLoader from "./BtnLoader";

export default function AppButton({
  handleClick,
  label,
  isLoading,
  isDisabled,
  width,
  height,
  regular,
}: {
  handleClick?: () => void;
  label: String;
  isLoading?: boolean;
  isDisabled?: boolean;
  width?: String;
  height?: String;
  regular?: boolean;
}) {
  return (
    <button
      onClick={handleClick}
      className={
        regular
          ? "text-[#0caa49]"
          : `text-white bg-[#0caa41] text-sm ${width} h-${height} rounded-md transition disabled:opacity-20 ${
              !isDisabled && "hover:bg-[#03d048]"
            }`
      }
      disabled={isDisabled}
    >
      {isLoading ? <BtnLoader /> : label}
    </button>
  );
}
