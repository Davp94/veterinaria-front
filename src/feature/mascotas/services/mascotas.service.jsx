import { services } from "../../../services/service.config";

export const findAllMascotasPaginacion = async (dataObject) => {
    return await services.get(`http://localhost:8200/mascotas?page=${dataObject?.page}&size=${dataObject?.size}&sortParam=${dataObject?.sortParam}&order=${dataObject?.order}&nombre=${dataObject?.nombre? dataObject.nombre : ''}`)
}

export const findAllClasificacion = async () => {
    return await services.get(`http://localhost:8200/mascotas/clasificacion`)
}