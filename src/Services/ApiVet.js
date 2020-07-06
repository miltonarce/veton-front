import axios from "axios";
import { URL_BASE } from "../Utils/globals";

// Default instace for axios with API path and timeout
const axiosInstance = axios.create({
  baseURL: URL_BASE,
  timeout: 10000,
});

export default {
  clinicalhistories: {
    edit: (idHistory, request) =>
      axiosInstance.put(`/clinicalhistories/${idHistory}`, request),
  },
  clinicalhistory: {
    fetch: idHistory => axiosInstance.get(`/clinicalhistory/${idHistory}`),
  },
  consultations: {
    create: (idHistory, request) =>
      axiosInstance.post(`/consultations/${idHistory}`, request),
    edit: (idConsultation, request) =>
      axiosInstance.put(`/consultations/${idConsultation}`, request),
  },
  consultation: {
    fetch: idConsultation =>
      axiosInstance.get(`/consultation/${idConsultation}`),
  },
  users: {
    fetch: id => axiosInstance.get(`/users/${id}`),
    autocomplete: input => axiosInstance.get(`/users/search/${input}`),
  },
  userPets: {
    fetch: id => axiosInstance.get(`/pets/users/${id}`),
  },
  veterinaries: {
    fetch: () => axiosInstance.get("/veterinaries"),
    createDoc: data => {
      // Formdata to send image input... form-url-encoded...
      const form_data = new FormData();
      /* eslint no-unused-vars: 0 */
      for (const key in data) {
        form_data.append(key, data[key]);
      }
      return axiosInstance.post("/doc", form_data);
    },
    createVet: data => {
      // Formdata to send image input... form-url-encoded...
      const form_data = new FormData();
      /* eslint no-unused-vars: 0 */
      for (const key in data) {
        form_data.append(key, data[key]);
      }
      return axiosInstance.post("/vet", form_data);
    },
  },
  vaccines: {
    fetch: () => axiosInstance.get("/vaccines"),
  },
  dewormers: {
    fetch: () => axiosInstance.get("/dewormers"),
  }
};
