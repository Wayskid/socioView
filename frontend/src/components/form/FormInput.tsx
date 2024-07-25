import React, { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../reduxHooks";

export default function FormInput({
  Icon,
  handleChange,
  id,
  type,
  name,
  placeholder,
  required,
  errMsg,
  value,
  pattern,
  theme,
}: {
  Icon: React.ReactNode;
  id?: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  errMsg?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  pattern?: string;
  theme: boolean;
}) {
  const [focused, setFocused] = useState(false);

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div className="grid">
      <label htmlFor="username" className="grid items-center gap-1 relative">
        <input
          id={id}
          type={type}
          name={name}
          className={`formInput w-full ${
            !theme && "bg-slate-700"
          } rounded-md border-[1px] border-transparent focus:border-[#0caa49] py-2 pr-3 pl-11 outline-none transition-all ${
            theme && darkMode ? "bg-[#292e33]" : "bg-slate-300"
          }`}
          placeholder={placeholder}
          required={required}
          onChange={handleChange}
          value={value}
          pattern={pattern}
          onBlur={() => setFocused(true)}
          data-input={focused.toString()}
        />
        <div
          className={`regDiv text-sm text-red-400 px-1 overflow-hidden ease-in-out`}
        >
          {errMsg && <p>{errMsg}</p>}
        </div>
        <div className="formIcon text-[1.2rem] absolute left-3 top-[0.7rem] grid items-center">
          {Icon}
        </div>
      </label>
    </div>
  );
}
