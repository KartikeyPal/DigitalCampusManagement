import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({ 
  placeholder, 
  value, 
  type, 
  onChange, 
  visible, 
  hidePassword, 
  passwordToggleButton, 
  required, 
  containerClassName, 
  className, 
  labelClassName,
  ...props // This captures autoComplete, name, and any other standard attributes
}) => {
  return (
    <div className={`relative min-w-[200px] w-[75%] group ${containerClassName || ''}`}>
      <input
        {...props} // Spreads autoComplete, name, etc. onto the element
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        id={placeholder} // Added id to match label's htmlFor
        className={`m-2 peer w-full bg-transparent placeholder:text-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease hover:outline-none hover:border-slate-300 shadow-sm hover:shadow ${className || ''}`}
      />
      <label 
        htmlFor={placeholder}
        className={`absolute pt-2 cursor-text bg-slate-50 px-1 left-2.5 text-slate-400 text-sm transition-all transform origin-left
        ${value.length === 0 
          ? "top-2.5 peer-placeholder-shown:top-2.5 peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90" 
          : "-top-2 left-2.5 text-xs text-slate-400 scale-90"}
        group-hover:-top-2 group-hover:left-2.5 group-hover:text-xs group-hover:text-slate-400 group-hover:scale-90 ${labelClassName || ''}`}
      >
        {placeholder}
      </label>

      {passwordToggleButton && (
        <button
          type="button"
          onClick={visible}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {hidePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      )}
    </div>
  )
}

export default Input;