import { ChangeEvent, useEffect, useRef } from "react";
import { useAppSelector } from "../../reduxHooks";

export default function TextAreaInput({
  handleChange,
  name,
  placeholder,
  required,
  value,
  readOnly, 
}: {
  name?: string;
  placeholder?: string;
  required?: boolean;
  handleChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  readOnly?: boolean;
}) {
  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  //Auto size textarea
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [value, textAreaRef]);

  return (
    <div className="w-[calc(100%-2.5rem)] grid">
      <textarea
        name={name}
        ref={textAreaRef}
        rows={1}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={handleChange}
        className={`w-full outline-none py-[0.5rem] px-3 rounded-md focus:placeholder:text-transparent ${
          darkMode ? "bg-[#292e33]" : "bg-slate-200"
        }`}
        readOnly={readOnly}
      ></textarea>
    </div>
  );
}
