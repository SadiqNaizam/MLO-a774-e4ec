import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar'; // Custom Sidebar
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home, Users, Settings, FileText, PlusCircle, LogOut, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sampleInvoices = [
  { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
  { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
  { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
  { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
];

const ApplicationHomePage = () => {
  console.log('ApplicationHomePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/app-home" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://via.placeholder.com/150/34D399/FFFFFF?text=App" alt="App Logo" />
                    <AvatarFallback>APP</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-xl text-gray-800 dark:text-white">My Application</span>
            </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/app-home" className={navigationMenuTriggerStyle()}>
                  <Home className="mr-2 h-4 w-4" /> Dashboard
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/app-home/reports" className={navigationMenuTriggerStyle()}>
                  <FileText className="mr-2 h-4 w-4" /> Reports
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/app-home/users" className={navigationMenuTriggerStyle()}>
                  <Users className="mr-2 h-4 w-4" /> Users
                </Link>
              </NavigationMenuItem>
              {/* Add more navigation items here */}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://via.placeholder.com/100/007BFF/FFFFFF?text=U" alt="User Avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">User Name</p>
                            <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                         <Link to="/login">Log out</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar title="Main Menu" className="md:w-60 lg:w-72">
          <Link to="/app-home" className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <Home className="mr-3 h-5 w-5" /> Dashboard
          </Link>
          <Link to="/app-home/reports" className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <FileText className="mr-3 h-5 w-5" /> Reports
          </Link>
          <Link to="/app-home/users" className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <Users className="mr-3 h-5 w-5" /> User Management
          </Link>
          <Link to="/app-home/settings" className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <Settings className="mr-3 h-5 w-5" /> Settings
          </Link>
        </Sidebar>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
            <Button>
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Item
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Users currently online</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">1,234</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sales This Month</CardTitle>
                <CardDescription>Total revenue generated</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">$15,678</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>Tasks requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">23</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>A list of recent invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleInvoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">{invoice.invoice}</TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Notes</CardTitle>
              <CardDescription>Jot down some notes.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Type your notes here..." rows={5} />
              <Button className="mt-4">Save Notes</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ApplicationHomePage;