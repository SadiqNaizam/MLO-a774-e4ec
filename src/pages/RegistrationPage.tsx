import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { UserPlus, AlertCircle } from 'lucide-react';

const registrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"], // path to field that gets the error
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = React.useState<string | null>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    console.log('RegistrationPage form submitted:', data);
    setRegistrationError(null);
    // Simulate API call for registration
    toast.success("Registration Successful!", { description: "Please log in with your new account." });
    setTimeout(() => navigate('/login'), 1500);
  };

  console.log('RegistrationPage loaded');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <Avatar className="mx-auto h-16 w-16 mb-4">
             <AvatarImage src="https://via.placeholder.com/150/34D399/FFFFFF?text=App" alt="App Logo" />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Join us by filling out the form below.</CardDescription>
        </CardHeader>
        <CardContent>
          {registrationError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Registration Failed</AlertTitle>
              <AlertDescription>{registrationError}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email-register">Email Address</FormLabel>
                    <FormControl>
                      <Input id="email-register" type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password-register">Password</FormLabel>
                    <FormControl>
                      <Input id="password-register" type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword-register">Confirm Password</FormLabel>
                    <FormControl>
                      <Input id="confirmPassword-register" type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Registering..." : <> <UserPlus className="mr-2 h-4 w-4" /> Create Account </>}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 w-full">
            Already have an account?{' '}
            <Button variant="link" asChild className="p-0 h-auto">
                <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegistrationPage;