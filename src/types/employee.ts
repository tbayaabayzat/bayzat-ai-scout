
import { Department } from "@/utils/employeeDepartmentUtils"

export interface Employee {
  id: string
  full_name: string
  headline?: string
  profile_picture_url?: string
  location_full?: string
  years_of_experience?: number
  current_company_name?: string
  current_company_urn?: string
  profile_url?: string
  department?: Department
}

export interface EmployeeWithDepartment extends Employee {
  department: Department
}
