import { Link, useLocation } from "react-router-dom";
import { ROUTES, ALL_ROLE_OPTIONS } from "../../Constants";
import { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Check } from "lucide-react";

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
            to={ROUTES.FORGOT_PASSWORD}
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
      <div className="select-wrapper relative">
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
      className={`cursor-pointer flex w-full justify-center rounded-xl sm:h-[50px] h-[40px] bg-linear-(--gradient-bg) sm:p-3 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${disabled
        ? 'opacity-50 cursor-not-allowed hover:bg-gray-400'
        : 'cursor-pointer hover:bg-primary-500'
        } ${className}`}
    >
      {children}
    </button>
  );
};

export const CustomButton = ({
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
      className={className}
    >
      {children}
    </button>
  );
};


export const ScrollLink = ({ to, label, onClick }) => {
  const location = useLocation();

  const handleClick = (e) => {
    if (location.pathname === ROUTES.HOME && to.includes("#faq-section")) {
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

export const RoleMultiSelect = ({ selectedRoles, onChange, label, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleRole = (roleId) => {
    const isSelected = selectedRoles.includes(roleId);
    if (isSelected) {
      onChange(selectedRoles.filter((id) => id !== roleId));
    } else {
      onChange([...selectedRoles, roleId]);
    }
  };

  const removeRole = (roleId) => {
    onChange(selectedRoles.filter((id) => id !== roleId));
  };

  const isSelected = (roleId) => selectedRoles.includes(roleId);

  const getSelectedRoleObjects = () => {
    return ALL_ROLE_OPTIONS.filter((role) => selectedRoles.includes(role.id));
  };

  return (
    <div className="mt-2">
      {label && (
        <label className="block text-sm/6 font-medium text-[--secondary-text-color]">
          {label}
        </label>
      )}

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px] flex items-center justify-between"
        >
          <span className="text-gray-900">
            {selectedRoles.length === 0
              ? placeholder || "Select roles..."
              : `${selectedRoles.length} role${selectedRoles.length > 1 ? "s" : ""} selected`}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
            {ALL_ROLE_OPTIONS.map((role) => (
              <div
                key={role.id}
                onClick={() => toggleRole(role.id)}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
              >
                <img
                  src={role.image}
                  alt={role.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <span className="flex-1 text-gray-800 font-medium text-sm">
                  {role.name}
                </span>
                {isSelected(role.id) && (
                  <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedRoles.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {getSelectedRoleObjects().map((role) => (
              <div
                key={role.id}
                className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 border border-gray-200"
              >
                <img
                  src={role.image}
                  alt={role.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm truncate">
                    {role.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => removeRole(role.id)}
                  className="p-1 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

