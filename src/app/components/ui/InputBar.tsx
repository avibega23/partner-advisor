"use client"
import { useState } from "react";

interface inputBarProps {
  inputHandler:(text:string)=>void;
}
const InputBar = ({inputHandler}:inputBarProps) => {
  const [text,setText] = useState<string>("")
  const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>)=>{
    console.log("text")
    e.preventDefault();
    inputHandler(text)
    setText("");
    
}
  return (
    <div className="w-full h-full flex items-center">
      <form className="relative w-full" onSubmit={onSubmitHandler}>
        <div className="relative flex items-center">
          <input  
            type="text"
            value={text}
            placeholder="Type your message..."
            onChange={(e)=> setText(e.target.value)}
            className="
              w-full
              p-4 pr-14
              rounded-xl
              bg-slate-800
              text-white
              outline-none
              focus:ring-2 focus:ring-slate-600
              placeholder-slate-400
              transition
            "
          />

          <button
            type="submit"
            className="
              absolute right-2
              p-3
              bg-slate-700
              hover:bg-slate-600
              active:scale-95
              rounded-lg
              transition
            "
          >
          </button>
        </div>
      </form>
    </div>
  );
};

export { InputBar };
