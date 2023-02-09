import http from "./httpService";
import jwt_decode from "jwt-decode";
import { apiEndPoint } from "../../config.json";
const tokenKey = "token";
// Over-come bi-directional dependencies
http.setJwt(getJwt());
export async function login(email, password) {
  const { data: jwt } = await http.post(`${apiEndPoint}/user/login`, {
    email,
    password,
  });
  return localStorage.setItem(tokenKey, jwt);
}
export function loginWithJwt(jwt) {
  return localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getCurrentUser() {
  try {
    // We refactoring the code caus app.js is not responsible for getting token from local storage
    const jwt = localStorage.getItem(tokenKey);
    return jwt_decode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
