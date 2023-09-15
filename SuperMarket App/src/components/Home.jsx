import React from 'react'
import bg from '../data/images/sm-bg.jpg'
import { Link } from 'react-router-dom'
import { Avatar, Box, Button, Typography } from '@mui/material'

export default function Home({ defaultAvatar, isLogin }) {
    

    return (
        <>
            <Box sx={{ minWidth: '100vw', height: '100%' }}>
                <Box sx={{ width: '100%', height: '100vh', backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <Typography sx={{ padding: '1.75rem' }} variant='h1'>
                            SuperMarket
                            <Typography variant='h2'>App</Typography>
                        </Typography>
                        <Box sx={{ width: '200px', display: 'flex', justifyContent: isLogin ? 'end' : 'space-between', paddingRight: '32px' }} mt={6} >
                            {
                                isLogin ? (
                                    <Avatar src={defaultAvatar} sx={{ width: 48, height: 48 }} />
                                ) : (
                                    <>
                                        <Button component={Link} to='/sign-in' variant='contained'>Sign in</Button>
                                        <Button component={Link} to='/log-in' variant='outlined'>Log in</Button>
                                    </>
                                )
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
