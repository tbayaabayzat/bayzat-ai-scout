
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Employees from "./pages/Employees";
import Research from "./pages/Research";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/companies" element={<DashboardLayout><Companies /></DashboardLayout>} />
          <Route path="/employees" element={<DashboardLayout><Employees /></DashboardLayout>} />
          <Route path="/research" element={<DashboardLayout><Research /></DashboardLayout>} />
          <Route path="/analytics" element={<DashboardLayout><div className="p-8">Analytics Coming Soon</div></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><div className="p-8">Settings Coming Soon</div></DashboardLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default App;
