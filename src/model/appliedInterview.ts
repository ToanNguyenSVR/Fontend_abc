export type AppliedInterview ={
    code: string;
    persentProgess: number;
    totalReward: number;
    resultApply: string;
    job: {
      title: string;
      summary: string;
      level: string;
      reward: number;
      image: string | null;
    };
    cv: {
      cvUrl: string;
      linkedInLink: string;
      facebookLink: string;
      githubLink: string;
      summary: string;
      education: string;
    };
  }