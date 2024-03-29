import { EmployeeRole } from 'src/common/enums/employee-role.enum';

export class Employee {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  role: EmployeeRole;
  branchId?: string;
  createdAt: Date;
  updatedAt: Date;
}
