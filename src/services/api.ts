import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
