import { apiEndPoint } from "../../config.json";
import http from "./httpService";
export function register(user) {
  const data = {
    email: user.email,
    name: user.name,
  };
  return http.post(`${apiEndPoint}/user/signup`, data);
}
