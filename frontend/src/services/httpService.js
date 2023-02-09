import axios from "axios";
import { toast } from "react-toastify";

// We only use interceptor for more generic unexpected(Response get invalid due to network) errors.
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Log The Error", error);
    toast.error("An unexpected error ocurred");
  }
  return Promise.reject(error);
});
export function setJwt(jwt) {
  return (axios.defaults.headers.common["x-auth-token"] = jwt);
}

export default {
  // create
  post: axios.post,
  // read
  get: axios.get,
  // update
  put: axios.put, //update entire object
  patch: axios.patch, // update one or more properties
  // delete
  delete: axios.delete,
  setJwt,
};
