import React from 'react'
import { updateProducts } from '../api/axiosRequests.mjs'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Tooltip, Typography } from '@mui/material'

export default function Item({ item, showStock, setOpen, setProd }) {

    const handleReStock = (item) => {
        item = { ...item, productStock: item['fixedProductStock'] }
        updateProducts(item)

        window.location.reload()
    }

    return (
        <Tooltip
            title={showStock && `Products sold: ${item.noOfProductSold}`}
        >
            <Card sx={{ flex: '0 0 auto', width: '300px' }}>
                {
                    showStock &&
                    <CardHeader action={
                        <Tooltip title='Edit'>
                            <IconButton onClick={() => {
                                setProd(item)
                                setOpen(true)
                            }} aria-label='Edit' size='small'>
                                <EditNoteOutlinedIcon sx={{ color: '#32C832' }} />
                            </IconButton>
                        </Tooltip>
                    } />
                }
                <CardMedia
                    component='img'
                    loading='lazy'
                    sx={{ height: 200, objectFit: 'contain', backgroundSize: 'contain', backgroundPosition: 'center', display: 'flex', justifyContent: 'center' }}
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
                    <Typography variant='body2'>Stock: {item.productStock}</Typography>
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
        </Tooltip>
    )
}
