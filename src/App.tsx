import { Toaster as ShadcnToaster } from "@/components/ui/toaster"; // Using shadcn toaster
import { Toaster as SonnerToaster } from "@/components/ui/sonner";    // Using sonner for notifications
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ApplicationHomePage from "./pages/ApplicationHomePage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// A simple mock auth check, replace with actual auth logic
// For this example, we'll assume user is not authenticated initially
// and `ApplicationHomePage` is a protected route.
const isAuthenticated = () => {
  // In a real app, check tokens, context, etc.
  // For now, let's simulate that /app-home needs "authentication"
  // by simply checking if we are on the login path or redirecting from it.
  // This is a very naive check for demonstration only.
  // A real app would use context or a global state.
  return sessionStorage.getItem("isLoggedIn") === "true"; // Example
};

// Higher-Order Component for protected routes
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // In a real app, you'd redirect to login if not authenticated
  // For now, we will allow access to AppHome directly for simpler testing of the page.
  // A more robust check would involve context or a global state.
  // if (!isAuthenticated()) {
  //   return <Navigate to="/login" replace />;
  // }
  console.log("Accessing a protected route."); // Placeholder for auth logic
  return children;
};


const App = () => {
  console.log('App.tsx loaded');
  // Simulate login for direct access to /app-home during development
  // In a real app, login would set this.
  // sessionStorage.setItem("isLoggedIn", "true");


  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ShadcnToaster />
      <SonnerToaster richColors position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* ApplicationHomePage is now the main content for authenticated users */}
          <Route 
            path="/app-home/*" // Using /* to allow nested routes within AppHome if needed later
            element={
              <ProtectedRoute>
                <ApplicationHomePage />
              </ProtectedRoute>
            } 
          />

          {/* Redirect root to login page by default */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;