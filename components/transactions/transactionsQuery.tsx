"use client"

import React, { useEffect, useState } from "react" 
import { ApiTransactions } from "@/lib/services/transactions"
import { DateRange } from "react-day-picker"
import Loading from "@/app/home/loading"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "@heroicons/react/24/solid"
import { Calendar } from "../ui/calendar"
import { Transaction } from "@/lib/models/transaction"
import moment from 'moment'; 

type TransactionsQueryProps = { 
    linkId: string | null; 
    accountId: string | null; 
    loadTransactions: (transactions: Transaction[]) => void;
};

export default function TransactionsQuery({linkId, accountId, loadTransactions}: TransactionsQueryProps) {
    const todayDate = new Date()
    const date3MonthsBefore = new Date()
    date3MonthsBefore.setMonth(date3MonthsBefore.getMonth() - 3);
    const [dateRange, setDateRange] = useState<DateRange>({from: date3MonthsBefore, to: todayDate})
  
    const apiTransactions = ApiTransactions(
        linkId, 
        accountId, 
        moment(dateRange.from ? dateRange.from : date3MonthsBefore).format('YYYY-MM-DD'), 
        moment(dateRange.to ? dateRange.to : todayDate).format('YYYY-MM-DD'),
    )


    useEffect(() => {  
        loadTransactions(apiTransactions.data)
    }, [apiTransactions.data])
    
    return (
        <div className="flex items-center pb-4" >
          {
            apiTransactions.data ? 
            (
                <Popover>
                  <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !dateRange.from && !dateRange.to && "text-muted-foreground"
                        )}
                      >
                        {dateRange.from && dateRange.to ? (
                          format(dateRange.from, "PPP") + '-' + format(dateRange.to, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(e) => e ? setDateRange(e) : {} }
                      min={3}
                      max={90}
                    />
                  </PopoverContent>
                </Popover>
            )
            : (<div className="h-full w-full"><Loading textLoading="Loading filters..." /></div>)
          }
        </div>
    )
  }
  