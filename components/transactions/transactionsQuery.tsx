"use client"

import React, { useEffect, useState } from "react" 
import { ApiTransactions } from "@/lib/services/transactions"
import { DateRange } from "react-day-picker"
import Loading from "@/app/home/loading"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn, groupBy } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "@heroicons/react/24/solid"
import { Calendar } from "../ui/calendar"
import { Transaction } from "@/lib/models/transaction"
import moment from 'moment'; 
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Category } from "@/lib/models/category"

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
    const [categories, setCategories] = useState<Category[]>([])
    let dataTransactions: Transaction[] = []
  
    const apiTransactions = ApiTransactions(
        linkId, 
        accountId, 
        moment(dateRange.from ? dateRange.from : date3MonthsBefore).format('YYYY-MM-DD'), 
        moment(dateRange.to ? dateRange.to : todayDate).format('YYYY-MM-DD'),
    )

    const selectCategory = (key: string, value: boolean) =>{
        const cat: Category[] = categories.map((c) =>  key == c.id ? {id: c.id, name: c.name, selected: value} : c)
        setCategories(cat)
        filterTransactions(apiTransactions.data, cat)
    }

    const filterTransactions = (t: Transaction[], cat: Category[]) =>{
        const selectedCategories = cat.filter(c => c.selected)
        const filteredTransactions = t.filter(
          _ => selectedCategories.findIndex(c => c.id == (_.category ? _.category.toLowerCase() : "null")) > -1
        )
        dataTransactions = filteredTransactions
        loadTransactions(dataTransactions)
    }

    useEffect(() => {  
        
        if(apiTransactions.data)
        {
            const dataCopy = apiTransactions.data.sort((a: Transaction,b: Transaction) => b.value_date > a.value_date).map((d: Transaction) => d)
            dataTransactions = dataCopy
            const groups = groupBy(dataCopy, 'category')
            const cat: Category[] = Object.keys(groups).sort().map((c) => {
                    const categoryName = c == "null" ? "Other" : c
                    const cat = categories.find(ca => ca.id == c.toLowerCase())
                    return {id: c.toLowerCase(), name: categoryName, selected: cat ? cat.selected : true}
                })
            setCategories(cat)
            filterTransactions(dataCopy, cat)
        }
    }, [apiTransactions.data])
    
    return (
        <div className="flex items-center pb-4" >
          {
            apiTransactions.data ? 
            (<div className="flex flex-col gap-4 w-full">
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild >
                        <Button variant="outline" className="ml-auto">
                        Categories
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {categories
                        .map((c) => {
                            return (
                            <DropdownMenuCheckboxItem
                                key={c.id}
                                className="capitalize"
                                checked={c.selected}
                                onCheckedChange={(value) =>
                                    selectCategory(c.id,!!value)
                                }
                            >
                                {c.name}
                            </DropdownMenuCheckboxItem>
                            )
                        })}
                    </DropdownMenuContent>
                    </DropdownMenu>
            </div>
            )
            : (<div className="h-full w-full"><Loading textLoading="Loading filters..." /></div>)
          }
        </div>
    )
  }
  