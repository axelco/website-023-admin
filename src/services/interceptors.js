import {api} from '@/services/api.service'
import localStorageService from './localStorage.service';

const setup = (router) => {
  
    api.interceptors.request.use(
      (config) => {

          const token = localStorageService.getUserToken();
          config.headers['Authorization'] = `Bearer ${token}`               
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        if (err.response.status === 401 ) {
          localStorageService.destroyUserToken()
          router.push({name : "login"})
        }
        return Promise.reject(err);
      }
    );     
  };
  export default setup;