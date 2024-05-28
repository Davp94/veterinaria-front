import axios from "axios"

export const authLogin = (loginData) => {
    return axios.post(`http://localhost:8200/auth/login`, loginData)
}
