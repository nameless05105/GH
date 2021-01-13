import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const insertContainer = (payload) => api.post(`/container/container`, payload);
export const getAllContainers = (greenhouse) => api.get(`/container/containers/greenhouse/${greenhouse}`);
export const updateContainerById = (id, payload) => api.put(`/container/container/${id}`, payload);
export const deleteContainerById = (id) => api.delete(`/container/container/${id}`);
export const getContainerById = (id) => api.get(`/container/container/id/${id}`);

export const insertConfiguration = (payload) => api.post(`/configuration/configuration`, payload);
export const getConfigurations = (greenhouse) => api.get(`/configuration/configurations/greenhouse/${greenhouse}`);
export const updateConfigurationById = (id, payload) => api.put(`/configuration/configuration/${id}`, payload);
export const deleteConfigurationById = (id) => api.delete(`/configuration/configuration/${id}`);
export const getConfigurationById = (id) => api.get(`/configuration/configuration/id/${id}`);

export const insertTechnology = (payload) => api.post(`/technology/technology`, payload);
export const getTechnologies = (greenhouse) => api.get(`/technology/alltechnology/greenhouse/${greenhouse}`);
export const updateTechnologyById = (id, payload) => api.put(`/technology/technology/${id}`, payload);
export const deleteTechnologyById = (id) => api.delete(`/technology/technology/${id}`);
export const getTechnologyById = (id) => api.get(`/technology/technology/id/${id}`);
export const getTechnologyByContainerId = (id) => api.get(`/technology/technology/container/${id}`);

export const getGreenhouses = () => api.get(`/greenhouse/greenhouses`);

export const getUsers = () => api.get(`/users/users/`);
export const getModules = () => api.get(`/module/modules/`);

const apis = {
  insertContainer,
  getAllContainers,
  updateContainerById,
  deleteContainerById,
  getContainerById,

  getUsers,

  getConfigurations,
  insertConfiguration,
  updateConfigurationById,
  deleteConfigurationById,
  getConfigurationById,

  insertTechnology,
  getTechnologies,
  updateTechnologyById,
  deleteTechnologyById,
  getTechnologyById,
  getTechnologyByContainerId,
  
  getGreenhouses,
  getModules
};

export default apis