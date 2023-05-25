interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string;
  handleOnChance: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error: string;
}

export function Input({ label, name, value, handleOnChance, placeholder, error, ...rest }: InputProps) {
  return (
    <div>
      <div className={`input-group border border-slate-300 text-slate-400 rounded-sm flex flex-col px-2 py-2 focus-within:border-violet-400 focus-within:text-violet-400 ${error && "text-red-500 border-red-500"}`}>
        <label className="cursor-pointer" htmlFor={name}>{label}</label>
        <input {...rest} className="focus:outline-none text-black" type="text" name={name} id={name} value={value} onChange={handleOnChance} placeholder={placeholder} />
      </div>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
}
