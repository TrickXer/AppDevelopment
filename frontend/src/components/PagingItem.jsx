import { Box, Pagination, Slide, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'

export default function PagingItem({ orders }) {
    const [page, setPage] = useState(1)

    const handleOnChange = (e, value) => {
        setPage(value)
    }

    return (
        <Box>
            <Table sx={{ p: '0px 16px 0px 16px', borderCollapse: 'separate', borderSpacing: '0px 10px', tableLayout: 'fixed', overflow: 'hidden' }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: '#9E9EA2', borderBottom: 'none' }}>S.No</TableCell>
                        <TableCell sx={{ color: '#9E9EA2', borderBottom: 'none' }}>Item</TableCell>
                        <TableCell sx={{ color: '#9E9EA2', borderBottom: 'none' }}>Quantity</TableCell>
                        <TableCell sx={{ color: '#9E9EA2', borderBottom: 'none' }}>Price</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <Box sx={{ display: 'flex', overflow: 'hidden' }}>
                {
                    orders.map((order, id) => (
                        <Slide direction='left' in={(page-1) === id} mountOnEnter unmountOnExit>
                            <Table key={id} sx={{ flex: '1 0 auto', p: '0px 16px 0px 16px', borderCollapse: 'separate', borderSpacing: '0px 10px', tableLayout: 'fixed', overflow: 'hidden' }}>
                                <TableBody>
                                    {
                                        order.items.map((item, indx) => (
                                            <TableRow key={indx}
                                                sx={{
                                                    backgroundColor: 'white',
                                                }}
                                            >
                                                <TableCell sx={{ borderBottom: 'none' }}>{indx + 1}</TableCell>
                                                <TableCell align='center' sx={{ borderBottom: 'none', display: 'flex', gap: '1em', alignItems: 'center' }}>
                                                    <img style={{ height: '36px', objectFit: 'contain', objectPosition: 'center' }} src={`http://localhost:8081/api/v1/images/${item.productName}`} alt={item.productName} />
                                                    {item.productName}
                                                </TableCell>
                                                <TableCell align='center' sx={{ borderBottom: 'none' }}>{item.productQuantity}</TableCell>
                                                <TableCell sx={{ borderBottom: 'none' }}>{item.productPrice}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </Slide>
                    ))
                }
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                <Pagination size='medium' count={orders.length} page={page} color='primary' onChange={handleOnChange} />
            </Box>
        </Box>
    )
}
