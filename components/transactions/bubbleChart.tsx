"use client"

import More from 'highcharts/highcharts-more'
import Highcharts from 'highcharts'
More(Highcharts)
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { useRef } from 'react'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
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
        format: '{value:%Y-%m-%d}'
      },
    },
    yAxis: {
      startOnTick: false,
      endOnTick: false,
      title: {
        text: 'Amount ($)'
      },
      labels: {
            format: '${value:.2f}'
        },
    },
    plotOptions: {
      series: {
          dataLabels: {
              enabled: true,
              format: '${point.y:.2f}'
          }
      }
    },
}

export function BubbleChart(data: any) {
    options.series = [{
        type: "bubble",
        colorKey: 'status',
        //data: [{x:2, y:198, z:198, status:'PENDING'}]
        data: data.data.map( (_: any) => {
            const date2 = new Date(_.accounting_date.substr(0,_.accounting_date.indexOf('T')))
            return {
                x: date2.getTime(),
                y: _.amount,
                z: _.amount,
                email: _.merchant.name,
                date: date2.toLocaleDateString()
            }
        })
      },
    ]
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
        />
    )
}
