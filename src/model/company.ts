export type Company = {
  id: number;
  title: string;
  taxCode: string;
  name: string;
  shortName: string;
  websiteUrl: string;
  description: string;
  logoUrl: string;
  establishDate: string;
  status: string;
  beneficiaryBank: string;
  beneficiaryAccount: string;
  beneficiaryName: string;
  contracts: contracts[]
};
export type contracts={
  id:number;
  contractNumber:string;
  contractUrl:string;
}
