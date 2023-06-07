import { Branch } from "./branch.model";
import { User } from "./user.model";

export class Address {
  id: string;
  description: string;
  city: string;
  region: string;
  street: string;
  building: string;
  lat?: number;
  lon?: number;
  isDefault: boolean;
  userId?: string;
  user?: User;
  branch?: Branch;
}
