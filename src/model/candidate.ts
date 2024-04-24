export type Candidate = {
  id: number;

  code: string;

  fullName: string;

  phone: string;

  email: string;

  cvUrl: string;

  linkedInLink: string;

  facebookLink: string;

  githubLink: string;

  summary: string;

  education: string;

  jobTitle: string;

  workingMode:string;

  status:string;
  
  skillLevels: skillLevels[]
  languageLevels:languageLevels[];
  certifications:certifications[];
  experiences:experiences[];
  cvShared:cvShared
};
export type experiences ={
  id: number ;
  company:string;
  jobDescription:string;
  dateFrom:string;
  dateTo:string;
  jobTitle:string;
}
export type cvShared ={
  sharedId: number ;
}
export type certifications ={
  id: number ;
  certificationName:string;
  certificationUrl:string;
  dateFrom:string;
  dateTo:string;
  organization:string;

}
export type languageLevels ={
  id: number ;
  ponit:number;
  programLanguage:programLanguage;
}
export type programLanguage ={
  id: number ;
  language:string;
  
}
export type skillLevels ={
  id: number ;
  point:number;
  skill:skill;
}
export type skill ={
  id: number ;
  skillName:string;
  
}