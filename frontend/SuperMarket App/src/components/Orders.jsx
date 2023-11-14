import React, { useEffect, useState } from 'react'
import SidePanel from './SidePanel'
import { Avatar, Backdrop, Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, Zoom } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NewOrder from './NewOrder';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/reducer';


export default function Orders(props) {
    const [created, setCreated] = useState(false)

    const [open, setOpen] = useState(false)
    const orders = useSelector((state) => state.store.orders)
    const [orderDetails, setOrderDetails] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch, open])
    
    useEffect(() => {
        if (created) {
            setTimeout(() => {
                setCreated(false)
            }, 1.7 * 1000);
        }
    }, [created])

    const calculatePrice = (items) => {
        let totalPrice = 0;

        for (const item of items) {
            totalPrice += (item.productPrice * item.productQuantity)
        }

        // console.log(totalPrice)
        return totalPrice
    }

    const ItemsHeadCells = [
        {
            id: 's_no',
            numeric: true,
            disablePadding: false,
            label: 'S.No'
        },
        {
            id: 'item',
            numeric: false,
            align: 'center',
            disablePadding: true,
            label: 'Item'
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: false,
            label: 'Price'
        }
    ]

    return (
        <>
            <Box sx={{ height: '100%', flex: '1 1 auto', ml: 3, mr: 3, }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h4' fontFamily='monospace' sx={{ mt: 3, letterSpacing: '0.1rem', fontWeight: 600 }}>Bills</Typography>
                    {
                        props.current.role !== "ROLE_ADMIN" &&
                        <Button onClick={() => setOpen(true)} sx={{ mt: 5, ml: 4 }} color='primary' variant='contained' startIcon={<AddShoppingCartIcon />}>New Order</Button>
                    }
                </Box>
                {
                    created ? (
                        <Backdrop sx={{ zIndex: 1 }} open={created}>
                            <Zoom in={created} style={{ transitionDuration: '300ms' }} >
                                <Box sx={{ width: '33em', height: '22em', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography>Order created</Typography>
                                </Box>
                            </Zoom>
                        </Backdrop>
                    ): (
                        <Backdrop sx={{ color: '#fff', zIndex: 1 }} open={open} >
                            <NewOrder created={created} setCreated={setCreated} setOpen={setOpen} />
                        </Backdrop>
                    )
                }
                
                <Box sx={{ mt: 4, maxHeight: '650px' }}>
                    <Table sx={{ borderCollapse: 'separate', borderSpacing: '0px 10px', tableLayout: 'fixed' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#9E9EA2', borderBottom: 'none' }} align='left' padding='normal'>S.No</TableCell>
                                <TableCell sx={{ color: '#9E9EA2', borderBottom: 'none' }} align='left' padding='none'>Customer</TableCell>
                                <TableCell sx={{ color: '#9E9EA2', borderBottom: 'none' }} align='left' padding='normal'>Date</TableCell>
                                <TableCell sx={{ color: '#9E9EA2', borderBottom: 'none' }} align='left' padding='normal'>Price</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Box>
                <Box sx={{ overflowY: 'auto', maxHeight: '655px' }}>
                    <Table sx={{ borderCollapse: 'separate', borderSpacing: '0px 10px', tableLayout: 'fixed' }}>
                        <TableBody sx={{ overflowY: 'scroll', maxHeight: '640px' }}>
                            {
                                orders.orders?.map((order, id) => (
                                    <TableRow sx={{ transition: 'background 150ms ease-in-out', backgroundColor: orderDetails === id ? '#1976d2' : 'white', "&:hover": { backgroundColor: orderDetails === id ? '#1976d2' : 'rgba(0, 0, 0, 0.025)' } }} onClick={ () => setOrderDetails(id) } key={id}>
                                        <TableCell align='left' padding='normal' sx={{ color: orderDetails === id ? 'white' : 'black', borderTopLeftRadius: 15, borderBottomLeftRadius: 15, borderBottom: 'none' }} scope='row'>{id + 1}</TableCell>
                                        <TableCell align='left' padding='none' sx={{ color: orderDetails === id ? 'white' : 'black', padding: '16px 16px 16px 0px', borderBottom: 'none', display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar sx={{ width: 32, height: 32 }} src={props.defaultAvatar} />{order.user.userName}
                                        </TableCell>
                                        <TableCell align='left' padding='normal' sx={{ color: orderDetails === id ? 'white' : 'black', borderBottom: 'none' }}>{order.orderDate}</TableCell>
                                        <TableCell align='left' padding='normal' sx={{ color: orderDetails === id ? 'white' : 'black', borderTopRightRadius: 15, borderBottomRightRadius: 15, borderBottom: 'none' }}>₹ { calculatePrice(order.items) }</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Box>
            </Box>
            <Paper sx={{ width: '360px', height: '100%', pl: 3, pr: 3, flex: '1 0 auto' }} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                ItemsHeadCells?.map((ItemsHeadCell, id) => (
                                    <TableCell
                                        key={id}
                                        align={ItemsHeadCell.align}
                                        sx={{ fontWeight: 700 }}
                                        padding={ItemsHeadCell.disablePadding ? 'none' : 'normal'}
                                    >
                                        {ItemsHeadCell?.label}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orders.orders[orderDetails]?.items?.map((item, id) => (
                                <TableRow key={id}>
                                    <TableCell>{id+1}</TableCell>
                                    <TableCell align='center' sx={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
                                        <img style={{ height: '36px', objectFit: 'contain', objectPosition: 'center' }} src={`http://localhost:8081/api/v1/images/${item.productName}`} alt={item.productName} />
                                        {item.productName}
                                    </TableCell>
                                    <TableCell>₹ {item.productQuantity * item.productPrice}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Paper>
        </>
    )
}
