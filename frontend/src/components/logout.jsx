import React, { useEffect } from "react";
import auth from "../services/authService";
import { toast } from "react-toastify";
function Logout() {
  useEffect(() => {
    auth.logout();
    toast.success("You have successfully logout");
    setTimeout(() => {
      window.location = "/";
    }, 2000);
  });
  return null;
}

export default Logout;
