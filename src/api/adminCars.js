import { API_URL } from "../constants";
import axios from "axios";

export const getCar = async (idCar) => {
  const endpoint = `/cars/${idCar}`;
  const response = await axios.get(`${API_URL}${endpoint}`);
  if (response) {
    return response;
  } else {
    console.log(response);
  }
};

export const addCar = async (newCar) => {
  const form = new FormData();
  form.append("carType", newCar.carType);
  form.append("doors", newCar.doors);
  form.append("seats", newCar.seats);
  form.append("bags", newCar.bags);
  form.append("price", newCar.price);
  form.append("image", newCar.image);
  if (newCar.file) {
    form.append("file", newCar.file);
  }
  const endpoint = "/cars/create";
  const response = await axios.post(`${API_URL}${endpoint}`, form);
  if (response) {
    return response;
  } else {
    console.log(response);
  }
};

export const deleteCar = async (idCar) => {
  const endpoint = `/cars/delete/${idCar}`;
  const response = await axios.delete(`${API_URL}${endpoint}`);
  if (response) {
    return response.data;
  } else {
    console.log(response);
  }
};

export const editCar = async (idCar, updatedCar) => {
  const form = new FormData();
  form.append("carType", updatedCar.carType);
  form.append("doors", updatedCar.doors);
  form.append("seats", updatedCar.seats);
  form.append("bags", updatedCar.bags);
  form.append("price", updatedCar.price);
  form.append("image", updatedCar.image);
  if (updatedCar.file) {
    form.append("file", updatedCar.file);
  }
  const endpoint = `/cars/update/${idCar}`;
  const response = await axios.put(`${API_URL}${endpoint}`, form);
  if (response) {
    return response.data;
  } else {
    console.log(response);
  }
};
