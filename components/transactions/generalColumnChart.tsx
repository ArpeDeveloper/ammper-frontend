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
        text: 'Inflow vs outflow',
    },
    xAxis: {
        categories: ['Total'],
        crosshair: true,
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

  type GeneralColumnChartProps = { data: Array<Transaction>; };

export function GeneralColumnChart({data}: GeneralColumnChartProps) {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    React.useEffect(() => {  
        const groups = groupBy(data, 'type');
     
        chartComponentRef.current?.chart.series.forEach( (s: any) => {
            let total = 0
            groups[s.name.toUpperCase()]?.forEach( (_: any) => {
                total +=  _.amount
            })
            s.setData([total])
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
