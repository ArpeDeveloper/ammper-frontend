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
import { ApiLink } from "@/lib/services/links"
import { ApiAccounts } from "@/lib/services/accounts"



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

function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edf52f",
      amount: 200,
      status: "pending",
      email: "m@example.com",
    },
  ]
}

export default function Home() {
    const apiLink = ApiLink()
    const apiAccounts = ApiAccounts(apiLink.linkId ? apiLink.linkId : '')
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const data = getData()
    return (
      <main className="grid gap-4 grid-cols-1 md:grid-cols-5 text-black p-8">
        <div className="px-14 col-span-2" >
          <Carousel className="h-60 ">
            <CarouselContent className="h-60 ">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem className="h-60 grid " key={index}>
                    <Card className="place-self-center	 w-11/12 shadow-md rounded-xl flex aspect-[2/1] bg-gradient-to-r from-orange-100 from-5% to-orange-600 to-95%">
                      <CardContent className="flex items-center justify-center p-6 ">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="shadow-md hover:bg-orange-300 hover:text-white hover:border-none" />
            <CarouselNext className="shadow-md hover:bg-orange-300 hover:text-white hover:border-none" />
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
  