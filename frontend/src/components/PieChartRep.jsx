import { Paper } from '@mui/material'
import { PieChart } from '@mui/x-charts'
import React from 'react'

export default function PieChartRep({ sx }) {
    

    return (
        <Paper sx={sx} elevation={3}>
            <PieChart
                series={[
                    {
                        data: [
                            {
                                id: 1,
                                value: 25,
                                label: 'Wage'
                            },
                            {
                                id: 1,
                                value: 35,
                                label: 'Expense'
                            }
                        ],
                        innerRadius: 1,
                        outerRadius: 100,
                        paddingAngle: 0,
                        cornerRadius: 5,
                        startAngle: 0,
                        endAngle: 360,
                    }
                ]}
            />
        </Paper>
    )
}
