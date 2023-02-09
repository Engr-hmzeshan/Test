import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Joi from "joi";
import Input from "./common/input";
import Select from "./common/select";
import {
  getAllVehicles,
  vehicleAdded,
  vehicleDeleted,
} from "../services/vehicleService";
const Vehicles = () => {
  // Hooks
  const [vehicles, setVehicles] = useState([]);
  const [errors, setErrors] = useState({});
  const [vehicle, setVehicle] = useState({
    registrationNo: "",
    category: "",
    color: "",
    model: "",
    make: "",
  });
  const { registrationNo, category, color, model, make } = vehicle;
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // Handlers
  async function fetchData() {
    const { success, vehicles: data } = await getAllVehicles();
    if (success) {
      setVehicles(data);
    }
  }
  // Handlers
  // Validate Form before submitting
  const validate = () => {
    const schema = Joi.object({
      category: Joi.string().required(),
      color: Joi.string().required(),
      model: Joi.string().required(),
      make: Joi.string().required(),
      registrationNo: Joi.string().required(),
    });

    const options = { abortEarly: false };
    const { error } = schema.validate(vehicle, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  // Submit the form
  const registerVehicle = async () => {
    // Vehicle added
    try {
      const { success, message, vehicle: data } = await vehicleAdded(vehicle);
      if (success) {
        const newData = [data, ...vehicles];
        setVehicles(newData);
        toast.success(message);
      }
    } catch (error) {
      toast.error(error.response.data.errMessage);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();

    setErrors(errors || {});

    if (errors) return;

    registerVehicle();
  };

  // Validate input field
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({
      [name]: Joi.string().required(),
    });
    const { error } = schema.validate(obj);

    return error ? error.details[0].message : null;
  };
  // Handle Multiple Inputs
  const handleChange = ({ currentTarget: input }) => {
    const error = { ...errors };
    // Validate each input field
    const errorMessage = validateProperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];
    const vehicleData = { ...vehicle };
    vehicleData[input.name] = input.value;

    // Update data
    setVehicle(vehicleData);
    setErrors(error);
  };
  const handleDelete = async (id) => {
    const { success, message } = await vehicleDeleted(id);
    if (success) {
      toast.info(message);
    }
  };
  return (
    <>
      <div className="container my-5">
        <div className="card border-warning">
          <div className="card-header ">Register New Vehicle</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <Select
                    label="Category"
                    name="category"
                    onChange={handleChange}
                    value={category}
                    options={vehicles}
                    error={errors && errors.category}
                  />
                </div>
                <div className="col-6">
                  <Input
                    label="Color"
                    name="color"
                    onChange={handleChange}
                    placeholder="Type your color here"
                    value={color}
                    error={errors && errors.color}
                    autoFocus
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Input
                    label="Model"
                    name="model"
                    onChange={handleChange}
                    placeholder="Type your model here"
                    value={model}
                    error={errors && errors.model}
                  />
                </div>
                <div className="col-6">
                  <Input
                    label="Make"
                    name="make"
                    onChange={handleChange}
                    placeholder="Type your make here"
                    value={make}
                    error={errors && errors.make}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Input
                    label="Reg.Num"
                    name="registrationNo"
                    onChange={handleChange}
                    placeholder="Your registrationNo..."
                    value={registrationNo}
                    error={errors && errors.registrationNo}
                  />
                </div>
                <div className="col-6">
                  <button type="submit" className="my-2 btn btn-primary">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <hr />

        <div className="card">
          <div className="card-header">
            <h1 className="text-center">Registered List of Vehicles</h1>
          </div>
          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Registration No.</th>
                  <th scope="col">Model</th>
                  <th scope="col">Category</th>
                  <th scope="col">Color</th>
                  <th scope="col">Make</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {vehicles &&
                  vehicles.map((veh) => {
                    return (
                      <tr key={veh._id}>
                        <td>{veh.registrationNo}</td>
                        <td>{veh.model}</td>
                        <td>{veh.category}</td>
                        <td>{veh.color}</td>
                        <td>{veh.make}</td>
                        <td>
                          <Link
                            to={`/vehicle/${veh._id}`}
                            className="btn btn-warning btn-sm"
                          >
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(veh._id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vehicles;
