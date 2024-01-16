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
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Expenses by categories',
        align: 'left'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series:[
        {
            type: 'pie',
            name: 'Categories',
            colorKey: 'category',
            data: []
        }
    ]
}


  type PieChartProps = { data: Array<Transaction>; };

export function PieChart({data}: PieChartProps) {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    React.useEffect(() => {
        let totalOutflow = 0
        data.forEach( (_: any) => {
            totalOutflow += _.type.toLowerCase() == 'outflow' ? _.amount : 0
        })

        const groups = groupBy(data, 'category');
        const categories = Object.keys(groups).sort()

        const series = categories.map((c: string) => {
            let total = 0
            groups[c].forEach( (_: any) => {
                total += _.type.toLowerCase() == 'outflow' ? _.amount : 0
            })
            const percentage = total * 100 / totalOutflow
            return {
                name: c,
                y: percentage
            }
        })
     
        chartComponentRef.current?.chart.series[0].setData(series)
      }, [data])

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
        />
    )
}
