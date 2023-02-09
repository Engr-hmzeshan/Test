import { Link } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import auth from "../services/authService";
import Input from "./common/input";
import Joi from "joi";
function Login() {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  // Handlers
  // Form Validation before submit
  const validate = () => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 1, tlds: { allow: ["com"] } })
        .required()
        .label("Email"),
      password: Joi.string().required().label("Password"),
    });

    const options = { abortEarly: false };
    const { error } = schema.validate(user, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  const doSubmit = async () => {
    // Call the server
    try {
      // After register the user redirect to main page and loged in successfully
      await auth.login(email, password);
      toast.success("Your are successfully logged in");

      // When user register it automatically login and page reload fro re-rendering.
      setTimeout(() => {
        window.location = "/vehicles";
      }, 2000);
    } catch (ex) {
      const error = { ...errors };
      if (ex.response && ex.response.status === 400) {
        error.email = ex.response.data;
        setErrors(error);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();

    setErrors(errors || {});

    if (errors) return;

    doSubmit();
  };
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema =
      name === "email"
        ? Joi.object({
            [name]: Joi.string()
              .email({ minDomainSegments: 1, tlds: { allow: ["com"] } })
              .required()
              .label("Email"),
          })
        : Joi.object({ [name]: Joi.string().required().label("Password") });

    const { error } = schema.validate(obj);

    return error ? error.details[0].message : null;
  };

  // Input handler
  const handleChange = ({ currentTarget: input }) => {
    const error = { ...errors };

    // Validate each input field
    const errorMessage = validateProperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];

    const userData = { ...user };
    userData[input.name] = input.value;

    // Update data
    setUser(userData);
    setErrors(error);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container position-relative  shadow-lg p-4 mt-5 w-50 ">
          <h3 className=" text-start">Login</h3>
          <hr />
          <Input
            label="Email"
            name="email"
            onChange={handleChange}
            placeholder="Your email i.e john@example.com"
            value={email}
            error={errors && errors.email}
            type="email"
            autoFocus
          />
          <Input
            label="Password"
            name="password"
            onChange={handleChange}
            placeholder="Your password..."
            value={password}
            error={errors && errors.password}
          />
          <div className="mb-3 row">
            <button className="btn btn-outline-success">Login</button>
          </div>
          <div className="position-absolute bottom-0 end-0">
            <Link className="align-end text-muted" to="/register">
              New User ?
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
