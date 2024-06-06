import { useEffect, useState } from 'react';
import { findAllClasificacion, findAllMascotasPaginacion } from '../services/mascotas.service';
export function useMascotas() {
  // ----------- CONSTANTS
  const [mascotas, setMascotas] = useState([]);
  const [loadingMascotas, setLoadingMascotas] = useState(false);
  const [errorMascotas, setErrorMascotas] = useState({});

  const [clasificacion, setClasificacion] = useState([]);
  const [loadingClasificacion, setLoadingClasificacion] = useState(false);
  const [errorClasificacion, setErrorClasificacion] = useState({});

  // ----------- FIND ALL
  async function fetchFindAllMascotas(params) {
    setLoadingMascotas(true);
    return await findAllMascotasPaginacion(params)
      .then(response => {
        setMascotas(response);
        return response;
      })
      .catch(error => {
        setMascotas([]);
        setErrorMascotas(error);
      })
      .finally(() => {
        setLoadingMascotas(false);
      });
  }

   // ----------- FIND ALL CLASIFICACION
   async function fetchFindAllMascotasClasificacion(params) {
    setLoadingClasificacion(true);
    return await findAllClasificacion(params)
      .then(response => {
        setClasificacion(response);
        return response;
      })
      .catch(error => {
        setClasificacion([]);
        setErrorClasificacion(error);
      })
      .finally(() => {
        setLoadingClasificacion(false);
      });
  }
 
  // ----------- RETURN
  return {
    mascotas,
    clasificacion,
    loadingMascotas,
    loadingClasificacion,
    errorMascotas,
    fetchFindAllMascotas,
    fetchFindAllMascotasClasificacion,
  };
}
