import React from 'react'
import { Box } from '@mui/material'
import Page404 from '../data/images/404-page.jpg'

export default function PageNotFound(props) {
    

    return (
        <Box
            sx={{
                height: 'calc(100vh - 64px)',
                width: '100%',
                backgroundImage: `url(${Page404})`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
            }}
        />
    )
}
