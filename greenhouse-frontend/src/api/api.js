import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://smart-glow.ru/api',
  baseURL: 'http://localhost:5000/api',
  // baseURL: 'http://31.31.202.109:5000/api',
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
export const insertGreenhouse = (payload) => api.post(`/greenhouse/greenhouse`, payload);

export const getUsers = () => api.get(`/users/users/`);
export const getModules = () => api.get(`/module/modules/`);

export const getOneDayDataModules = () => api.get(`/one/onedaydatamodules/`);

export const updateParameter = (payload) => api.post(`/parameters/parameter`, payload);

export const insertReport = (payload) => api.post(`/report/report`, payload);
export const getAllReports = () => api.get(`/report/report/`);
export const getReportById = (id) => api.get(`/report/report/id/${id}`);
export const deleteReportById = (id) => api.delete(`/report/report/${id}`);

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
  insertGreenhouse,
  getModules,
  getOneDayDataModules,
  
  updateParameter,

  insertReport,
  getAllReports,
  getReportById,
  deleteReportById
};

export default apis