"use client"

import { Transaction } from "@/lib/models/transaction"
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
    accessorKey: "accounting_date",
    header: "Date",
    cell: ({ row }) => {
      const value: string = row.getValue("accounting_date")
      return <div className="text-left font-medium">{moment(value).format('DD-MM-YYYY')}</div>
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
