// Regular Imports
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { useState, useEffect } from "react";
import auth from "./services/authService";
// Component Import
import Header from "./components/header";
import Login from "./components/login";
import Logout from "./components/logout";
import Register from "./components/register";
import Category from "./components/categories";
import Vehicles from "./components/vehicles";
import EditVehicle from "./components/editVehicle";
// Css Imports
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const user = auth.getCurrentUser();
    setCurrentUser(user);
  }, []);

  return (
    <>
      <Header user={currentUser} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicle/:id" element={<EditVehicle />} />
      </Routes>
    </>
  );
}

export default App;
