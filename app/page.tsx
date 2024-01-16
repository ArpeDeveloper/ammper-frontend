"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ApiLink } from "@/lib/services/links"
import { ArrowPathIcon, UserCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline'

let isLoading = false
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
})

export default function Login() {
  const apiLink = ApiLink(null)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "bnk100",
      password: "full",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    isLoading = true
    
    const data = {
        institution: "erebor_mx_retail",
        username: values.username,
        password: values.password,
        external_id: "security-testing",
        access_mode: "single"
    }
    apiLink.createLink(data).finally(() => { isLoading = false})
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="text-center w-full py-8">
          Login with your credentials
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 min-w-96">
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute pl-2 pt-2">
              <span className="text-gray-500 sm:text-sm">
                <UserCircleIcon className="w-6 h-6"/>
              </span>
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className='w-full pl-9' placeholder="user" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute pl-2 pt-2">
              <span className="text-gray-500 sm:text-sm">
                <LockClosedIcon className="w-6 h-6"/>
              </span>
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className='w-full pl-9' type='password' placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={apiLink.isLoading} type="submit" className="py-2 px-4 w-full bg-orange-300 hover:bg-orange-500 text-white font-bold rounded-full">
            {apiLink.isLoading ? <ArrowPathIcon className=" animate-spin w-full h-6"/> : "Login"}
          </Button>
        </form>
      </Form>      
    </main>
  )
}
