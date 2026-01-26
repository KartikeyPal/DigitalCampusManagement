import EyeCloseIcon from "../icons/EyeCloseIcon"
import EyeOpenIcon from "../icons/EyeOpenIcon"


const Input = ({placeholder,value,type,onChange,visible,hidePassword,passwordToggleButton,required}) => {
  return (
    <div className="relative min-w-[200px] w-[75%] group">
      <input 
            type={type} 
            value={value}
            onChange={onChange} 
            className={` m-2 peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease hover:outline-none hover:border-slate-300 shadow-sm hover:shadow ` }
            required={required}
        />
        <label htmlFor={placeholder}
        className={`absolute pt-2 cursor-text bg-slate-50 px-1 left-2.5  text-slate-400 text-sm transition-all transform origin-left
      ${value.length===0?"top-2.5 peer-hover:-top-2 peer-hover:left-2.5 peer-hover:text-xs peer-hover:text-slate-400 peer-hover:scale-90 focus:-top-2": `-top-2 left-2.5 text-xs text-slate-400 scale-90 `}
      group-hover:-top-2 group-hover:left-2.5 group-hover:text-xs group-hover:text-slate-400 group-hover:scale-90`}
        >{placeholder}</label>

        {passwordToggleButton && (
          <button
          type="button"
          onClick={visible}
          className="absolute right-4 bottom-1 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {hidePassword ? <EyeOpenIcon/> : <EyeCloseIcon/>}
          </button>
        )}
    </div>
  )
}

export default Input