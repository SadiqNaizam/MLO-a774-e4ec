import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from "sonner";
import { KeyRound, AlertCircle } from 'lucide-react';

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmNewPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match.",
  path: ["confirmNewPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Example: how to get token from URL
  const [resetError, setResetError] = React.useState<string | null>(null);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    console.log('ResetPasswordPage form submitted:', data, "Token:", token);
    setResetError(null);
    // Simulate API call
    // In a real app, you'd send 'token' and 'newPassword' to the backend
    if (!token) {
        setResetError("Invalid or missing reset token.");
        toast.error("Reset Failed", { description: "Invalid or missing reset token." });
        return;
    }
    toast.success("Password Reset Successful!", { description: "You can now log in with your new password." });
    setTimeout(() => navigate('/login'), 1500);
  };
  
  console.log('ResetPasswordPage loaded. Token:', token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <Avatar className="mx-auto h-16 w-16 mb-4">
            <AvatarImage src="https://via.placeholder.com/150/34D399/FFFFFF?text=App" alt="App Logo" />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          {!token && (
             <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Invalid or missing password reset link. Please request a new one.</AlertDescription>
            </Alert>
          )}
          {resetError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Reset Failed</AlertTitle>
              <AlertDescription>{resetError}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="newPassword">New Password</FormLabel>
                    <FormControl>
                      <Input id="newPassword" type="password" placeholder="••••••••" {...field} disabled={!token} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmNewPassword">Confirm New Password</FormLabel>
                    <FormControl>
                      <Input id="confirmNewPassword" type="password" placeholder="••••••••" {...field} disabled={!token} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={!token || form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Resetting..." : <> <KeyRound className="mr-2 h-4 w-4" /> Reset Password </> }
              </Button>
            </form>
          </Form>
        </CardContent>
         <CardFooter className="text-center">
           <Button variant="link" asChild className="w-full">
            <Link to="/login">Back to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;