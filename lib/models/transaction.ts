export type Transaction = {
    id: string
    amount: number
    status: "PENDING" | "PROCESSED"
    accounting_date: string,
    category: string,
  }