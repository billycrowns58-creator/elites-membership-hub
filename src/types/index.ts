export type Role = 'Membre' | 'Agent' | 'Administrateur';
export type PaymentStatus = 'En attente' | 'Approuvé' | 'Refusé';
export type PaymentMethod = 'Airtel Money' | 'Orange Money' | 'M-Pesa';
export type Currency = 'USD' | 'CDF';

export interface User {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  password?: string;
  address: string;
  gender: string;
  birthDate: string;
  profilePic?: string;
  role: Role;
  referralCode: string;
  referredBy?: string;
  inviteCount: number;
  isApproved: boolean;
  isBlocked: boolean;
  createdAt: string;
}

export interface Contribution {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: Currency;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string;
  receiptUrl?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}