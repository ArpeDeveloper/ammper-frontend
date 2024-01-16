"use client"

import More from 'highcharts/highcharts-more'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { useRef } from 'react'
import React from 'react'
import { Transaction } from '@/lib/models/transaction'
import { groupBy } from '@/lib/utils'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
    More(Highcharts)
}

const options: Highcharts.Options = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Inflow vs outflow by categories',
    },
    xAxis: {
        categories: [],
        crosshair: true,
        accessibility: {
            description: 'Categories'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Amount ($)'
        },
        labels: {
            format: '${value:.2f}',
            formatter: (event) => {
                return "$" + event.value.toLocaleString()
            }
        },
    },
    tooltip: {
        valueDecimals: 2,
        valuePrefix: '$'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series:[
        {
            type: 'column',
            name: 'Inflow',
            color: 'green',
            data: []
        },
        {
            type: 'column',
            name: 'Outflow',
            color: 'red',
            data: []
        }
    ]
}

  type ColumnChartProps = { data: Array<Transaction>; };

export function ColumnChart({data}: ColumnChartProps) {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    React.useEffect(() => {  
        const groups = groupBy(data, 'category');
        const categories = Object.keys(groups).sort()
        chartComponentRef.current?.chart.update({
            xAxis: {
                categories: categories,
                crosshair: true,
                accessibility: {
                    description: 'Categories'
                }
            }
        }, false)
     
        chartComponentRef.current?.chart.series.forEach( (g: any) => {
            const data = categories.map((c: string) => {
                let total = 0
                groups[c].forEach( (_: any) => {
                    total += _.type.toLowerCase() == g.name.toLowerCase() ? _.amount : 0
                })
                return total
            })
            g.setData(
                data
            )
        })
      }, [data])

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
        />
    )
}
