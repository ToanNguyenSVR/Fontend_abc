import { Company } from './company';

export type User = {
  id: number;
  email: string;
  avatar: string;
  fullName: string;
  phone: string;
  code: string | null;
  status: string;
  accountType: 'CANDIDATE' | 'HEADHUNTER' | 'COMPANY' | 'STAFF' | 'MANAGER' | null;
  headhunter: Headhunter | null;
  token: string;
  description: string;
  company: Company | null;
  companyStaff: CompanyStaff | null;
  candidate: Candidate | null;
  wallet: Wallet | null;
  avg_star: number | undefined;
};

export type Wallet = {
  id: string;
  balance: number;
  blockMoney: number;
  status: 'ACTIVE' | 'INACTIVE'; // You can update this to include other possible statuses
  createDate: string; // Consider using Date type if you plan to work with dates
  beneficiaryAccount: string | null;
  beneficiaryName: string | null;
  beneficiaryBank: string | null;
};

export type Headhunter = {
  id: string;
  gender: string;
  citizenIdentification: string;
  citizenDate: string;
  address: string;
};

export type CompanyStaff = {
  id: number;
  code: string;
  nameStaff: string;
  role: string;
  candidateQuantity: number;
};

export type Candidate = {
  id: number;
  cvQuantity: number;
  status: string;
};
