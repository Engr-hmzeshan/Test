import React from "react";

const Select = ({ name, label, options, error, onChange }) => {
  return (
    <div className="mb-3 row">
      <label htmlFor={name} className="col-sm-2 col-form-label">
        {label}
      </label>
      <div className="col-sm-10">
        <select
          name={name}
          id={name}
          onChange={onChange}
          className={`${error ? "form-control is-invalid" : "form-control"}`}
        >
          <option defaultValue="Please select the category..">
            Please select the category...
          </option>
          {options.map((option) => (
            <option key={option._id} value={option.category}>
              {option.category}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{error}</div>
      </div>
    </div>
  );
};

export default Select;
