import { Company } from './company';
import { Headhunter, User } from './user';

export type Job = {
  id: string;
  title: string;
  expire_date: string;
  start_date: string;
  balance: number;
  summary: string;
  salaryForm: number;
  salaryTo: number;
  reward: string;
  campusName: string;
  image: string;
  employee_quantity: number;
  workingMode: number;
  responsibility: string[];
  jobDescription: string;
  requirement: string[];
  benefit: string;
  company: Company;
  location: string;
  status: string;
  campus: campus;
  level: string;
  jobStages: JobStage[];
  skillList: SkilLevel[];
  languageRequests: languageRequests[];
  recruiterStages: RecruitStage[];
  stageResponseList: StageResponse[];
  availableMoneyOfStage: number;
  totalMoneyPay: number;
  candidateFail: number;
  candidateInProcess: number;
  candidatePass: number;
  candidateApplied: number;
  candidateApplies: candidateApplies[];
  languageLevels: languageLevels[];
  transactionResponses: transactionResponses[];
};
interface transactionResponses {
  money: number;
  platformFee: number;
  totalMoney: number;
  transferContent: string;
  paymentSide: string;
  transactionType: string;
  transactionResult: string;
  availableMoney: number;
  jobStageStatus: string;
}
interface campus {
  city: city;
}
interface city {
  name: string;
}
interface languageLevels {
  programLanguage: programLanguage;
}
interface programLanguage {
  language: string;
}
interface candidateApplies {
  nameStage: string;
  status: string;
  candidateAvatar: string;
  candidateName: string;
  candidateApplyId: string;
  rated: boolean;
  headhunterName: string;
}
interface StageResponse {
  recruitStageId: number;
  stageId: number;
  noOfStage: number;
  rewardPercent: number;
  rewardPredictedForOne: number;
  rewardPredictedForALL: number;
  personQuantity: number;
  availableMoney: number;
  jobStageStatus: string;
  finishDate: string;
  createDate: string;
  stageName: string;
  applyStages: ApplyStage[];
  totalPayOfStage: string;
}
export type ApplyStage = {
  createBy: number;
  createAt: string | null;
  updateBy: number;
  updateAt: string | null;
  id: number;
  code: string;
  note: string | null;
  status: string;
  jobStage: JobStage;
  cv: CvInfo;
  headhunter: User;
};
export type CandidateApply = {
  createBy: number;
  createAt: string | null;
  updateBy: number;
  updateAt: string | null;
  id: number;
  code: string;
  persentProgess: number;
  totalReward: number;
  resultApply: string;
  approve_date: string;
  wasPaid: boolean;
  cvShared: CvShared;
};
interface CvShared {
  id: number;
  createDate: string;
  expireDate: string;
  status: string;
  cv: CvInfo;
}
interface CvInfo {
  createBy: number;
  createAt: string;
  updateBy: number;
  updateAt: string | null;
  id: number;
  fullName: string;
  email: string;
  address: string;
  phone: string;
  code: string;
  cvUrl: string;
  linkedInLink: string;
  facebookLink: string;
  githubLink: string;
  summary: string;
  education: string;
  status: string;
  skillLevels: any[]; // You can specify a proper type for skillLevels if needed.
  languageLevels: any[]; // You can specify a proper type for languageLevels if needed.
}
export type applyResponses = {
  code: string;
  cv: cv[];
};
export type cv = {
  fullName: string;
  cvUrl: string;
  email: string;
  avatar: string;
};
export type languageRequests = {
  id: number;
  languageId: string;
  languageName: string;
  ponit: number;
};
export type SkilLevel = {
  id: number;
  name: string;
  point: number;
};
export type JobStage = {
  createDate: string;
  finishDate: string;
  id: number;
  jobStageStatus: string;
  noOfStage: number;
  personQuantity: number;
  rewardPercent: number;
  rewardPredictedForALL: number;
  rewardPredictedForOne: number;
  recruitStages: RecruitStage;
};

export type RecruitStage = {
  baseStageRewardPresent: number;
  description: string;
  id: number;
  isDeleted: boolean;
  nameProcess: string;
  noOfStage: number;
  jobStageStatus: string;
  recruitStageName: string;
};
