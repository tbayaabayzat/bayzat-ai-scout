
import { Building2, Users, Search, Home } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserMenu } from "@/components/UserMenu"
import { BayzatLogo } from "@/components/BayzatLogo"
import { useNavigate, useLocation } from "react-router-dom"
import { AIInsights } from "@/components/AIInsights"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Companies",
    url: "/companies",
    icon: Building2,
  },
  {
    title: "Employee Profiles",
    url: "/employees",
    icon: Users,
  },
  {
    title: "Research",
    url: "/research",
    icon: Search,
  },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className="p-6 pb-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-6 w-6" />
            <BayzatLogo width={120} height={32} />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    onClick={() => navigate(item.url)}
                  >
                    <div className="flex items-center gap-2 cursor-pointer">
                      <item.icon className="h-4 w-4" />
                      <span className="text-white">{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="px-2 mt-6">
          <AIInsights />
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-3">
        <UserMenu />
        <div className="text-xs text-white">
          Bayzat Internal Tool v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
