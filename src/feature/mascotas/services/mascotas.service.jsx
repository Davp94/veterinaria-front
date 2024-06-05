import { services } from "../../../services/service.config";

export const findAllMascotasPaginacion = (dataObject) => {
    return services.get(`http://localhost:8200/rol?page=${dataObject.page}&size=${dataObject.size}&sortParam=${dataObject.sortParam}&order=${dataObject.order}&nombre=${dataObject.nombre}`)
}

export const findAllClasificacion = () => {
    return services.get(`http://localhost:8200/`)
}