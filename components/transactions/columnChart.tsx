"use client"

import More from 'highcharts/highcharts-more'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { useRef } from 'react'
import React from 'react'
import { Transaction } from '@/lib/models/transaction'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
    More(Highcharts)
}

const options: Highcharts.Options = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Inflow vs outflow transactions by categories',
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

function groupBy<T>(collection:T[],key: keyof T){
    const groupedResult =  collection.reduce((previous,current)=>{
 
    if(!previous[current[key]]){
      previous[current[key]] = [] as T[];
     }
 
    previous[current[key]].push(current);
           return previous;
    },{} as any); // tried to figure this out, help!!!!!
      return groupedResult
  }

  type ColumnChartProps = { data: Array<Transaction>; };

export function ColumnChart({data}: ColumnChartProps) {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    React.useEffect(() => {  
        const groups = groupBy(data, 'category');
        const categories = Object.keys(groups)
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
                    console.log()
                    total += _.type.toLowerCase() == g.name.toLowerCase() ? _.amount : 0
                })
                return total
            })
            console.log(data)
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
