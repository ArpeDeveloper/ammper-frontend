"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: string
  amount: number
  status: "PENDING" | "PROCESSED"
  accounting_date: string,
  category: string,
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value: string = row.getValue("status")
 
      return value == 'PENDING'
        ? <div className="text-orange-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></div>
        : <div className="text-green-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></div>
    },
  },
  {
    accessorKey: "accounting_date",
    header: "Date",
    cell: ({ row }) => {
      const value: string = row.getValue("accounting_date")
      const date = new Date(value.substring(0,value.indexOf('T')))
 
      return <div className="text-left font-medium">{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]
