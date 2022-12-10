import { EmployeeRole } from "src/common/enums/employee-role.enum";

export class CreateEmployeeDTO {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email?: string;
  phoneNumber: string;
  role: EmployeeRole;
  branchId: string;
}
