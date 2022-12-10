import { VehicleType } from 'src/common/enums/vehicle-type.enum';
import { ServiceRequest } from './service-request.model';
import { User } from './user.model';

export class Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year?: string;
  plateSymbol: string;
  plateNumber: string;
  color: string;
  photo: string;
  type: VehicleType;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  requests: ServiceRequest[];
}
