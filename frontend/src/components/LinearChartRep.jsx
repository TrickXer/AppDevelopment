import { CircularProgress, Paper, Typography } from '@mui/material'
import { BarChart, LineChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'

export default function LinearChartRep({ datas, sx, elevation }) {
    let sales = datas.sales
    const keys = sales !== undefined && Object.keys(sales)
    const sale = []
    
    if (sales !== undefined) {
        keys.map((e) => {
            sale.push({
                month: e,
                sold: sales[e]
            })
        })
    }

    console.log(sales)

    return (
        <Paper sx={sx} elevation={elevation ? 3 : 1}>
            {
                (sales !== undefined && keys.length !== 0) ? (
                    <BarChart
                        sx={{
                            transition: 'all 300ms ease-in-out'
                        }}
                        dataset={sale}
                        xAxis={[{ scaleType: 'band', dataKey: 'month', label: 'Months' }]}
                        series={[{ dataKey: 'sold', label: 'Sold', color: '#89c4f4' }]}
                        yAxis={[{ label: 'No.of product sold' }]}
                        // {...chartSetting}
                    />
                ) : (
                    <Typography>No data found</Typography>
                )
            }
        </Paper>
    )
}
