/* eslint-disable jsx-a11y/img-redundant-alt */
import { Backdrop, Box, Button, Card, CircularProgress, Grid, IconButton, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Item from './Item'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/reducer'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import defaultImage from '../data/images/istockphoto-1288129966-612x612.jpg';
import { addProducts } from '../api/axiosRequests.mjs';

export default function Products(props) {

    const [open, setOpen] = useState(false)

    const [image, setImage] = useState(defaultImage)

    const [file, setFile] = useState(null)
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [stock, setStock] = useState(null)

    const products = useSelector((state) => state.store.products)
    const current = useSelector((state) => state.store.current)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const addProduct = () => {
        const data = new FormData()

        data.append("file", file)

        const body = {
            productName: name,
            productPrice: parseFloat(price),
            productStock: parseInt(stock)
        }
        const blob = new Blob([JSON.stringify(body)], {
            type: 'application/json'
        })

        data.append("data", blob)

        if (addProducts(data)) {
            setOpen(false)
            window.location.reload()
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8, pb: 8, backgroundColor: '#F9F9FC' }}>
            <Box display='grid' width='100%' justifyContent='center' gridTemplateColumns='repeat(auto-fill, 300px)' rowGap={3} columnGap={3} >
                { products.loading && <CircularProgress /> }
                {
                    products.products.map((item, i) => (
                        <Item key={i} item={item} showStock={true} />
                    ))
                }
                {
                    current.role === "ROLE_ADMIN" &&
                    <>
                        <Card sx={{ height: '300px', width: '300px' }}>
                            <Tooltip title='Add'>
                                <Button onClick={() => setOpen(true)} sx={{ height: '100%', width: '100%', borderRadius: 3 }}>
                                    <AddCircleIcon fontSize='large' color='action' />
                                </Button>
                            </Tooltip>
                        </Card>
                        <Backdrop
                            open={open}
                        >
                            <Box sx={{ backgroundColor: 'white', borderRadius: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Tooltip title='close'>
                                        <IconButton sx={{ '&:hover': { color: 'red' } }} onClick={() => setOpen(false)}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2, padding: 5 }}>
                                    <Box>
                                        <input onChange={(e) => {
                                            const file = e.target.files[0]
                                            setFile(file)
                                            setImage(URL.createObjectURL(file))
                                        }}
                                            id='product-image'
                                            style={{ position: 'absolute', display: 'none' }}
                                            type='file'
                                        />
                                        <img
                                            onClick={() => {
                                                document.getElementById('product-image').click()
                                            }}
                                            style={{
                                                objectFit: 'contain',
                                                width: 280
                                            }}
                                            src={image}
                                            alt='upload-image'
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <TextField onChange={(e) => setName(e.target.value)} size='small' label='Title' type='text' id='product-name' required />
                                        <TextField onChange={(e) => setPrice(e.target.value)} size='small' label='Price' type='number' id='product-price' required />
                                        <TextField onChange={(e) => setStock(e.target.value)} size='small' label='Stock' type='number' id='product-stock' required />
                                    </Box>
                                </Box>
                                <Box sx={{ padding: 5, paddingTop: 0, paddingBottom: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button onClick={addProduct} variant='contained'>Add</Button>
                                </Box>
                            </Box>
                        </Backdrop>
                    </>
                }
            </Box>
        </Box>
    )
}
