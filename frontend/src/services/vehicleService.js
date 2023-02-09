import http from "./httpService";
import { apiEndPoint } from "../../config.json";

export async function getAllVehicles() {
  const { data } = await http.get(`${apiEndPoint}/vehicles`);
  return data;
}
export async function getVehicleById(id) {
  const { data } = await http.get(`${apiEndPoint}/vehicle/${id}`);
  return data;
}
export async function vehicleUpdated(id, updates) {
  const { data } = await http.put(`${apiEndPoint}/vehicle/${id}`, updates);
  return data;
}
export async function vehicleDeleted(id) {
  const { data } = await http.delete(`${apiEndPoint}/vehicle/${id}`);
  return data;
}
export async function vehicleAdded(vehicle) {
  console.log(vehicle);
  const { data } = await http.post(`${apiEndPoint}/vehicle/new`, vehicle);
  return data;
}
