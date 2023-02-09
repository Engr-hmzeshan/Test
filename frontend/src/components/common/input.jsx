import React from "react";

function Input({
  type = "text",
  autoFocus,
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
}) {
  return (
    <div className="mb-3 row">
      <label htmlFor={name} className="col-sm-2 col-form-label">
        {label}
      </label>
      <div className="col-sm-10">
        <input
          type={type}
          autoFocus={autoFocus ? true : false}
          className={`${error ? "form-control is-invalid" : "form-control"}`}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <div className="invalid-feedback">{error}</div>
      </div>
    </div>
  );
}

export default Input;
