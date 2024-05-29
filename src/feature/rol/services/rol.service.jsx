import { services } from "./service.config"


export const findAllRoles = () => {
    return services.get("http://localhost:8200/rol")
}

// export const findAllRolById = rolId => {
//   return axios.get(`http://localhost:8200/rol/${rolId}`);
// };

// export const createRol = rolData => {
//   return axios.post(`http://localhost:8200/rol`, rolData);
// };

// export const updateRol = (rolData, rolId) => {
//   return axios.put(`http://localhost:8200/rol/${rolId}`, rolData);
// };

// export const deleteRol = rolId => {
//   return axios.delete(`http://localhost:8200/rol/${rolId}`);
// };