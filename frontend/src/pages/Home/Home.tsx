import LeftSidebar from "./Asides/LeftSidebar";
import HomeNavbar from "./HomeNavbar/HomeNavbar";
import RightSidebar from "./Asides/RightSidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import MobileMenu from "./Asides/MobileMenu";
import { useAppSelector } from "../../reduxHooks";
import Overlay from "../../components/ui/Overlay";

export default function Home() {
  //Mobile menu
  const [isMenuShown, setIsMenuShown] = useState(false);

  //Disable scroll
  const { showImage } = useAppSelector((state) => state.app);
  useEffect(() => {
    if (showImage === true || isMenuShown === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showImage, isMenuShown]);

  //Close menu on scroll
  useEffect(() => {
    if (isMenuShown === true && window.onscroll) {
      setIsMenuShown(false);
    }
  }, [window.onscroll, isMenuShown]);

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div className={`${darkMode ? "bg-black text-slate-200" : "bg-slate-300"}`}>
      {/*Mobile menu*/}
      <MobileMenu setIsMenuShown={setIsMenuShown} isMenuShown={isMenuShown} />

      <Overlay isMenuShown={isMenuShown} setIsMenuShown={setIsMenuShown} />

      {/*Home Main*/}
      <div
        className={`px mx-auto h-full transition-[transform] ${
          isMenuShown && "translate-x-[70%]"
        } grid justify-items-center`}
      >
        <HomeNavbar setMobileMenu={setIsMenuShown} mobileMenu={isMenuShown} />
        <div className="flex gap-4 mb-2 mt-16 md:mt-20 w-full justify-center px-3">
          <LeftSidebar />
          <div className="grid gap-5 h-full w-[min(37rem,100%)] rounded-md overflow-hidden">
            <Outlet />
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
