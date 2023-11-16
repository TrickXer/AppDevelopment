import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = 'http://trixr:8080/'

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios.get(API_URL + 'api/v1/users/all', {
        mode: 'no-cors',
        headers: {
            "Authorization": `Bearer ${Cookies.get("login-token")}`,
        }
    })
        .then((response) => response.data)
})

export const fetchWorkers = createAsyncThunk('worker/fetchWorkers', () => {
    return axios.get(API_URL + 'api/v1/workers/all', {
        mode: 'no-cors',
        headers: {
            "Authorization": `Bearer ${Cookies.get("login-token")}`,
        }
    })
        .then((response) => response.data)
})

export const fetchOrders = createAsyncThunk('order/fetchOrders', () => {
    return axios.get(API_URL + 'api/v1/orders/all', {
        mode: 'no-cors',
        headers: {
            "Authorization": `Bearer ${Cookies.get("login-token")}`,
        }
    })
        .then((response) => response.data)
})

export const fetchProducts = createAsyncThunk('products/fetchProducts', () => {
    return axios.get(API_URL + 'api/v2/products/all', {
        mode: 'no-cors',
        headers: {
            "Authorization": `Bearer ${Cookies.get('login-token')}`
        }
    })
        .then((response) => response.data)
})

export const fetchProduct = createAsyncThunk('product/fetchProduct', (id) => {
    return axios.get(API_URL + `api/v2/products/${id}`, {
        // mode: 'no-cors',
        headers: {
            "Authorization": `Bearer ${Cookies.get('login-token')}`
        }
    })
        .then((response) => response.data)
})

// redux actions
export const customSlice = createSlice({
    name: 'custSlice',
    initialState: {
        products: {
            loading: false,
            products: [],
            sortProducts: [],
            error: ''
        },
        product: {
            loading: false,
            product: {},
            error: ''
        },
        users: {
            loading: false,
            users: [],
            error: ''
        },
        orders: {
            loading: false,
            orders: [],
            error: ''
        },
        order: {
            date: null,
            price: null,
            items: [],
            selected: false
        },
        workers: {
            loading: false,
            workers: [],
            error: ''
        },
        current: {},
        isLogin: false
    },
    reducers: {
        setCurrent(state, action) {
            state.current = action.payload
        },
        setWorker(state, action) {
            state.worker = action.payload
            state.workers[action.payload.id - 1].present = action.payload.present
            state.workers[action.payload.id - 1].time = action.payload.time
        },
        setWorkers(state, action) {
            state.workers = [...state.workers, action.payload]
        },
        setIsLogin(state, action) {
            state.isLogin = action.payload
        }
    },
    extraReducers: (builder) => {
        // Users
        builder.addCase(fetchUsers.pending, (state) => {
            state.users.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users.loading = false
            state.users.users = action.payload
            state.users.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.users.loading = false
            state.users.users = []
            state.users.error = action.error.message
        })

        // Orders
        builder.addCase(fetchOrders.pending, (state) => {
            state.orders.loading = true
        })
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.orders.loading = false
            state.orders.orders = action.payload
            state.orders.error = ''
        })
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.orders.loading = false
            state.orders.orders = []
            state.orders.error = action.error.message
        })

        // Prooducts
        builder.addCase(fetchProducts.pending, (state) => {
            state.products.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products.loading = false
            state.products.products = action.payload
            state.products.sortProducts = action.payload.sort((a, b) => b.noOfProductSold - a.noOfProductSold)
            state.products.error = ''
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.products.loading = false
            state.products.products = []
            state.products.sortProducts = []
            state.products.error = action.error.message
        })

        // Prooduct
        builder.addCase(fetchProduct.pending, (state) => {
            state.product.loading = true
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.product.loading = false
            state.product.product = action.payload
            state.product.error = ''
        })
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.product.loading = false
            state.product.product = {}
            state.product.error = action.error.message
        })

        // Workers
        builder.addCase(fetchWorkers.pending, (state) => {
            state.workers.loading = true
        })
        builder.addCase(fetchWorkers.fulfilled, (state, action) => {
            state.workers.loading = false
            state.workers.workers = action.payload
            state.workers.error = ''
        })
        builder.addCase(fetchWorkers.rejected, (state, action) => {
            state.workers.loading = false
            state.workers.workers = []
            state.workers.error = action.error.message
        })
    }
})

export const { setCurrent, deleteWorker, setOrderSelected, setProducts, setProductStock, setUsers, setWorker, setWorkers, setIsLogin, setOrder, setOrders } = customSlice.actions
export default customSlice.reducer