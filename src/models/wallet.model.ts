import { Currency } from "src/common/enums/currency.enum";
import { User } from "./user.model";

export class Wallet {
  id: string;
  balance: number;
  currency: Currency;
  user: User;
  // transactions: Transaction[];
}
