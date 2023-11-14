import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Backdrop, Box, Button, Divider, IconButton, TextField, Tooltip, Typography, createTheme } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { fetchWorkers } from '../store/reducer';
import { addWorker, deleteWorker } from '../api/axiosRequests.mjs';

export default function Workers({ defaultAvatar, logout }) {

    // const [expanded, setExpanded] = useState(false)

    // const handleChange = (panel) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // }

    const [open, setOpen] = useState(false)

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [contact, setContact] = useState(null)
    const [password, setPassword] = useState(null)
    const [salary, setSalary] = useState(0)
    const [gender, setGender] = useState(null)

    const [addLoading, setAddLoading] = useState(false)

    const workers = useSelector((state) => state.store.workers)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchWorkers())
    }, [open])

    const handleDeleteWorker = (worker) => {
        const uuid = worker.workerId
        deleteWorker(uuid).then((response) => {
            if (response.status === 200) {
                window.location.reload()
            }
        })
    }
    const handleSubmit = () => {
        setAddLoading(true)

        addWorker({
            workerName: name,
            workerEmail: email,
            workerContact: parseInt(contact),
            workerPassword: password,
            workerSalary: parseInt(salary),
            isWorkerInDuty: false,
            workerGender: gender,
            role: "ROLE_WORKER"
        }).then((response) => {
            if (response.status === 200) {
                setAddLoading(false)
                setOpen(false)
            }
        })
    }

    return (
            <Box sx={{ height: '100%', flex: '1 1 auto', ml: 3, mr: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h4' fontFamily='monospace' sx={{ mt: 3, letterSpacing: '0.1rem', fontWeight: 600 }}>Workers</Typography>
                    <Button onClick={() => setOpen(true)} sx={{ mt: 5, ml: 4 }} variant='contained' startIcon={<PersonAddIcon />}>Add Worker</Button>
                </Box>

                <Backdrop
                    sx={{ zIndex: 1 }}
                    open={open}
                >
                    <Box sx={{ backgroundColor: 'white', borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Tooltip title='close'>
                                <IconButton sx={{ '&:hover': { color: 'red' } }} onClick={() => setOpen(false)}>
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <img src={defaultAvatar} style={{ width: 540, flex: 1, padding: '40px', paddingTop: 0 }} alt='user-avatar' />
                            <Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: 5, pt: 3, pb: 3 }}>
                                    <TextField onChange={(e) => setName(e.target.value)} size='small' type='text' id='worker-name' label='Name' required />
                                    <TextField onChange={(e) => setGender(e.target.value)} size='small' type='text' id='worker-gender' label='Gender' required />
                                    <TextField onChange={(e) => setEmail(e.target.value)} size='small' type='text' id='worker-email' label='Email ID' required />
                                    <TextField onChange={(e) => setContact(e.target.value)} size='small' type='text' id='worker-contact' label='Contact' required />
                                    <TextField onChange={(e) => setPassword(e.target.value)} size='small' type='text' id='worker-password' label='Password' required />
                                    <TextField onChange={(e) => setSalary(e.target.value)} size='small' type='number' id='worker-salary' label='Salary' required />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 3 }}>
                                    <Button variant='contained' onClick={handleSubmit} >
                                        {addLoading ? 'Loading...' : 'Add'}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Backdrop>

                <Box sx={{ mt: 8, overflowY: 'scroll', maxHeight: '700px' }}>
                    {
                        workers.workers.map((worker, id) => (
                            <Accordion elevation={0} disableGutters sx={{ mb: 1 }} key={id} >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                // aria-controls={`panel${id}bh-content`}
                                // id={`panel${id}bh-header`}
                                >

                                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '33%', flexShrink: 0 }}>
                                        <Avatar src={defaultAvatar} />
                                        {worker.workerName}
                                    </Typography>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography color={worker.isWorkerInDuty ? 'green' : 'red'}>{worker.isWorkerInDuty ? 'In Duty' : 'Off Duty'}</Typography>
                                        <Typography sx={{ mr: 32, color: 'text.secondary' }} >{worker.isWorkerInDuty ? `Logged in at: ${worker.workerTime}` : `Logged out at: ${worker.workerTime}`}</Typography>
                                    </Box>
                                </AccordionSummary>
                                <Divider />
                                <AccordionDetails>
                                    <Box sx={{ display: 'flex', gap: 10 }}>
                                        <img style={{ width: 300, height: 320 }} src={defaultAvatar} alt='avatar' />
                                        <Box>
                                            <Typography sx={{ display: 'flex', gap: 3, mr: 2, ml: 2, mt: 1, mb: 1 }} fontWeight={600} letterSpacing='.1rem'>Name:
                                                <Typography fontWeight={500} letterSpacing='.05rem'>{worker.workerName}</Typography>
                                            </Typography>
                                            <Typography sx={{ display: 'flex', gap: 3, mr: 2, ml: 2, mt: 1, mb: 1 }} fontWeight={600} letterSpacing='.1rem'>Email-ID:
                                                <Typography fontWeight={500} letterSpacing='.05rem'>{worker.workerEmail}</Typography>
                                            </Typography>
                                            <Typography sx={{ display: 'flex', gap: 3, mr: 2, ml: 2, mt: 1, mb: 1 }} fontWeight={600} letterSpacing='.1rem'>Contact:
                                                <Typography fontWeight={500} letterSpacing='.05rem'>{worker.workerContact}</Typography>
                                            </Typography>
                                            <Typography sx={{ display: 'flex', gap: 3, mr: 2, ml: 2, mt: 1, mb: 1 }} fontWeight={600} letterSpacing='.1rem'>Gender:
                                                <Typography fontWeight={500} letterSpacing='.05rem'>{worker.workerGender === 'M' ? 'Male' : 'Female'}</Typography>
                                            </Typography>
                                            <Typography sx={{ display: 'flex', gap: 3, mr: 2, ml: 2, mt: 1, mb: 1 }} fontWeight={600} letterSpacing='.1rem'>Salary:
                                                <Typography fontWeight={500} letterSpacing='.05rem'>{`₹ ${worker.workerSalary}`}</Typography>
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Button onClick={() => handleDeleteWorker(worker)} variant='outlined' color='error' endIcon={<DeleteIcon />}>delete</Button>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                </Box>
            </Box>
    )
}
