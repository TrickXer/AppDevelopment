import axios from 'axios'
import Cookies from 'js-cookie'

const url = "http://trixr:8080"

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

export const deleteWorker = async (uuid) => {
    try {
        return await axios.delete(`${url}/api/v1/workers/delete?workerId=${uuid}`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("login-token")}`,
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const addWorker = async (data) => {
    try {
        return await axios.post(`${url}/api/v1/workers/add`, data, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("login-token")}`,
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const addProducts = async (data) => {
    try {
        return await axios.post(`${url}/api/v2/products/add`, data, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("login-token")}`,
                "Content-Type": "multipart/form-data"
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