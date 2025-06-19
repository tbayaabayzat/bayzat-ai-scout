
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarToggle } from "@/components/SidebarToggle";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Employees from "./pages/Employees";
import Research from "./pages/Research";
import DevMenu from "./pages/DevMenu";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const isPublicRoute = ['/', '/auth', '/dev'].includes(location.pathname);

  console.log('Current route:', location.pathname, 'Is public:', isPublicRoute);

  if (isPublicRoute) {
    // Public routes without sidebar
    return (
      <div className="min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dev" element={<DevMenu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }

  // Protected routes with sidebar
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 relative">
          <SidebarToggle />
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/companies"
              element={
                <ProtectedRoute>
                  <Companies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees"
              element={
                <ProtectedRoute>
                  <Employees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/research"
              element={
                <ProtectedRoute>
                  <Research />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  );
}

export default App;
