
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  console.log('Index page - User:', user, 'Loading:', loading);

  useEffect(() => {
    if (!loading && user) {
      console.log('User is authenticated, redirecting to dashboard');
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-lg text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="flex justify-center">
          <Building2 className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Bayzat Sales Hub</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your comprehensive sales research platform for company insights and employee intelligence
        </p>
        <div className="space-y-4">
          <Button 
            size="lg" 
            className="w-full"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </Button>
          <p className="text-sm text-muted-foreground">
            Access company data, employee profiles, and advanced research tools
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
