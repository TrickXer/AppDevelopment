import { AppBar, Avatar, Box, Button, Divider, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setCurrent } from '../store/reducer';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';


export default function NavBar({ navigate, defaultAvatar, logout }) {
    const current = useSelector((state) => state.store.current)
    const dispatch = useDispatch()

    useEffect(() => {
        const token = Cookies.get("login-token")

        if (token)
            dispatch(setCurrent(JSON.parse(atob(token.split(".")[1])).worker))
    }, [navigate])

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar sx={{ background: 'white' }} elevation={3} >
            <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <Typography
                        variant='h6'
                        noWrap
                        component={Link}
                        to='/'
                        sx={{
                            ml: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontSize: '32px',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none'
                        }}>
                        SuperMarket
                    </Typography>
                    <Box mx={6}>
                        {
                            Cookies.get("login-token") &&
                            <Link style={{
                                fontSize: '16px',
                                fontFamily: 'monospace',
                                letterSpacing: '.2rem',
                                color: 'black',
                                textDecoration: 'none',
                                marginRight: 12,
                                marginLeft: 12,
                                fontWeight: window.location.pathname === '/products' ? 600 : 500
                            }}
                            to='/products'
                            >Products</Link>
                        }

                        {/* <Link style={{
                            fontSize: '16px',
                            fontFamily: 'monospace',
                            letterSpacing: '.2rem',
                            color: 'black',
                            textDecoration: 'none',
                            marginRight: 12,
                            marginLeft: 12
                        }}
                        >About</Link> */}
                    </Box>
                </Box>
                {
                    // (location.pathname === 'log-in' || location.pathname === 'sign-in') &&
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 2, width: '200px', display: 'flex', alignItems: 'center', justifyContent: Cookies.get("login-token") ? 'end' : 'space-between' }} >
                            {
                                Cookies.get("login-token") ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 3 }}>
                                            <Typography sx={{ fontFamily: 'monospace', letterSpacing: '.1rem', color: 'black' }}>{current.name}</Typography>
                                            <Tooltip title="Account settings">
                                                <IconButton
                                                    onClick={handleClick}
                                                    size="small"
                                                    sx={{ ml: 2 }}
                                                    aria-controls={open ? 'account-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                >
                                                    <Avatar src={defaultAvatar} sx={{ width: 36, height: 36 }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={open}
                                            onClose={handleClose}
                                            onClick={handleClose}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem sx={{ fontFamily: 'monospace', letterSpacing: '.1rem', marginRight: 2, color: 'black' }} onClick={() => navigate('/view/dashboard')}>
                                                My Dashboard
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem sx={{ fontFamily: 'monospace', letterSpacing: '.15rem', marginRight: 2, color: 'red' }}
                                                onClick={() => {
                                                    logout()
                                                    Cookies.remove("login-token")
                                                    navigate("/")
                                            }}>
                                                LogOut
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                ) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                                        <Button component={Link} to='/log-in' sx={{ backgroundColor: 'black', '&:hover': { color: 'black', backgroundColor: 'white' } }} variant='contained'>Log in</Button>
                                    </Box>
                                )
                            }
                        </Box>
                    </Box>
                }
            </Toolbar>
        </AppBar>
    )
}
