import SocioViewNews from "./SocioViewNews";
import WhoToFollow from "./WhoToFollow";

export default function RightSidebar() {
  return (
    <div className="w-72 hidden lg:grid content-start shrink-0 rounded-md">
      <SocioViewNews />
      <WhoToFollow />
    </div>
  );
}
