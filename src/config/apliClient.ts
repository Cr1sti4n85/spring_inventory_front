import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";
import axios from "axios";
import ApiService from "../services/ApiService";

const options: CreateAxiosDefaults = {
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  httpsAgent: false,
};

//creation of new axios instance in order to avoid loops
const TokenRefreshClient: AxiosInstance = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response);

const API: AxiosInstance = axios.create(options);

API.interceptors.response.use(
  (response) => response, //in case of success we return response.data
  async (error: AxiosError) => {
    const { config, response } = error;
    if (!response) return Promise.reject(error);
    const { data, status } = response as AxiosResponse; //Error response from

    // api
    //try to refresh access token
    if (status === 401 && config && !config._retry) {
      config._retry = true;
      try {
        const result = await TokenRefreshClient.post("/auth/refresh");
        const newAccessToken = result.data.accessToken;
        await ApiService.saveToken(newAccessToken);
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${newAccessToken}`,
        } as AxiosRequestHeaders;
        return API(config);
      } catch (error) {
        console.log(error);
        window.location.href = "/login";
      }
    }

    return Promise.reject({ status, ...data });
  }
);

export default API;
