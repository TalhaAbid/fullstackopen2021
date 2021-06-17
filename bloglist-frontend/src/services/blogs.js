import axios from "axios";
const baseUrl = "/api/blogs";
let token;

const setToken = (tokenVal) => {
  token = `bearer ${tokenVal}`;
};

const addBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

let blogService = { getAll, addBlog, setToken };
export default blogService;
