import { services } from "./service.config";
export const adjuntosService = (image) => {
    console.log('🚀 ~ adjuntosService ~ image:', image);
    return services.post(`http://localhost:8200/adjuntos`, '',image)
}
