import { Currency } from "src/common/enums/currency.enum";
import { ServiceCategory } from "./service-category.model";

export class ServiceType {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  isActive: boolean;
  showVehicleSelection: boolean;
  showQuantityInput: boolean;
  isMotoAllowed: boolean;
  icon: string;
  categoryId: string;
  category?: ServiceCategory;
  // serviceRequests: ServiceRequest[];
}
