
import { SkillsSection } from "./SkillsSection"
import { EducationSection } from "./EducationSection"
import { CertificationsSection } from "./CertificationsSection"
import { SkillsAssessment } from "./SkillsAssessment"
import { EmployeeWithDepartment } from "@/types/employee"

interface EmployeeSkillsEducationProps {
  employee: EmployeeWithDepartment
}

export function EmployeeSkillsEducation({ employee }: EmployeeSkillsEducationProps) {
  return (
    <div className="space-y-6">
      <SkillsSection employee={employee} />
      <EducationSection employee={employee} />
      <CertificationsSection employee={employee} />
      <SkillsAssessment employee={employee} />
    </div>
  )
}
