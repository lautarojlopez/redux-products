import axios from "axios"

//Axios with API url setted
const axiosClient = axios.create({
    baseURL: 'http://localhost:3001/'
})

export default axiosClient