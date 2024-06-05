import { useEffect, useState } from 'react';
import { findAllMascotasPaginacion } from '../services/mascotas.service';
export function useMascotas() {
  // ----------- CONSTANTS
  const [mascotas, setMascotas] = useState([]);
  const [loadingMascotas, setLoadingMascotas] = useState(false);
  const [errorMascotas, setErrorMascotas] = useState({});

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
 
  // ----------- RETURN
  return {
    mascotas,
    loadingMascotas,
    errorMascotas,
    fetchFindAllMascotas
  };
}
