import axios from "axios";

axios.defaults.baseURL = "https://internetview.online";

axios.interceptors.request.use(function(config) {
  let token = localStorage.getItem("token");
  if (token != null){
    config.headers.Authorization = "Bearer " + JSON.parse(token);
  }
  return config;
}, function(error) {
  return Promise.reject(error);
});

export default axios;
