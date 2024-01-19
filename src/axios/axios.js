import axios from "axios";
import { api } from "../utils/api";

export const Axios = axios.create({
  baseURL: api,
});
