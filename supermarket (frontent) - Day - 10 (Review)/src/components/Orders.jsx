import React, { useEffect, useState } from 'react'
import SidePanel from './SidePanel'
import { Backdrop, Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NewOrder from './NewOrder';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/reducer';


export default function Orders(props) {
    const [open, setOpen] = useState(false)
    const orders = useSelector((state) => state.store.orders)
    const current = useSelector((state) => state.store.current)
    const [orderDetails, setOrderDetails] = useState(orders.orders[0])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrders())
    }, [])
    

    const calculatePrice = (items) => {
        let totalPrice = 0;

        for (const item of items) {
            totalPrice += (item.productPrice * item.productQuantity)
        }

        // console.log(totalPrice)
        return totalPrice
    }
    
    const headCells = [
        {
            id: 's_no',
            numeric: true,
            disablePadding: false,
            label: 'S.No'
        },
        {
            id: 'date',
            numeric: false,
            disablePadding: false,
            label: 'Date'
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: true,
            label: 'Price (in ₹)'
        }
    ]

    const ItemsHeadCells = [
        {
            id: 'item_id',
            numeric: true,
            disablePadding: false,
            label: 'Item ID'
        },
        {
            id: 'item',
            numeric: false,
            disablePadding: false,
            label: 'Item'
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: true,
            label: 'Price (in ₹)'
        }
    ]

    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#ECECEC' }}>
            <SidePanel logout={props.logout} role={current.role} />
            <Box sx={{ height: '100%', flex: '1 1 auto' }}>
                {
                    current.role !== "ROLE_ADMIN" &&
                    <Button onClick={() => setOpen(true)} sx={{ mt: 5, ml: 4 }} color='error' variant='contained' startIcon={<AddShoppingCartIcon />}>New Order</Button>
                }
                {
                    open &&
                    <Backdrop
                        sx={{ color: '#fff', zIndex: 1 }}
                        open={open}
                        >
                        <NewOrder setOpen={setOpen} />
                    </Backdrop>
                }
                
                <Box sx={{ mt: 8, ml: 3, mr: 3, overflowY: 'scroll', maxHeight: '650px' }}>
                    <Table sx={{ backgroundColor: 'white' }}>
                        <TableHead>
                            <TableRow>
                                {
                                    headCells?.map((headCell, id) => (
                                        <TableCell
                                            key={id}
                                            align='left'
                                            sx={{ fontWeight: 700 }}
                                            padding={headCell.disablePadding ? 'none' : 'normal'}
                                        >
                                            { headCell.label }
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orders.orders?.map((order, id) => (
                                    <TableRow onClick={ () => setOrderDetails(order) } key={id} hover >
                                        <TableCell scope='row'>{id+1}</TableCell>
                                        <TableCell>{order.orderDate}</TableCell>
                                        <TableCell>{ calculatePrice(order.items) }</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Box>
            </Box>
            <Paper sx={{ width: '360px', height: '100%', pl: 3, pr: 3 }} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                ItemsHeadCells?.map((ItemsHeadCell, id) => (
                                    <TableCell
                                        key={id}
                                        align='left'
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
                            orderDetails?.items?.map((item, id) => (
                                <TableRow key={id}>
                                    <TableCell>{id+1}</TableCell>
                                    <TableCell>{item.productName}</TableCell>
                                    <TableCell>{item.productQuantity * item.productPrice}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    )
}
