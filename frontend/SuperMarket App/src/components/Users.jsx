import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, CircularProgress, Divider, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SidePanel from './SidePanel'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/reducer'
import PagingItem from './PagingItem';
import SearchIcon from '@mui/icons-material/Search';
import noDataFound from '../data/images/data-not-found.jpg'


export default function Users({ logout, defaultAvatar }) {
    const [userid, setUserid] = useState(null)

    const [userFilter, setuserFilter] = useState('')
    
    const users = useSelector((state) => state.store.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

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
                <TextField autoFocus type='text' onChange={(e) => setuserFilter(e.target.value)} placeholder='Search...' sx={{ ml: 3, mr: 3, mt: 4, width: '24%' }} variant='standard' InputProps={{
                    startAdornment: (
                        <IconButton sx={{ mr: 1 }} size='small' disableRipple >
                            <SearchIcon />
                        </IconButton>
                    )
                }} />
                {
                    users.users !== undefined &&
                    <Box sx={{ mt: 4, ml: 3, mr: 3, overflowY: 'scroll', maxHeight: '650px' }}>
                        {users.users.loading && <CircularProgress />}
                        {!users.loading && users.error ? <CircularProgress /> : null}
                        {
                            !users.loading && users.users.length &&
                            users.users.filter(user => user.user.userName.toLowerCase().startsWith(userFilter.toLowerCase())).length !== 0 ? (
                                users.users.filter(user => user.user.userName.toLowerCase().startsWith(userFilter.toLowerCase())).map((user, id) => (
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
                            ) : (
                                <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img style={{ height: '650px', width: '100%', objectFit: 'contain', objectPosition: 'center' }} src={noDataFound} alt='No data found' />
                                </Box>
                            )
                        }
                    </Box>
                }
            </Box>
    )
}
