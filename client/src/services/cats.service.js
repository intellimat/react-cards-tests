import axios from "axios";

export const fetchCats = async () => {
  const response = await axios.get("http://localhost:4000/cats");
  return response.data;
};
