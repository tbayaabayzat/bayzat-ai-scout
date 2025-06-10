
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarToggle() {
  const { state } = useSidebar()
  
  return (
    <div className="fixed top-4 left-4 z-50">
      <SidebarTrigger className="h-8 w-8" />
    </div>
  )
}
