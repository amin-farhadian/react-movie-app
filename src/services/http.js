import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE;

export const get = (url, config = {}) => {
  return axios.get(url, config);
};

export const post = (url, payload, config) => {
  return axios.post(url, payload, config);
};

export const del = (url, config = {}) => {
  return axios.delete(url, (config = {}));
};

export const put = (url, payload, config) => {
  return axios.post(url, payload, config);
};
