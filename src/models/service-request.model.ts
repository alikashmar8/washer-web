import { PaymentType } from 'src/common/enums/payment-type.enum';
import { RequestStatus } from 'src/common/enums/request-status.enum';
import { Address } from './address.model';
import { Branch } from './branch.model';
import { Employee } from './employee.model';
import { ServiceType } from './service-type.model';
import { User } from './user.model';
import { Vehicle } from './vehicle.entity';

export class ServiceRequest {
  id: string;
  status: RequestStatus;
  requestedDate: Date;
  confirmedDate?: Date;
  paymentType: PaymentType;
  quantity: number;
  cost: number;
  tips: number;
  isPaid: boolean;
  isClientVerified: boolean;
  verificationCode: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  employeeId?: string;
  vehicleId?: string;
  branchId: string;
  transactionId?: string;
  typeId: string;
  addressId: string;
  user: User;
  vehicle?: Vehicle;
  address?: Address;
  employee?: Employee;
  branch?: Branch;
  // transaction?: Transaction;
  type: ServiceType;
}
