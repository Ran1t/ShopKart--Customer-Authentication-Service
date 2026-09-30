import axios from "axios"

export const axiosInstance=axios.create({
    baseURL:`${window.location.protocol}//${window.location.hostname}:8000/`,
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:true
})