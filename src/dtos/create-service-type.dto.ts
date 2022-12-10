import { Currency } from "src/common/enums/currency.enum";

export class CreateServiceTypeDto {
  categoryId: string;
  name: string;
  price: number;
  currency?: Currency;
  isActive?: boolean;
  showVehicleSelection?: boolean;
  showQuantityInput?: boolean;
  isMotoAllowed?: boolean;
  icon: string;
}
