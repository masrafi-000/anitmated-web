"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useVerifyOtp, useForgotPassword } from "@/hooks/use-auth"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { toast } from "sonner"

const formSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP must be at least 6 characters.",
  }),
})

function VerifyOtpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const mutation = useVerifyOtp()
  const resendMutation = useForgotPassword()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!email) {
      toast.error("Email not found. Please try requesting OTP again.")
      return
    }

    mutation.mutate({ email, otp: values.otp }, {
      onSuccess: () => {
        toast.success("Verification code verified successfully")
        router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(values.otp)}`)
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong")
      },
    })
  }

  const handleResend = () => {
    if (!email) {
      toast.error("Email not found. Please try requesting OTP again.")
      return
    }

    resendMutation.mutate({ email }, {
      onSuccess: () => {
        toast.success("New verification code sent!")
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong")
      },
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify OTP</CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to {email ? <span className="font-semibold">{email}</span> : "your email"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123456" 
                        maxLength={6} 
                        className="text-center tracking-widest text-lg"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={mutation.isPending}>
                {mutation.isPending ? "Verifying..." : "Verify"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            <div className="text-sm text-center text-muted-foreground">
                Didn&apos;t receive a code?{" "}
                <button 
                  type="button" 
                  className="text-primary hover:underline underline-offset-4 disabled:opacity-50" 
                  onClick={handleResend}
                  disabled={resendMutation.isPending}
                >
                    {resendMutation.isPending ? "Resending..." : "Resend"}
                </button>
            </div>
            <Link href="/login" className="text-sm text-center text-muted-foreground hover:text-primary underline underline-offset-4">
                Back to Login
            </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading...</div>}>
      <VerifyOtpForm />
    </Suspense>
  )
}
