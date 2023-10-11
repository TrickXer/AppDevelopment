import axios from 'axios'
import Cookies from 'js-cookie'

const url = "http://localhost:8080"

export const authneticate = async (data) => {
    try {
        const response = await axios.post(`${url}/api/v1/auth/authenticate`, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const current = async (data) => {
    try {
        const response = await axios.post(`${url}/api/v1/auth/authenticate`, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const addOrder = async (data) => {
    try {
        return await axios.post(`${url}/api/v1/orders/add`, data, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("login-token")}`,
            }
        })
        .then((response) => response.data)
    } catch (error) {
        console.log(error)
    }
}

export const updateWorker = async (data) => {
    try {
        return await axios.put(`${url}/api/v1/workers/update`, data, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("login-token")}`,
            }
        })
        .then((response) => response.data)
    } catch (error) {
        console.log(error)
    }
}

export const updateProducts = async (data) => {
    try {
        return await axios.put(`${url}/api/v2/products/update`, data, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("login-token")}`
            }
        })
        .then((response) => response.data)
    } catch (error) {
        console.log(error)
    }
}

// fetchUsers()

// getUserById("eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxMDRiMGQ0OC0wNDRlLTRiOGUtYjA5Ny1lYjkwMDdmMjQ3NDEiLCJpYXQiOjE2OTY0NzcyNDh9.XLFOUfg5GudrwaDO-GLDSyOzddkBR22WQ9ihv2JFww8", "70163948-b09b-43fb-9333-21a4e8bb0c07")