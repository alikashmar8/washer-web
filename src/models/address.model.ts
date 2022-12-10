import { Branch } from "./branch.model";

export class Address {
  id: string;
  description: string;
  lat?: number;
  long?: number;
  isDefault: boolean;
  userId?: string;
  // user?: User;
  branch?: Branch;
}
