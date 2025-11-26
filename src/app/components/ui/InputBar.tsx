import { SendHorizonal } from "lucide-react";
const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    alert("Submitted    ")
}
const InputBar = () => {
  return (
    <div className="w-full h-full flex items-center">
      <form className="relative w-full" onSubmit={onSubmitHandler}>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
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
            <SendHorizonal size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export { InputBar };
