import { Address } from './address.model';
import { Employee } from './employee.model';

export class Branch {
  id: string;
  description: string;
  addressId: string;
  address: Address;
  employees: Employee[];
  // requests: ServiceRequest[];
}
