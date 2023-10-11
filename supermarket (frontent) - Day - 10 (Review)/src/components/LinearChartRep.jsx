import { Paper } from '@mui/material'
import { LineChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'

export default function LinearChartRep({ sx }) {

    return (
        <Paper sx={sx} elevation={3}>
            <LineChart
                sx={{
                    boxSizing: 'border-box'
                }}
                series={[
                    {
                        curve: 'natural',
                        data: [0, 5, 2, 6, 3, 9.3, 5, 8, 4, 3]
                    }
                ]}
            />
        </Paper>
    )
}
