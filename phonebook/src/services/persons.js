import axios from "axios";
const baseUrl = "/api/persons";

const createPerson = (personObj) => {
  const request = axios.post(baseUrl, personObj);
  return request.then((response) => response.data);
};

const getPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const personDelete = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
const personUpdate = (personObj) => {
  const request = axios.put(`${baseUrl}/${personObj.id}`, personObj);
  return request.then((response) => response.data);
};

const personServices = { createPerson, getPersons, personDelete, personUpdate };

export default personServices;
