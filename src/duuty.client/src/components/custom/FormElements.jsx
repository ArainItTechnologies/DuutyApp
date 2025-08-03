import { Link, useLocation } from "react-router-dom";


export const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  readonly = false,
  required = false,
  autoComplete,
  placeholder,
  errors,
  errorMessage
}) => {
  return (
    <div className="mt-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm/6 font-medium text-[--secondary-text-color]"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          readOnly={readonly}
          placeholder={placeholder}
          className={`block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px] ${errors ? "border-red-500" : "border-gray-300"}`}
        />

        {errors && (
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export const FormTextArea = ({
  label,
  name,
  value,
  onChange,
  required = false,
  errors,
  rows = "2",
  placeholder,
  errorMessage
}) => {
  return (
    <div className="mt-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm/6 font-medium text-[--secondary-text-color]"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`block w-full rounded-xl bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px] ${errors ? "border-red-500" : "border-gray-300"}`}
          placeholder={placeholder}
          rows={rows}
        ></textarea>

        {errors && (
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        )}

      </div>
    </div>
  );
};

export const FormPasswordInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  forgotPassword = false,
  autoComplete,
  placeholder,
  errors,
  errorMessage
}) => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between">
        {label && (
          <label
            htmlFor={name}
            className="block text-sm/6 font-medium text-[--secondary-text-color]"
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}

        {forgotPassword && <div className="text-sm">
          <Link
            to="/forgot"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </Link>
        </div>}
      </div>
      <div>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px] ${errors ? "border-red-500" : "border-gray-300"}`}
        />

        {errors && (
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export const FormSelect = ({
  label,
  name,
  value,
  required = false,
  setValue,
  onMouseDown,
  options = [],
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm/6 font-medium text-[--secondary-text-color]"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="mt-2 select-wrapper relative">
        <select
        className="appearance-none cursor-pointer block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:pr-10 pr-8 sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px]"
          value={value || ""}
          onMouseDown={(e) => {
            if (onMouseDown) {
              e.preventDefault(); // Prevent native dropdown from opening
              onMouseDown();
            }
          }}
          onChange={(e) => setValue(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const PrimaryButton = ({
  type = "button",
  onClick,
  children,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`cursor-pointer flex w-full justify-center rounded-xl sm:h-[50px] h-[40px] bg-linear-(--gradient-bg) sm:p-3 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
        disabled 
          ? 'opacity-50 cursor-not-allowed hover:bg-gray-400' 
          : 'cursor-pointer hover:bg-primary-500'
      } ${className}`}
    >
      {children}
    </button>
  );
};


export const ScrollLink = ({ to, label, onClick }) => {
  const location = useLocation();

  const handleClick = (e) => {
    if (location.pathname === "/" && to.includes("#faq-section")) {
      e.preventDefault();
      document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" });
      onClick?.();
    }
  };

  return (
    <Link to={to} onClick={handleClick}>
      {label}
    </Link>
  );
};



