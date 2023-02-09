import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  getAllCategories,
  categoryAdded,
  getCategoryById,
  categoryUpdated,
  categoryDeleted,
} from "../services/categoryService";
import Joi from "joi";
import Input from "./common/input";

function Category() {
  // Hooks
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [errors, setErrors] = useState({});
  const schema = Joi.object({
    name: Joi.string().required().label("Name").min(3).max(255),
  });
  useEffect(() => {
    fetchData();
    if (id) {
      getSingleCategory(id);
    }
  }, [categoryAdded, getAllCategories, id, categoryUpdated, categoryDeleted]);
  // Handlers
  async function fetchData() {
    const { success, categories } = await getAllCategories();
    if (success) {
      setCategory(categories);
    }
  }
  async function getSingleCategory(id) {
    const { success, category } = await getCategoryById(id);
    if (success) {
      setName(category.name);
    }
  }

  // Validate input field
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };

    const { error } = schema.validate(obj);

    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const error = { ...errors };
    // Validate each input field
    const errorMessage = validateProperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];
    // Update data
    setName(input.value);
    setErrors(error);
  };

  const validate = () => {
    const { error } = schema.validate({ name });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const addCategory = async () => {
    const obj = { name };
    // Check if category is changed then update the category
    if (id) {
      const {
        success,
        message,
        category: data,
      } = await categoryUpdated(id, obj);
      if (success) {
        const newData = [...category];
        const index = newData.indexOf(data);
        newData[index] = { ...data };
        setCategory(newData);
        toast.success(message);
        setTimeout(() => {
          setName("");
          window.location.href = "/categories";
        }, 2000);
      }
    }
    // Category added
    const { success, message, category: data } = await categoryAdded(obj);
    const newData = [data, ...category];
    setCategory(newData);
    setName("");
  };
  const handleDelete = async (id) => {
    const { success, message, category: data } = await categoryDeleted(id);
    if (success) {
      const categoryCopy = [...category];
      categoryCopy.filter((c) => c._id !== data._id);
      setCategory(categoryCopy);
      toast.success(message);
      setTimeout(() => {
        window.location.href = "/categories";
      }, 2000);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();

    setErrors(errors || {});

    if (errors) return;

    addCategory();
  };

  return (
    <>
      <div className="container my-5">
        <div className="card">
          <div className="card-header">
            <Link to="/categories" className="text-muted">
              Add New Category
            </Link>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <Input
                label="Name:"
                name="name"
                onChange={handleChange}
                placeholder="Your name i.e John Doe"
                value={name}
                error={errors && errors.name}
                autoFocus
              />
              <button
                type="submit"
                className={`${
                  id ? "my-2 btn btn-warning" : "my-2 btn btn-primary"
                }`}
              >
                {id ? "Update" : "Add Category"}
              </button>
            </form>
          </div>
        </div>

        <hr />

        <div className="card">
          <div className="card-header">
            <h1 className="text-center">Categories</h1>
          </div>
          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Category ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {category &&
                  category.map((cat) => {
                    return (
                      <tr key={cat._id}>
                        <td>{cat._id.toString()}</td>
                        <td>{cat.name}</td>
                        <td>
                          <Link
                            // onClick={() => handleUpdate(cat._id)}
                            to={`/category/${cat._id}`}
                            className="btn btn-warning btn-sm"
                          >
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(cat._id)}
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
}

export default Category;
