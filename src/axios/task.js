import { Axios } from "./axios";

// forgot password
export const addTask = async (data) => {
  return Axios.post("/create", data);
};

export const getAllTask = async (...data) => {
  return Axios.get("/getTask", data);
};

// create new password
export const updateTask = async (id) => {
  return Axios.put(`/update/${id}`);
};

// create new password
export const deleteTask = async (id) => {
  return Axios.delete(`/delete/${id}`);
};
