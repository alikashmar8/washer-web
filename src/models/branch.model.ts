import { Address } from './address.model';
import { Employee } from './employee.model';

export class Branch {
  id: string;
  description: string;
  coverageArea: number;
  isActive: boolean;
  addressId: string;
  address: Address;
  employees: Employee[];
  // requests: ServiceRequest[];
}
