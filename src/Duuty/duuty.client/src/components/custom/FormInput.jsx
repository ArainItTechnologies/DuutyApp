const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  autoComplete,
  placeholder,
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
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px]"
        />
      </div>
    </div>
  );
};

export default FormInput;
