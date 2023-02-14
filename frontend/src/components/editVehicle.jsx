import React, { useEffect, useState } from "react";
import { getVehicleById, vehicleUpdated } from "../services/vehicleService";
import { getAllCategories } from "../services/categoryService";
import { useParams } from "react-router-dom";
import Joi from "joi";
import { toast } from "react-toastify";
const EditVehicle = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [vehicle, setVehicle] = useState({});
  useEffect(() => {
    getSingleVehicle();
    getAllCategory();
  }, [id]);

  async function getSingleVehicle() {
    const { success, vehicle } = await getVehicleById(id);
    delete vehicle.__v;
    delete vehicle._id;
    if (success) {
      console.log(vehicle);
      setVehicle(vehicle);
    }
  }
  async function getAllCategory() {
    const { categories, success } = await getAllCategories();
    if (success) {
      setCategories(categories);
    }
  }
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

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(id, vehicle);
    try {
      const { success, message } = await vehicleUpdated(id, vehicle);
      console.log(success);
      if (success) {
        toast.success(message);
        setTimeout(() => {
          window.location = "/vehicles";
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.errMessage);
    }
  };
  return (
    <>
      <div className="w-75 my-5 container">
        <div className="card">
          <h5 className="card-header">Edit Vehicle Data</h5>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <select
                  name="category"
                  onChange={handleChange}
                  className="form-select"
                  id="inputGroupSelect02"
                >
                  {categories &&
                    categories.map((cat) => {
                      return (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      );
                    })}
                </select>
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect02"
                >
                  Category
                </label>
              </div>

              <div className="mb-3 row">
                <label htmlFor="model" className="col-sm-2 col-form-label">
                  Model
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="model"
                    value={vehicle && vehicle.model}
                    onChange={handleChange}
                    className="form-control"
                    id="model"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="make" className="col-sm-2 col-form-label">
                  Make
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="make"
                    onChange={handleChange}
                    value={vehicle && vehicle.make}
                    className="form-control"
                    id="make"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="color" className="col-sm-2 col-form-label">
                  Color
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="color"
                    onChange={handleChange}
                    value={vehicle && vehicle.color}
                    className="form-control"
                    id="color"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="registrationNo"
                  className="col-sm-2 col-form-label"
                >
                  Registration No
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={vehicle && vehicle.registrationNo}
                    id="registrationNo"
                    name="registrationNo"
                  />
                </div>
                <div className="mt-3 text-center">
                  <button className="btn btn-lg btn-outline-primary">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditVehicle;
