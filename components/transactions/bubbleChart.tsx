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
        type: 'bubble',
        plotBorderWidth: 1,
    },
    title: {
        text: 'Amount of transactions by date'
    },
    xAxis: {
      title: {
        text: 'Date'
      },
      gridLineWidth: 1,
      labels: {
        format: '{value:%d-%m-%Y}',
        rotation: 45
      },
    },
    yAxis: {
      startOnTick: false,
      endOnTick: false,
      title: {
        text: 'Amount ($)'
      },
      labels: {
            format: '${value:.2f}',
            formatter: (event) => {
                return event.value.toLocaleString()
            }
        },
    },
    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th>Amount:</th><td>${point.y}</td></tr>' +
            '<tr><th>Date:</th><td>{point.x:%d-%m-%Y}</td></tr>' +
            '<tr><th>Status:</th><td>{point.status}</td></tr>',
        footerFormat: '</table>',
        followPointer: true
    },
    plotOptions: {
      series: {
          dataLabels: {
              enabled: true,
              format: '${point.y:.2f}'
          }
      }
    },
    series:[
        {
            type: "bubble",
            colorKey: "status",
            name: "PROCESSED",
            color: "green",
            data: []
        },
        {
            type: "bubble",
            colorKey: "status",
            name: "PENDING",
            color: "orange",
            data: []
        }
    ]
}

  type BubbleChartProps = { data: Array<Transaction>; };

export function BubbleChart({data}: BubbleChartProps) {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    React.useEffect(() => {  
        const groups = groupBy(data, 'status');
     
        chartComponentRef.current?.chart.series.forEach( (g: any) => {
            g.setData(
                groups[g.name] ?
                groups[g.name].map( (_: any) => {
                        const date2 = new Date(_.value_date)
                        return {
                            x: date2.getTime(),
                            y: _.amount,
                            z: _.amount,
                            status: _.status,
                            date: date2.toLocaleDateString()
                        }
                    })
                
                : []
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
