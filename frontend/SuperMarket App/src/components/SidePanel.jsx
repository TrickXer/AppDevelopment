import React, { Suspense } from 'react'
import { Box, Button, CircularProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material'
import { Link, Route, Routes } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupIcon from '@mui/icons-material/Group';
import ReportIcon from '@mui/icons-material/Report';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cookies from 'js-cookie';
import CartLoading from './CartLoading';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Users from './Users';
import Workers from './Workers';
import Reports from './Reports';
import { useSelector } from 'react-redux';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';


const PageNotFound = React.lazy(() => import('./pageNotFound'))

export default function SidePanel({ role, logout, navigate, defaultAvatar }) {
    const slideBg = {
        '0%': {
            transform: 'translateX(-100%)'
        },
        '100%': {
            transform: 'translateX(0%)'
        }
    }

    const current = useSelector((state) => state.store.current)

    // const [workerRole, setWorkerRole] = useState({})
    // const [token, setToken] = useState(JSON.parse(localStorage.getItem('login-token')))

    // useEffect(() => {
    //     localStorage.setItem('login-token', JSON.stringify(token))
    //     currentWorker(JSON.parse(localStorage.getItem('login-token'))).then(response => setWorkerRole(response.role))
    // }, [token])

    return (
        <Box sx={{ height: '100%', display: 'flex', backgroundColor: '#F9F9FC' }}>
            <Paper sx={{ position: 'static', height: '100%', width: '275px', display: 'flex', flex: '0 0 auto', flexDirection: 'column', justifyContent: 'space-between' }} elevation={3}>
                <List sx={{ mt: 6 }}>
                    {/* dashboard */}
                    <ListItem sx={{ mt: 1, color: window.location.pathname === '/view/dashboard' ? '#1976d2' : 'inherit' }}>
                        {
                            window.location.pathname === '/view/dashboard' &&
                            <Box sx={{
                                '@keyframes slide-bg': slideBg,
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                left: 0,
                                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                animation: 'slide-bg 150ms ease-in-out'
                            }} />
                        }
                        <ListItemButton sx={{ '&:hover': { background: window.location.pathname === '/view/dashboard' ? 'transparent' : 'rgba(0, 0, 0, 0.05)' } }} disableRipple component={Link} to='/view/dashboard'>
                            <ListItemIcon>
                                {
                                    window.location.pathname === '/view/dashboard' ?
                                    (
                                        <DashboardIcon color={window.location.pathname === '/view/dashboard' ? 'primary' : 'inherit'} />
                                    ) : (
                                        <DashboardOutlinedIcon  />
                                    )
                                }
                            </ListItemIcon>
                            <ListItemText primary='Dashboard' />
                        </ListItemButton>
                    </ListItem>

                    {/* orders */}
                    <ListItem sx={{ mt: 1, color: window.location.pathname === '/view/orders' ? '#1976d2' : 'inherit' }}>
                        {
                            window.location.pathname === '/view/orders' &&
                            <Box sx={{
                                '@keyframes slide-bg': slideBg,
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                left: 0,
                                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                animation: 'slide-bg 300ms ease-in-out'
                            }} />
                        }
                        <ListItemButton sx={{ '&:hover': { background: window.location.pathname === '/view/orders' ? 'transparent' : 'rgba(0, 0, 0, 0.05)' } }} disableRipple component={Link} to='/view/orders'>
                            <ListItemIcon>
                                {
                                    window.location.pathname === '/view/orders' ? (
                                        <ShoppingCartIcon color={window.location.pathname === '/view/orders' ? 'primary' : 'inherit'} />
                                    ) : (
                                        <ShoppingCartOutlinedIcon  />
                                    )
                                }
                            </ListItemIcon>
                            <ListItemText primary='Orders' />
                        </ListItemButton>
                    </ListItem>

                    {/* workers */}
                    {
                        role === "ROLE_ADMIN" &&
                        <ListItem sx={{ mt: 1, color: window.location.pathname === '/view/workers' ? '#1976d2' : 'inherit' }}>
                            {
                                    window.location.pathname === '/view/workers' &&
                                <Box sx={{
                                    '@keyframes slide-bg': slideBg,
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    left: 0,
                                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                    animation: 'slide-bg 300ms ease-in-out'
                                }} />
                            }
                            <ListItemButton sx={{ '&:hover': { background: window.location.pathname === '/view/workers' ? 'transparent' : 'rgba(0, 0, 0, 0.05)' } }} disableRipple component={Link} to='/view/workers'>
                                <ListItemIcon>
                                    {
                                        window.location.pathname === '/view/workers' ? (
                                            <EngineeringIcon color={window.location.pathname === '/view/workers' ? 'primary' : 'inherit'} />
                                        ) : (
                                            <EngineeringOutlinedIcon  />
                                        )
                                    }
                                </ListItemIcon>
                                    <ListItemText primary='Workers' />
                            </ListItemButton>
                        </ListItem>
                    }

                    {/* users */}
                    <ListItem sx={{ mt: 1, color: window.location.pathname === '/view/customers' ? '#1976d2' : 'inherit' }}>
                        {
                            window.location.pathname === '/view/customers' &&
                            <Box sx={{
                                '@keyframes slide-bg': slideBg,
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                left: 0,
                                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                animation: 'slide-bg 300ms ease-in-out'
                            }} />
                        }
                        <ListItemButton sx={{ '&:hover': { background: window.location.pathname === '/view/customers' ? 'transparent' : 'rgba(0, 0, 0, 0.05)' } }} disableRipple component={Link} to='/view/customers'>
                            <ListItemIcon>
                                {
                                    window.location.pathname === '/view/customers' ? (
                                        <GroupIcon color={window.location.pathname === '/view/customers' ? 'primary' : 'inherit'} />
                                    ) : (
                                        <GroupOutlinedIcon  />
                                    )
                                }
                            </ListItemIcon>
                            <ListItemText primary='Customers' />
                        </ListItemButton>
                    </ListItem>

                    {/* reports */}
                    {
                        role === "ROLE_ADMIN" &&
                        <ListItem sx={{ mt: 1, color: window.location.pathname === '/view/reports' ? '#1976d2' : 'inherit' }}>
                            {
                                window.location.pathname === '/view/reports' &&
                                <Box sx={{
                                    '@keyframes slide-bg': slideBg,
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    left: 0,
                                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                    animation: 'slide-bg 300ms ease-in-out'
                                }} />
                            }
                            <ListItemButton sx={{ '&:hover': { background: window.location.pathname === '/view/reports' ? 'transparent' : 'rgba(0, 0, 0, 0.05)' } }} disableRipple component={Link} to='/view/reports'>
                                    <ListItemIcon>
                                        {
                                            window.location.pathname === '/view/reports' ? (
                                                <ReportIcon color={window.location.pathname === '/view/reports' ? 'primary' : 'inherit'} />
                                            ) : (
                                                <ReportGmailerrorredIcon  />
                                            )
                                        }
                                </ListItemIcon>
                                <ListItemText primary='Report & Analytics' />
                            </ListItemButton>
                        </ListItem>
                    }
                </List>

                {/* logout */}
                <Button startIcon={<LogoutIcon />} sx={{ width: '100%', mb: 12, textTransform: 'capitalize', letterSpacing: '.15rem', color: 'red' }}
                    onClick={() => {
                        logout()
                        Cookies.remove('login-token')
                        window.location.href = '/'
                }}>Logout</Button>
            </Paper>
            <Routes>
                {/* dashboard page */}
                <Route path='dashboard' element={
                    <Dashboard logout={logout} navigate={navigate} />
                } />

                {/* orders page */}
                <Route path='orders' element={
                    <Orders logout={logout} defaultAvatar={defaultAvatar} navigate={navigate} current={current} />
                } />

                {/* customers page */}
                <Route path='customers' element={
                    <Users logout={logout} navigate={navigate} defaultAvatar={defaultAvatar} />
                } />

                {/* workers page */}
                {
                    current.role === "ROLE_ADMIN" &&
                    <>
                        <Route path='workers' element={
                            <Workers logout={logout} navigate={navigate} defaultAvatar={defaultAvatar} />
                        } />
                    

                        {/* report page */}
                        <Route path='reports' element={
                            <Reports logout={logout} />
                        } />
                    </>
                }
                <Route path='*' element={ 
                    <Suspense fallback={<CircularProgress />}>
                        <PageNotFound />
                    </Suspense>
                 } />
            </Routes>
        </Box>
    )
}
