import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, Box, Button, IconButton, InputAdornment, Link, Paper, TextField } from '@mui/material'

export default function Login({ user, navigate, defaultAvatar, setIsLogin }) {

    const [Visibility, setVisibility] = useState(false)

    const handleVisibility = () => {
        setVisibility(!Visibility)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)

        if (Object.keys(user).length === 0) alert('No registered user found.')
        else if ((data.get('username-email') !== user['username'] && data.get('username-email') !== user['email'])) alert('username or email not found.')
        else if (data.get('password') !== user['password']) alert('password is incorrect.')
        else {
            setIsLogin(true)
            alert('login successful')
            navigate('/')
        }
    }

    return (
        <>
            <Paper component='div' sx={{ display: 'block', padding: '4rem 3rem 3rem 3rem', overflow: 'hidden' }} elevation={3}>
                <Box sx={{ 
                    transformOrigin: '50% 100%',
                    '@keyframes rotation-intro': {
                        '0%': {
                            transform: 'rotate(90deg)'
                        },
                        '50%': {
                            transform: 'rotate(-5deg)'
                        },
                        '75%': {
                            transform: 'rotate(5deg)'
                        },
                        '100%': {
                            transform: 'rotate(0deg)'
                        }
                    },
                    animation: 'rotation-intro 0.45s ease-in-out'
                 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '2rem' }}>
                        <Avatar src={defaultAvatar} sx={{ width: 96, height: 96 }} />
                    </Box>
                    <Box component='form' sx={{ width: 400 }} onSubmit={handleSubmit}>
                        <TextField margin='normal' required fullWidth id='username-email' label='Email-ID / Username' name='username-email' autoComplete='email' autoFocus
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton>
                                        <PersonIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }} />

                        <TextField margin='normal' required fullWidth id='password' type={Visibility ? 'text' : 'password'} label='password' name='password'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={handleVisibility}>
                                            {
                                                Visibility ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link sx={{ marginTop: '1.75rem', '&:hover': { color: '#1976FA' } }} underline='hover' href='/sign-in'>Don't have an account? Sign in</Link>
                            <Button type='submit' sx={{ marginTop: '2rem' }} variant='contained'>Log in</Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </>
    )
}
