export default function WebsitePreloader() {
  return (
    <div className="grid place-items-center content-center gap-[0.2rem] bg-slate-800">
      <div className="grid animate-[bubbleTop_0.5s_linear]">
        <div className="h-9 w-20 bg-[#0caa49] grid gap-1 place-content-center border-[1px] border-transparent rounded-[0.25rem] relative ">
          <div className="w-14 h-[0.15rem] bg-slate-900 rounded-lg animate-pulse"></div>
          <div className="w-12 h-[0.15rem] bg-slate-900 rounded-lg animate-pulse"></div>
          <div className="w-10 h-[0.15rem] bg-slate-900 rounded-lg animate-pulse"></div>
          <div className="absolute left-2 -bottom-3 border-[14px] border-[transparent_transparent_transparent_#0caa49] rounded-md z-50"></div>
        </div>
      </div>
      <div className="grid animate-[bubbleBottom_0.5s_linear]">
        <div className="h-9 w-20 bg-[#111827] grid gap-1 place-content-center border-[1px] border-[#0caa49] rounded-[0.25rem] relative">
          <div className="w-14 h-[0.15rem] bg-[#0caa49] rounded-lg animate-pulse"></div>
          <div className="w-12 h-[0.15rem] bg-[#0caa49] rounded-lg animate-pulse"></div>
          <div className="w-10 h-[0.15rem] bg-[#0caa49] rounded-lg animate-pulse"></div>
          <div className="absolute right-2 -top-3 border-[14px] border-[transparent_#111827_transparent_transparent] rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
