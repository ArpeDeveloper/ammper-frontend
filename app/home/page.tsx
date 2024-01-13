"use client"

import React, { useRef } from "react" 
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { Payment, columns } from "@/components/transactions/columns"
import { DataTable } from "@/components/transactions/transactionsTable"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

const options: Highcharts.Options = {
  title: {
      text: 'My chart'
  },
  series: [{
      type: 'line',
      data: [1, 2, 3]
  }]
};

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function Home() {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const data = await getData()
    return (
      <main className="grid gap-4 grid-cols-1 md:grid-cols-5 text-black p-8">
        <div className="px-14 col-span-2" >
          <Carousel >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                    <Card>
                      <CardContent className="flex aspect-[2/1] items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <Separator className="my-4" />

          <DataTable columns={columns} data={data} />
        </div>
        
        <div className="col-span-3 flex">
          <Separator orientation="vertical" />
          <Accordion className="px-6 w-full" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
                  ref={chartComponentRef}
                />

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    )
  }
  