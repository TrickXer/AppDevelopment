import React from 'react'
import { Alert, IconButton, Slide } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

export default function AlertBox(props) {
    

    return (
        <Slide direction='left' in={props.alert} mountOnEnter unmountOnExit>
            <Alert sx={{ position: 'absolute', zIndex: 1, top: '64px', right: 0, margin: '2em', width: '30em' }} severity='error'
                action={
                    <IconButton size='small' onClick={() => props.setAlert(false)}>
                        <CloseIcon fontSize='small' />
                    </IconButton>
                }        
            >
                Wrong credentials! Please try again.
            </Alert>
        </Slide>
    )
}
