import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, CircularProgress, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SidePanel from './SidePanel'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/reducer'
import PagingItem from './PagingItem';

export default function Users({ logout, defaultAvatar }) {
    const [userid, setUserid] = useState(null)
    
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
            <Box sx={{ height: '100%', flex: '1 1 auto' }}>
                <Typography variant='h4' fontFamily='monospace' sx={{ m: '25px 0px 0px 25px', letterSpacing: '0.1rem', fontWeight: 600 }}>Customers</Typography>
                {
                    users.users !== undefined &&
                    <Box sx={{ mt: 4, ml: 3, mr: 3, overflowY: 'scroll', maxHeight: '650px' }}>
                        {users.users.loading && <CircularProgress />}
                        {!users.loading && users.error ? <CircularProgress /> : null}
                        {
                            !users.loading && users.users.length &&
                            users.users.map((user, id) => (
                                <Accordion elevation={0} disableGutters sx={{ mb: 1, borderBottom: 'none' }} key={id} >
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '33%', flexShrink: 0 }}>
                                                <Avatar src={defaultAvatar} />
                                                {user.user.userName}
                                            </Typography>
                                            <Typography sx={{ mr: 32 }}>{user.user.userContact}</Typography>
                                            <Typography sx={{ mr: 28, color: 'text.secondary' }} >{user.orders.length}</Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <Divider />
                                    <AccordionDetails sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ width: '30%', backgroundColor: '#F9F9FC' }}>
                                            <PagingItem orders={user.orders} />
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        }
                    </Box>
                }
            </Box>
    )
}
