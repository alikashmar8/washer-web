import { Address } from './address.model';
import { Promo } from './promo.model';
import { ServiceRequest } from './service-request.model';
import { Vehicle } from './vehicle.entity';
import { Wallet } from './wallet.model';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  photo?: string; //
  facebookId?: string;
  googleId?: string;
  appleId?: string;
  isActive: boolean; //
  isEmailVerified: boolean;
  emailVerificationDate: Date;
  isMobileVerified: boolean;
  mobileVerificationDate?: Date;
  points: number;
  referralCode?: string;
  mobileVerificationCode?: string;
  mobileVerificationCodeExpiry?: Date;
  emailVerificationCode?: string;
  emailVerificationCodeExpiry?: Date;
  passwordResetCode?: string;
  passwordResetExpiry?: Date;
  walletId: string;
  createdAt: Date;
  modifiedAt: Date;
  addresses: Address[];
  vehicles: Vehicle[];
  wallet: Wallet;
  promos: Promo[]; //
  // deviceTokens: DeviceToken[];
  // notifications: Notification[];
  // creditCards: CreditCard[];
  // transactions: Transaction[];
  requests: ServiceRequest[]; //
}
