import { Box, CircularProgress, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Item from './Item'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/reducer'

export default function Products(props) {

    const products = useSelector((state) => state.store.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8, pb: 8, pl: 12, pr: 12 }}>
            <Grid container rowSpacing={1} gap={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                { products.loading && <CircularProgress /> }
                {
                    products.products.map((item, i) => (
                        <Item key={i} item={item} />
                    ))
                }
            </Grid>
        </Box>
    )
}
