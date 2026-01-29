import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8083/api",
});

api.interceptors.request.use(config=>{
    const token = localStorage.getItem("token");
    // console.log("Interceptor found token:", !!token); 
    // console.log("Full Header:", `Bearer ${token}`);
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

// api.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );


export default api