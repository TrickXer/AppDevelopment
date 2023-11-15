/* eslint-disable jsx-a11y/img-redundant-alt */
import { Backdrop, Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, IconButton, Paper, Skeleton, TextField, Tooltip, Typography, Zoom } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Item from './Item'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/reducer'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import defaultImage from '../data/images/istockphoto-1288129966-612x612.jpg';
import { addProducts, updateProducts } from '../api/axiosRequests.mjs';
import verifyTick from '../data/animations/Animation - 1699959884235.webm'


export default function Products(props) {

    const [created, setCreated] = useState(false)

    const [open, setOpen] = useState(false)
    const [prod, setProd] = useState(null)
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
    }, [dispatch, open])

    const confirmation = (bool) => {
        if (bool) {
            setOpen(false)
            
            setTimeout(() => {
                setCreated(true)
                
                setTimeout(() => {
                    setCreated(false)
                }, 1 * 1000)
            }, .2 * 1000)

        }
    }

    const addProduct = () => {
        if (prod === null) {
            const data = new FormData()
    
            data.append("file", file)
    
            const body = {
                productName: name,
                productPrice: parseFloat(price),
                fixedProductStock: parseInt(stock)
            }
            const blob = new Blob([JSON.stringify(body)], {
                type: 'application/json'
            })
    
            data.append("data", blob)
    
            confirmation(addProduct(data))
        }

        else {
            const updatedItem = {
                productId: prod['productId'],
                productName: name === null ? prod['productName'] : name,
                productPrice: price === null ? prod['productPrice'] : parseFloat(price),
                productStock: prod['productStock'],
                fixedProductStock: stock === null ? prod['fixedProductStock'] : parseInt(stock)
            }

            confirmation(updateProducts(updatedItem))
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8, pb: 8, backgroundColor: '#F9F9FC' }}>
            <Box display='grid' width='100%' justifyContent='center' gridTemplateColumns='repeat(auto-fill, 300px)' rowGap={3} columnGap={3} >
                {
                    products.loading ? (
                        [...Array(10)].map((e, i) => (
                            <Card>
                                <Skeleton variant='rectangular' height='200px' animation='wave' />
                                <CardContent>
                                    <Skeleton variant='text' animation='wave' />
                                    <Skeleton sx={{ mt: '1em' }} variant='text' width='36%' animation='wave' />
                                </CardContent>
                            </Card>
                        ))
                    ) : (    
                        products.products.map((item, i) => (
                            <Item setOpen={setOpen} setProd={setProd} key={i} item={item} showStock={current.role === "ROLE_ADMIN"} />
                        ))
                    )
                }
                {
                    current.role === "ROLE_ADMIN" &&
                    <>
                        <Card sx={{ height: '300px', width: '300px', background: 'transparent' }} elevation={0} >
                            <Tooltip title='Add' sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <IconButton onClick={() => setOpen(true)}>
                                    <AddCircleIcon sx={{ '&:hover': { color: '#32C832' } }} fontSize='large' color='action' />
                                </IconButton>
                            </Tooltip>
                        </Card>
                        {
                            open &&
                            <Backdrop open={open} >
                                <Box sx={{ backgroundColor: 'white', borderRadius: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Tooltip title='close'>
                                            <IconButton sx={{ '&:hover': { color: 'red' } }} onClick={() => {
                                                setOpen(false)
                                                setProd(null)
                                            }}>
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
                                                src={prod === null ? image : `http://localhost:8081/api/v1/images/${prod.productName}`}
                                                alt='upload-image'
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                            <TextField onChange={(e) => setName(e.target.value)} defaultValue={prod === null ? '' : prod.productName} size='small' label='Title' type='text' id='product-name' required />
                                            <TextField onChange={(e) => setPrice(e.target.value)} defaultValue={prod === null ? '' : prod.productPrice} size='small' label='Price' type='number' id='product-price' required />
                                            <TextField onChange={(e) => setStock(e.target.value)} defaultValue={prod === null ? '' : prod.fixedProductStock} size='small' label='Fixed-Stock' type='number' id='product-stock' required />
                                        </Box>
                                    </Box>
                                    <Box sx={{ padding: 5, paddingTop: 0, paddingBottom: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button onClick={addProduct} variant='contained'>{prod === null ? 'Add' : 'Update'}</Button>
                                    </Box>
                                </Box>
                            </Backdrop>
                        }
                        {
                            created &&
                            <Backdrop sx={{ zIndex: 1 }} open={created}>
                                <Zoom in={created} style={{ transitionDuration: '300ms' }} >
                                    <Box component={Paper} elevation={3} sx={{ borderRadius: '15px', width: '33em', height: '22em', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1em' }}>
                                        <video style={{ width: '150px', height: '150px' }} src={verifyTick} alt='Loading...' autoPlay />
                                        <Typography sx={{ fontSize: '21px', letterSpacing: '.075rem', fontFamily: 'monospace' }}>Product {prod === null ? 'Added' : 'Updated'} Successfully</Typography>
                                    </Box>
                                </Zoom>
                            </Backdrop>
                        }
                    </>
                }
            </Box>
        </Box>
    )
}
