import axios from "axios";
import { URL_BASE } from "../Utils/globals";

// Default instace for axios with API path and timeout
const axiosInstance = axios.create({
  baseURL: URL_BASE,
  timeout: 10000,
});

export default {
  veterinaries: {
    //fetch: idUser => axiosInstance.get("/pets"),
    fetch: idUser => axiosInstance.get(`/veterinaries/${idUser}`),
  },
  veterinary: {
    fetch: idVet => axiosInstance.get(`/veterinary/${idVet}`),
  },
  doctorVet: {
    fetch: idVet => axiosInstance.get(`/users/vet/${idVet}`),
  },
  consultations: {
    fetch: idUser => axiosInstance.get(`/consultations/veterinary/${idUser}/statistics`),
  }
};
