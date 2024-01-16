"use client"

import React, { useEffect, useState } from "react" 
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
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
import { Transaction } from "@/lib/models/transaction"
import TransactionsQuery from "@/components/transactions/transactionsQuery"
import { ColumnChart } from "@/components/transactions/columnChart"

export default function Home() {
    let linkId = null
    if (typeof window !== 'undefined') {
      linkId = window.localStorage.getItem('linkId')
    }
    const [accountIdIndex, setAccountIdIndex] = useState(0)
    const [accountId, setAccountId] = useState(null)
    const [transactions, setTransactions] = useState<Array<Transaction> | undefined>(undefined)
    ApiLink(linkId)
    let apiAccounts = ApiAccounts(linkId)
    const [api, setApi] = useState<CarouselApi>()
 
    useEffect(() => {
      if (!api) {
        return
      }
  
      api.on("select", (event) => {
        const accountIndex = event.selectedScrollSnap()
        setAccountIdIndex(accountIndex)
      })
    }, [api])

    useEffect(() => {  
        setAccountId(apiAccounts.data?.find((e:any,i:number) => i == accountIdIndex)?.id)
    }, [apiAccounts.data, accountIdIndex])
    
    return (
      <main className="grid gap-4 grid-cols-1 md:grid-cols-5 text-black p-8">
        <div className="px-14 col-span-2" >

        {
        apiAccounts.data ? (
          <Carousel className="h-60 " setApi={setApi}>
            <CarouselContent className="h-60 ">
              {apiAccounts.data?.map((_: any, index: number) => (
                <CarouselItem className="h-60 grid " key={index}>
                    <Card className="place-self-center	 w-11/12 shadow-md rounded-xl flex aspect-[2/1] bg-gradient-to-r from-orange-100 from-5% to-orange-600 to-95%">
                      <CardContent className="flex p-6 w-full">
                      <div className="flex flex-col w-full h-full justify-center">
                          <span className="text-sm ">{_.name}</span>
                          <span className="text-sm font-semibold">{_.number}</span>
                        
                          <span className="text-sm self-end ">Balance</span>
                          <span className="text-sm font-semibold self-end ">${_.balance.available?.toLocaleString()}</span>
                        </div>
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

          <TransactionsQuery linkId={linkId} accountId={accountId} loadTransactions={setTransactions}></TransactionsQuery>

          {
            transactions ? 
            (<DataTable columns={columns} data={transactions ? transactions : []} />)
            : (<div className="h-full "><Loading textLoading="Loading transactions..." /></div>)
          }
        </div>
        
        <div className="col-span-3 flex">
          <Separator orientation="vertical" />
          <Accordion className="px-6 w-full" type="single" collapsible defaultValue='item-1'>
            <AccordionItem value="item-1">
              <AccordionTrigger>Dispersion Diagram</AccordionTrigger>
              <AccordionContent>
                {
                  transactions ? 
                  (<BubbleChart data={transactions ? transactions : []}></BubbleChart>)
                  : (<div className="h-60 "><Loading textLoading="Loading chart..." /></div>)
                }
                  
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Comparative Histogram</AccordionTrigger>
              <AccordionContent>
                {
                  transactions ? 
                  (<ColumnChart data={transactions ? transactions : []}></ColumnChart>)
                  : (<div className="h-60 "><Loading textLoading="Loading chart..." /></div>)
                }
                  
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    )
  }
  