import { Dispatch } from "react";

export default function Overlay({
  setIsMenuShown,
  isMenuShown,
}: {
  setIsMenuShown: Dispatch<React.SetStateAction<boolean>>;
  isMenuShown: Boolean;
}) {
  return (
    <div
      className={`h-full w-full fixed bg-[#12121296] z-50 translate-x-[70%] ${
        isMenuShown ? "block" : "hidden"
      }`}
      onClick={() => isMenuShown && setIsMenuShown(!isMenuShown)}
    ></div>
  );
}
