"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ForgotSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotFormValues = z.infer<typeof ForgotSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(ForgotSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: ForgotFormValues) {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Error sending reset email.");
      return;
    }

    setSubmitted(true);
    toast.success("Check your email to reset password.");
  }

  return (
    <>
      <Toaster />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Card className="p-6">
            {!submitted ? (
              <>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mail className="text-blue-600" />
                  <h2 className="text-xl font-semibold">Forgot Password</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <Input {...register("email")} placeholder="you@domain.com" />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </>
            ) : (
              <p className="text-center text-gray-700">
                ✅ Check your email for a reset link.
              </p>
            )}
          </Card>
        </motion.div>
      </main>
    </>
  );
}
