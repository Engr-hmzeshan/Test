import http from "./httpService";
import { apiEndPoint } from "../../config.json";

export async function getAllCategories() {
  const { data } = await http.get(`${apiEndPoint}/categories`);
  return data;
}
export async function getCategoryById(id) {
  const { data } = await http.get(`${apiEndPoint}/category/${id}`);
  return data;
}
export async function categoryUpdated(id, updates) {
  const { data } = await http.put(`${apiEndPoint}/category/${id}`, updates);
  return data;
}
export async function categoryDeleted(id) {
  const { data } = await http.delete(`${apiEndPoint}/category/${id}`);
  return data;
}
export async function categoryAdded(category) {
  const { data } = await http.post(`${apiEndPoint}/category/new`, category);
  return data;
}
