// lib/axiosConfig.js
import axios from 'axios';
import Cookies from 'js-cookie';
//-import  store  from '../reducers/store'
//-import { destroySessionState } from 'reducers/sessionSlice';

const AxiosInterceptor = () => {
  const instance = axios.create();

//   const getUrl = (sistema, url) => {
//     const apis = Object.keys(process.env.APIS);
//     if (!apis.includes(sistema)) {
//       return 'El_sistema_no_esta_en_APIS_de_nuxtconfig';
//     }
//     let baseUrl = process.env.APIS[sistema];
//     if (!baseUrl.endsWith('/')) {
//       baseUrl = `${baseUrl}/`;
//     }
//     if (url.startsWith('/')) {
//       url = url.substring(1);
//     }
//     return baseUrl + url;
//   };
 
  const _http = (sistema, method, url, data) => {
    const _url = sistema;
    let setting = {
      method,
      url: _url,
      uri: url,
    };
    if (data) {
      if ((typeof data === 'object' && Object.keys(data).length) || (typeof data === 'object' && data.constructor.name === 'FormData')) {
        setting.data = data;
      }
    }

    return instance(setting)
      .then(response => {
        let data = null;
        if (response.data.paginacion) {
          data = { datos: response.data.datos, paginacion: response.data.paginacion };
        } else {
          data = response.data.datos || response.data;
        }
        return Promise.resolve(data);
      })
      .catch(error=>console.log(error));
    /*.catch(error => {
      if (error.response) {
        let data = error.response.data
        return Promise.reject(data)
      }
    })*/
  };

  instance.interceptors.request.use(
    function (config) {
      const token = Cookies.get('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  const get = (sistema, url, data) => _http(sistema, 'get', url, data);

  const post = (sistema, url, data) => _http(sistema, 'post', url, data);

  const put = (sistema, url, data) => _http(sistema, 'put', url, data);

  const del = (sistema, url, data) => _http(sistema, 'delete', url, data);

  const patch = (sistema, url, data) => _http(sistema, 'patch', url, data);

  return {
    instance,
    _http,
    get,
    post,
    put,
    del,
    patch,
  };
};

export const services = AxiosInterceptor();
