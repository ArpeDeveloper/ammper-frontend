"use client"

import More from 'highcharts/highcharts-more'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { useRef } from 'react'

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
            '<tr><th>Date:</th><td>{point.x:%Y-%m-%d}</td></tr>' +
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
}

export function BubbleChart(data: any) {
    const groups = Object.groupBy(data.data, (e: { status: string }) => e.status);
    let series = Array()
     
        Object.keys(groups).forEach( (g: any) => {
            series.push(
             {
                type: "bubble",
                colorKey: 'status',
                name: g,
                color: g == "PROCESSED" ? "green" : "orange",
                data: groups[g].map( (_: any) => {
                        const date2 = new Date(_.accounting_date.substr(0,_.accounting_date.indexOf('T')))
                        return {
                            x: date2.getTime(),
                            y: _.amount,
                            z: _.amount,
                            status: _.status,
                            date: date2.toLocaleDateString()
                        }
                    })
            })
      })
    options.series = series
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
        />
    )
}
