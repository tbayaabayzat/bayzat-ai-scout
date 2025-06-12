
import { 
  Code, 
  Zap, 
  TrendingUp, 
  Megaphone, 
  Users, 
  Calculator, 
  Settings, 
  HeartHandshake, 
  Package, 
  Crown,
  ShoppingCart,
  MoreHorizontal 
} from "lucide-react"

export type Department = 
  | 'Engineering'
  | 'IT'
  | 'Sales'
  | 'Marketing'
  | 'HR'
  | 'Finance'
  | 'Procurement'
  | 'Operations'
  | 'Customer Success'
  | 'Product Management'
  | 'Executive'
  | 'Other'

export interface DepartmentConfig {
  name: Department
  icon: typeof Code
  color: 'primary' | 'pink' | 'muted' | 'accent'
  badgeVariant: 'default' | 'secondary' | 'outline'
}

export const DEPARTMENT_CONFIG: Record<Department, DepartmentConfig> = {
  'Engineering': {
    name: 'Engineering',
    icon: Code,
    color: 'primary',
    badgeVariant: 'default'
  },
  'IT': {
    name: 'IT',
    icon: Zap,
    color: 'primary',
    badgeVariant: 'outline'
  },
  'Sales': {
    name: 'Sales',
    icon: TrendingUp,
    color: 'pink',
    badgeVariant: 'default'
  },
  'Marketing': {
    name: 'Marketing',
    icon: Megaphone,
    color: 'pink',
    badgeVariant: 'outline'
  },
  'HR': {
    name: 'HR',
    icon: Users,
    color: 'muted',
    badgeVariant: 'secondary'
  },
  'Finance': {
    name: 'Finance',
    icon: Calculator,
    color: 'muted',
    badgeVariant: 'outline'
  },
  'Procurement': {
    name: 'Procurement',
    icon: ShoppingCart,
    color: 'muted',
    badgeVariant: 'secondary'
  },
  'Operations': {
    name: 'Operations',
    icon: Settings,
    color: 'muted',
    badgeVariant: 'secondary'
  },
  'Customer Success': {
    name: 'Customer Success',
    icon: HeartHandshake,
    color: 'pink',
    badgeVariant: 'secondary'
  },
  'Product Management': {
    name: 'Product Management',
    icon: Package,
    color: 'accent',
    badgeVariant: 'default'
  },
  'Executive': {
    name: 'Executive',
    icon: Crown,
    color: 'accent',
    badgeVariant: 'outline'
  },
  'Other': {
    name: 'Other',
    icon: MoreHorizontal,
    color: 'muted',
    badgeVariant: 'outline'
  }
}

export const getDepartmentConfig = (department: string): DepartmentConfig => {
  return DEPARTMENT_CONFIG[department as Department] || DEPARTMENT_CONFIG.Other
}

export const getDepartmentColorClass = (color: DepartmentConfig['color']): string => {
  switch (color) {
    case 'primary':
      return 'bg-primary'
    case 'pink':
      return 'bg-bayzat-pink'
    case 'muted':
      return 'bg-muted-foreground'
    case 'accent':
      return 'bg-accent-foreground'
    default:
      return 'bg-muted-foreground'
  }
}

export const getDepartmentPriority = (department: Department): number => {
  const priorityMap: Record<Department, number> = {
    'Executive': 1,
    'HR': 2,
    'Finance': 3,
    'Procurement': 4,
    'IT': 5,
    'Operations': 6,
    'Engineering': 7,
    'Sales': 8,
    'Marketing': 9,
    'Customer Success': 10,
    'Product Management': 11,
    'Other': 12
  }
  
  return priorityMap[department] || 12
}
