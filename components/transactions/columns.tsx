"use client"

import { Transaction } from "@/lib/models/transaction"
import { cn } from "@/lib/utils"
import { ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import { ColumnDef } from "@tanstack/react-table"
import moment from "moment"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value: string = row.getValue("status")
 
      return value == 'PENDING'
        ? <ClockIcon className="w-6 h-6 text-orange-500"/>
        : <CheckCircleIcon className="w-6 h-6 text-green-500"/>
    },
  },
  {
    accessorKey: "value_date",
    header: "Date",
    cell: ({ row }) => {
      const value: string = row.getValue("value_date")
      return <div className="text-left font-medium">{moment(value).format('DD-MM-YYYY')}</div>
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const type = row.getValue("type")
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className={cn("text-right font-medium", type == 'INFLOW' && 'text-green-500', type == 'OUTFLOW' && 'text-red-500')}>{formatted}</div>
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  }
]
