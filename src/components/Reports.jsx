import { Autocomplete, Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import { fetchProduct, fetchProducts } from '../store/reducer';
import Item from './Item';
import LinearChartRep from './LinearChartRep';


export default function Reports(props) {
    const products = useSelector((state) => state.store.products)
    const product = useSelector((state) => state.store.product)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <Box sx={{ ml: 3, mr: 3, flex: '1 1 auto', overflowX: 'hidden', overflowY: 'auto' }}>
            <Typography variant='h4' fontFamily='monospace' sx={{ mt: 3, letterSpacing: '0.1rem', fontWeight: 600 }}>Reports</Typography>
            <Box sx={{ mt: 3, overflowY: 'scroll', flex: '1 1 auto', paddingRight: 5 }}>
                <Box component='form' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Autocomplete
                        id='products-autocomplete'
                        size='small'
                        options={products.products}
                        getOptionLabel={option => option.productName}
                        sx={{ mt: 3, width: '35%' }}
                        onChange={(e, value) => {
                            if (value !== null) {
                                dispatch(fetchProduct(value.productId))
                            }
                        }}
                        renderInput={params => (
                            <TextField {...params} variant='standard' size='small' id='products' label='Search Products' name='products' />
                        )}
                    />
                </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <LinearChartRep
                    datas={product.product}
                    elevation={false}
                    sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'calc(9*35px)',
                        width: 'calc(16*35px)'
                    }}
                />
            </Box>
            <Box sx={{ mt: 5, width: '100%' }}>
                <Typography variant='h5' fontFamily='monospace' letterSpacing='0.25rem' fontWeight={700}>Highly sold</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, overflowX: 'auto' }}>
                    {
                        products.sortProducts.map((item, id) => (
                            <Item key={id} item={item} showStock={false} />
                        ))
                    }
                </Box>
            </Box>
        </Box>
    )
}
