import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Divider, IconButton, List, ListItem, ListItemText, TextField, Tooltip, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { fetchProducts } from '../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, updateProducts } from '../api/axiosRequests.mjs';


export default function NewOrder({ setOpen }) {

    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0.00)
    const [customer, setCustomer] = useState(null)
    const [contact, setContact] = useState(null)

    const options = useSelector((state) => state.store.products)
    const dispatch = useDispatch()

    const handleRemove = (item) => {
        const newCart = cart.filter(function (product) {
            return product !== item
        })
        
        setCart(newCart)
    }

    const calculateAmount = () => {
        let price = 0.00

        cart?.map(item => (
            price += options.products.filter(e => e.productId === item.productId)[0].productPrice * item.productQuantity
        ))

        setTotalPrice(parseFloat(price))
    }

    const createOrder = () => {
        let outOfStocks = []

        cart?.map(item => {
            if (item.productQuantity > options.products.filter(e => e.productId === item.productId)[0].productStock) {
                outOfStocks.push(item.productName)
            }
        })

        if (outOfStocks.length !== 0) {
            alert(`No sufficient stocks for products: ${outOfStocks}`)
        }
        else {    
            const d = new Date()
            const date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
    
            let cust = {}
            cust['userName'] = customer
            cust['userContact'] = parseInt(contact)

            const order = {}

            order['orderDate'] = date
            order['items'] = cart
            order['user'] = cust

            if (addOrder(order)) window.location.reload()

            for (const item of order.items) {
                const stock = options.products.filter(e => e.productId === item.productId)[0].productStock
                item['productStock'] = stock - item['productQuantity']

                updateProducts(item)
            }

            setOpen(false)
        }
    }

    useEffect(() => {
        dispatch(fetchProducts())
    }, [cart, dispatch])

    useEffect(() => {
        calculateAmount()
    }, [cart])

    return (
        <Box sx={{
            width: '500px',
            height: '650px',
            borderRadius: 3,
            backgroundColor: 'white',
            '@keyframes slide-down': {
                '0%': {
                    opacity: 0,
                    transform: 'translateY(-50px)'
                },
                '100%': {
                    opacity: 1,
                    transform: 'translateY(0px)'
                }
            },
            animation: 'slide-down 350ms ease-in-out alternate'
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title='close'>
                    <IconButton sx={{ '&:hover': { color: 'red' } }} onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box component='form' onSubmit={createOrder} sx={{ pr: 3, pl: 3 }}>
                <Box>
                    {/* <TextField onChange={(e) => setId(e.target.value)} size='small' type='number' id='invoice-id' label='Invoice ID' name='invoice-id' autoFocus required /> */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <TextField onChange={(e) => setCustomer(e.target.value)} size='small' id='username' label='Customer' name='username' required />
                        <TextField onChange={(e) => setContact(e.target.value)} size='small' id='contact' label='Contact' name='contact' required />
                    </Box>
                </Box>
                <Autocomplete
                    id='products-autocomplete'
                    size='small'
                    options={options.products}
                    getOptionLabel={option =>
                        // <Typography sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                        //     <img style={{ height: '36px', objectFit: 'contain', objectPosition: 'center' }} src={`http://localhost:8081/api/v1/images/${option.productName}`} alt={option.productName} />
                        //     {option.productName}
                        // </Typography>
                        option.productName
                    }
                    sx={{ mt: 3 }}
                    onChange={(e, value) => {
                        if (value !== null) {
                            const item = {
                                productId: value['productId'],
                                productQuantity: 1
                            }
                            setCart([...cart, item])
                        }
                    }}
                    renderInput={params => {
                        console.log(params)
                        return (
                            <TextField {...params} size='small' id='products' label='Search Products' name='products' required />
                        )
                    }
                    }
                />
                <List sx={{ height: '290px', overflowY: 'scroll' }}>
                    {
                        cart?.map((item, id) => (
                            <>
                                <ListItem
                                    key={id}
                                    secondaryAction={
                                        <Tooltip title='delete'>
                                            <IconButton onClick={() => handleRemove(item)} edge='end'>
                                                <DeleteForeverIcon color='error' />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                >
                                    <ListItemText
                                        sx={{ color: 'black' }}
                                        primary={options.products.filter(e => e.productId === item.productId)[0].productName}
                                        secondary={`x${item.productQuantity}`}
                                    />
                                    <TextField size='small' id='quantity' sx={{ width: '50px', mr: 8 }} defaultValue={item.productQuantity}
                                        onChange={(e) => {
                                            const value = e.target.value

                                            if (value !== '') {
                                                const newCart = cart
                                                newCart.map(e => {
                                                    if (e.productId === item.productId) {
                                                        e.productQuantity = value
                                                    }
                                                })

                                                setCart(newCart)
                                                calculateAmount()
                                            }
                                        }}
                                    />
                                </ListItem>
                                <Divider />
                            </>
                        ))
                    }
                </List>
                <Box sx={{ mt: 3 }}>
                    <Typography sx={{ color: 'black', fontWeight: 700 }}>Total Amount: ₹ { totalPrice }</Typography>
                </Box>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                    >Generate Reciept</Button>
                </Box>
            </Box>
        </Box>
    )
}
