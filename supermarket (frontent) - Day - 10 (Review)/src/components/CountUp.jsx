import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'

export default function CountUp({ end }) {
    
    const [num, setNum] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            num !== end && setNum(seconds => seconds + 1)
        }, ((end - num) < 5) ? ((6-(end-num) )*50) : 50)

        return () => clearInterval(interval)
    }, [end, num])

    return (
        <Typography>{ num }</Typography>
    )
}
