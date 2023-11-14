import React from 'react'
import { Box, Paper } from '@mui/material'
import { BarChart } from '@mui/x-charts'
import noDataFound from '../data/images/no-data-found.jpg'

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
                    // <img style={{ objectFit: 'contain', objectPosition: 'center' }} src={noDataFound} alt='no-data-found.jpg' />
                    <Box sx={{ height: '100%', width: '100%', backgroundImage: `url(${noDataFound})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                )
            }
        </Paper>
    )
}
