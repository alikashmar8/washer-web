import { CreateAddressDto } from './create-address.dto';

export class CreateBranchDTO {
  description: string;
  coverageArea: number;
  address: CreateAddressDto;
}
