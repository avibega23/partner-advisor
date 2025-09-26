interface Question {
  inputTitle: string;
  inputType: boolean;
  option: string[];
}

interface InputProps {
  data: Question;
  value: string;
  onChange: (val: string) => void;
}

export default function Input({ data, value, onChange }: InputProps) {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">{data.inputTitle}</h2>

      {data.inputType ? (
        <input
          type="text"
          placeholder="Enter your answer"
          className="w-full border p-2 rounded"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      ) : (
        <div className="flex flex-col gap-2">
          {data.option.map((opt, i) => (
            <label key={i} className="flex items-center gap-2">
              <input
                type="radio"
                name={data.inputTitle}
                value={opt}
                checked={value == opt}
                onChange={() => onChange(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
