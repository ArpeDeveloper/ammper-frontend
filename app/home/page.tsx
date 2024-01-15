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
import { Payment, columns } from "@/components/transactions/columns"
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

const linkId = window.localStorage.getItem('linkId')

export default function Home() {
    const [dateFrom, setDateFrom] = useState('2023-12-01')
    const [dateTo, setDateTo] = useState('2024-01-14')
    const apiLink = ApiLink(linkId)
    let apiAccounts = ApiAccounts(apiLink.linkId ? apiLink.linkId : '')
    const apiTransactions = ApiTransactions(apiLink.linkId ? apiLink.linkId : '', apiAccounts.data?.find(Boolean)?.id, dateFrom, dateTo)
    
    return (
      <main className="grid gap-4 grid-cols-1 md:grid-cols-5 text-black p-8">
        <div className="px-14 col-span-2" >
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

          <Separator className="my-4" />

          <DataTable columns={columns} data={apiTransactions.data ? apiTransactions.data : []} />
        </div>
        
        <div className="col-span-3 flex">
          <Separator orientation="vertical" />
          <Accordion className="px-6 w-full" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                  <BubbleChart data={apiTransactions.data ? apiTransactions.data : []}></BubbleChart>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    )
  }
  