import React, { useEffect } from 'react'
import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, ThemeProvider, Typography, createTheme } from '@mui/material'
import userPng from '../data/images/user-avatar.png'
import workerPng  from '../data/images/worker-avatar.png'
import EastIcon from '@mui/icons-material/East';
import orderImg from '../data/images/person-shopping.jpg'
import SidePanel from './SidePanel';
import CountUp from './CountUp';
import LinearChartRep from './LinearChartRep'
import PieChartRep from './PieChartRep';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, fetchUsers, fetchWorkers } from '../store/reducer';

export default function Dashboard(props) {

    const users = useSelector((state) => state.store.users)
    const orders = useSelector((state) => state.store.orders)
    const workers = useSelector((state) => state.store.workers)
    const current = useSelector((state) => state.store.current)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchOrders())
        dispatch(fetchWorkers())
    }, [])

    const theme = createTheme({
        palette: {
            slide_up: {
                '0%': {
                    opacity: 0,
                    transform: 'translateY(75px)'
                },
                '100%': {
                    opacity: 1,
                    transform: 'translateY(0px)'
                }
            }
        }
    })
    
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ ml: 3, mr: 3, overflowY: 'scroll', }}>
                <Typography variant='h4' fontFamily='monospace' sx={{ mt: 3, letterSpacing: '0.1rem', fontWeight: 600 }}>Dashboard</Typography>
                <Box sx={{ mt: 8, display: 'flex', gap: 5 }}>
                    <Card sx={{
                        maxWidth: 345,
                        maxHeight: 350,
                        '@keyframes slide-up': theme.palette.slide_up,
                        animation: 'slide-up 500ms ease-in-out'
                    }}>
                        <CardActionArea>
                            <CardHeader
                                title='Total Orders'
                                action={
                                    <IconButton>
                                        <EastIcon />
                                    </IconButton>
                                }
                                subheader={
                                    <CountUp end={orders.orders.length} />
                                }
                            />
                            <CardMedia
                                component='img'
                                height='180'
                                image={orderImg}
                                sx={{ objectFit: 'contain' }}
                            />
                            <CardContent>
                                <Typography variant='body2'>
                                    This order card is used to track and manage individual orders. It includes all of the relevant information about the orders you have made.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    {
                        current.role === "ROLE_ADMIN" &&
                        <Card sx={{
                            maxWidth: 345,
                            maxHeight: 350,
                            '@keyframes slide-up': theme.palette.slide_up,
                            animation: 'slide-up 800ms ease-in-out'
                        }}>
                            <CardActionArea>
                                <CardHeader
                                    title='Workers'
                                    action={
                                        <IconButton>
                                            <EastIcon />
                                        </IconButton>
                                    }
                                    subheader={
                                        <CountUp end={workers.workers.length} />
                                    }
                                />
                                <CardMedia
                                    component='img'
                                    height='180'
                                    image={workerPng}
                                    sx={{ objectFit: 'contain' }}
                                />
                                <CardContent>
                                    <Typography variant='body2'>
                                        This order card is used to track and manage individual orders. It includes all of the relevant information about the orders you have made.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    }

                    <Card sx={{
                        maxWidth: 345,
                        maxHeight: 350,
                        '@keyframes slide-up': theme.palette.slide_up,
                        animation: 'slide-up 1.1s ease-in-out'
                    }}>
                        <CardActionArea>
                            <CardHeader
                                title='Users'
                                action={
                                    <IconButton>
                                        <EastIcon />
                                    </IconButton>
                                }
                                subheader={
                                    <CountUp end={users.users.length} />
                                }
                            />
                            <CardMedia
                                component='img'
                                height='180'
                                image={userPng}
                                sx={{ objectFit: 'contain' }}
                            />
                            <CardContent>
                                <Typography variant='body2'>
                                    This order card is used to track and manage individual orders. It includes all of the relevant information about the orders you have made.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
                {/* {
                    current.role === "ROLE_ADMIN" &&
                    <Box sx={{ display: 'flex', gap: 8 }}>
                        <LinearChartRep
                            elevation={true}
                            sx={{
                                mt: 5,
                                height: 360,
                                width: 640,
                                '@keyframes slide-up': theme.palette.slide_up,
                                animation: 'slide-up 1.4s ease-in-out'
                            }}
                        />
                        
                        <PieChartRep
                            sx={{
                                mt: 5,
                                height: 360,
                                width: 640,
                                '@keyframes slide-up': theme.palette.slide_up,
                                animation: 'slide-up 1.4s ease-in-out'
                            }}
                        />
                    </Box>
                } */}
            </Box>
        </ThemeProvider>
    )
}
