import { Avatar, Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SidePanel from './SidePanel'
import store from '../store/store'
import { getUserById, getUsers } from '../api/axiosRequests.mjs'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/reducer'
import Cookies from 'js-cookie'

export default function Users({ logout, defaultAvatar }) {
    const current = useSelector((state) => state.store.current)
    const users = useSelector((state) => state.store.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const headCells = [
        {
            id: 'customer',
            numeric: false,
            disablePadding: false,
            label: 'Customer'
        },
        {
            id: 'contact',
            numeric: false,
            disablePadding: false,
            label: 'Contact'
        },
        {
            id: 'total-orders',
            numeric: true,
            disablePadding: true,
            label: 'Total Orders'
        }
    ]

    return (
        <Box sx={{ height: '100%', display: 'flex', backgroundColor: '#ECECEC' }}>
            <SidePanel role={current.role} logout={logout} />
            <Box sx={{ height: '100%', flex: '1 1 auto', mt: 8, ml: 3, mr: 3, overflowY: 'scroll', maxHeight: '780px' }}>
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
                                        {headCell.label}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                        {
                            users.users !== undefined &&
                            <TableBody>
                                {users.users.loading && <CircularProgress />}
                                {!users.loading && users.error ? <CircularProgress /> : null}
                                {
                                    !users.loading && users.users.length ? (

                                        users.users.map((user, id) => (
                                            <TableRow key={id} hover >
                                                <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }} scope='row'>
                                                    <Avatar src={defaultAvatar} />
                                                    {user.user.userName}
                                                </TableCell>
                                                <TableCell>{user.user.userContact}</TableCell>
                                                <TableCell>{user.orders.length}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : null
                                }
                            </TableBody>
                        }
                </Table>
            </Box>
        </Box>
    )
}
