"use client"

import React, { useEffect, useState } from "react" 
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { columns } from "@/components/transactions/columns"
import { DataTable } from "@/components/transactions/transactionsTable"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { ApiLink } from "@/lib/services/links"
import { ApiAccounts } from "@/lib/services/accounts"
import { ApiTransactions } from "@/lib/services/transactions"
import { BubbleChart } from "@/components/transactions/bubbleChart"
import Loading from "./loading"

export default function Home() {
    let linkId = null
    if (typeof window !== 'undefined') {
      linkId = window.localStorage.getItem('linkId')
    }
    const [dateFrom, setDateFrom] = useState('2023-11-01')
    const [dateTo, setDateTo] = useState('2024-01-15')
    const apiLink = ApiLink(linkId)
    let apiAccounts = ApiAccounts(apiLink.linkId ? apiLink.linkId : '')
    const apiTransactions = ApiTransactions(apiLink.linkId ? apiLink.linkId : '', apiAccounts.data?.find(Boolean)?.id, dateFrom, dateTo)
    
    return (
      <main className="grid gap-4 grid-cols-1 md:grid-cols-5 text-black p-8">
        <div className="px-14 col-span-2" >

        {
        apiAccounts.data ? (
          <Carousel className="h-60 ">
            <CarouselContent className="h-60 ">
              {apiAccounts.data?.map((_: any, index: number) => (
                <CarouselItem className="h-60 grid " key={index}>
                    <Card className="place-self-center	 w-11/12 shadow-md rounded-xl flex aspect-[2/1] bg-gradient-to-r from-orange-100 from-5% to-orange-600 to-95%">
                      <CardContent className="flex p-6 ">
                        <span className="text-sm font-semibold">${_.balance.available?.toLocaleString()}</span>
                      </CardContent>
                    </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="shadow-md hover:bg-orange-300 hover:text-white hover:border-none" />
            <CarouselNext className="shadow-md hover:bg-orange-300 hover:text-white hover:border-none" />
          </Carousel>
        ) :
         (<div className="h-60 "><Loading textLoading="Loading accounts..." /></div>)
        }

          <Separator className="my-4" />

          {
            apiTransactions.data ? 
            (<DataTable columns={columns} data={apiTransactions.data ? apiTransactions.data : []} />)
            : (<div className="h-full "><Loading textLoading="Loading transactions..." /></div>)
          }
        </div>
        
        <div className="col-span-3 flex">
          <Separator orientation="vertical" />
          <Accordion className="px-6 w-full" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Dispersion Chart</AccordionTrigger>
              <AccordionContent>
                {
                  apiTransactions.data ? 
                  (<BubbleChart data={apiTransactions.data ? apiTransactions.data : []}></BubbleChart>)
                  : (<div className="h-60 "><Loading textLoading="Loading chart..." /></div>)
                }
                  
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    )
  }
  