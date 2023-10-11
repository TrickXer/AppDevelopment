import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { updateProducts } from '../api/axiosRequests.mjs'

export default function Item({ item }) {

    const handleReStock = (item) => {
        item = { ...item, productStock: 32 }
        updateProducts(item)

        window.location.reload()
    }

    return (
        <>
            <Card>
                <CardMedia
                    sx={{ height: 200, width: 250 }}
                    image={`http://localhost:8081/api/v1/images/${item.productName}`}
                    title={item.productName}
                />
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography gutterBottom variant='h5' component='div'>
                            {item.productName}
                        </Typography>
                        <CardActions>
                            <Button onClick={() => handleReStock(item)} variant='contained' sx={{ color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'white', color: 'black' }, borderRadius: 2 }}>Re-Stock</Button>
                        </CardActions>
                    </Box>
                    <Typography variant='body2'>Stock: {item.productStock }</Typography>
                </CardContent>
            </Card>

            {/* {
                changeStock &&
                <Backdrop
                    sx={{ color: '#fff', zIndex: 1 }}
                    open={changeStock}
                >
                    <Box component='form' onSubmit={handleSubmit} sx={{ backgroundColor: 'white' }}>
                        <TextField id='product-stock-change' size='small' type='number' defaultValue={item?.stock} />
                        <Button type='submit'>Change</Button>
                    </Box>
                </Backdrop>
            } */}
        </>
    )
}
