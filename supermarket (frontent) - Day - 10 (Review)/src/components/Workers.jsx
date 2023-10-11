import React, { useEffect, useState } from 'react'
import SidePanel from './SidePanel'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Divider, Typography, createTheme } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkers } from '../store/reducer';

export default function Workers({ defaultAvatar, logout }) {

    // const [expanded, setExpanded] = useState(false)

    // const handleChange = (panel) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // }
    const current = useSelector((state) => state.store.current)
    const workers = useSelector((state) => state.store.workers)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchWorkers())
    }, [])

    const handleDeleteWorker = (worker) => {
        const uuid = worker.workerId
        console.log(uuid)
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', backgroundColor: '#ECECEC' }}>
            <SidePanel logout={logout} role={current.role} />
            <Box sx={{ height: '100%', flex: '1 1 auto' }}>
                <Button sx={{ mt: 5, ml: 4 }} variant='contained' startIcon={<PersonAddIcon />}>Add Worker</Button>

                <Box sx={{ mt: 8, ml: 3, mr: 3, overflowY: 'scroll', maxHeight: '700px' }}>
                    {
                        workers.workers.map((worker, id) => (
                            <Accordion key={id} >
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
                                        <img style={{ width: 320, height: 320 }} src={defaultAvatar} alt='avatar' />
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
                                                <Typography fontWeight={500} letterSpacing='.05rem'>{ worker.workerGender === 'M' ? 'Male' : 'Female' }</Typography>
                                            </Typography>
                                            <Typography sx={{ display: 'flex', gap: 3, mr: 2, ml: 2, mt: 1, mb: 1 }} fontWeight={600} letterSpacing='.1rem'>Salary:
                                                <Typography fontWeight={500} letterSpacing='.05rem'>{`₹ ${worker.workerSalary}` }</Typography>
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
        </Box>
    )
}
