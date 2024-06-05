import { services } from "../../../services/service.config"


export const findAllRoles = () => {
    return services.get("http://localhost:8200/rol")
}

export const findAllRolById = rolId => {
  return services.get(`http://localhost:8200/rol/${rolId}`);
};

export const createRol = rolData => {
  return services.post(`http://localhost:8200/rol`, rolData);
};

export const updateRol = (rolData, rolId) => {
  return services.put(`http://localhost:8200/rol/${rolId}`, rolData);
};

export const deleteRol = rolId => {
  return services.del(`http://localhost:8200/rol/${rolId}`);
};

export const reporteRoles = () => {
  return services.getFile(`http://localhost:8200/pdf`);
};