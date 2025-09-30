
import { Building2, Users, Home, MessageSquare } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { UserMenu } from "@/components/UserMenu"
import { BayzatLogo } from "@/components/BayzatLogo"
import { useNavigate, useLocation } from "react-router-dom"


const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    comingSoon: false,
  },
  {
    title: "Companies",
    url: "/companies",
    icon: Building2,
    comingSoon: false,
  },
  {
    title: "People",
    url: "/employees",
    icon: Users,
    comingSoon: true,
  },
  {
    title: "AI Chat",
    url: "/chat",
    icon: MessageSquare,
    comingSoon: false,
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
                    <div className="flex items-center justify-between gap-2 cursor-pointer w-full">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span className="text-white">{item.title}</span>
                      </div>
                      {item.comingSoon && (
                        <Badge 
                          variant="secondary" 
                          className="text-[10px] px-1.5 py-0.5 h-4 bg-white/10 text-white/60 border-white/20 font-normal"
                        >
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
