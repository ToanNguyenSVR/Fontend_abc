import { Route, Routes } from 'react-router';
import './App.css';
import CVCreate from './components/organisms/CV-create';
import { Profile } from './components/templates/profile';
import { VerifyPage } from './components/templates/verify-page';
import Admin from './pages/admin';
import AdminCandidateApprove from './pages/admin/candidate';
import AdminCandidateApply from './pages/admin/candidate-apply';
import AdminCandidateInterview from './pages/admin/candidate/interview';
import CompanyDetail from './pages/admin/company/detail';
import CompanyVerify from './pages/admin/company/verify';
import CompanyWait from './pages/admin/company/wait';
import RecruiterStage from './pages/admin/config/recruiter-stage';
import SystemConfig from './pages/admin/config/system-config';
import AdminDashboard from './pages/admin/dashboard';
import City from './pages/admin/data/city';
import EmailTemplate from './pages/admin/data/email';
import JobTitle from './pages/admin/data/job-title';
import Language from './pages/admin/data/language';
import Skill from './pages/admin/data/skill';
import SkillGroup from './pages/admin/data/skill-group';
import WorkingMode from './pages/admin/data/woring-mode';
import HeadhunterActive from './pages/admin/headhunter/active';
import HeadhunterVerify from './pages/admin/headhunter/verify';
import AdminTransaction from './pages/admin/transaction';
import Candidate from './pages/candidate';
import CV from './pages/candidate/cv';
import CandidateRequest from './pages/candidate/cv/request';
import Headhunter from './pages/candidate/headhunter';
import Interview from './pages/candidate/interview';
import CandidateWait from './pages/candidate/wait';
import PageNotFound from './pages/common/404';
import ADDNewAC from './pages/common/add-cv-new/add-cv-new';
import { Login } from './pages/common/login';
import { Register } from './pages/common/register';
import CompanyManager from './pages/company-manager';
import Campus from './pages/company-manager/campus';
import History from './pages/company-manager/history';
import JobInProcess from './pages/company-manager/inprocess';
import JobManager from './pages/company-manager/job';
import Overview from './pages/company-manager/overview';
import Staff from './pages/company-manager/staff';

import JobReport from './components/organisms/job-report';
import MatchingCandidate from './components/organisms/matching-candidate';
import Messenger from './components/organisms/messager';
import MessagerDetail from './components/organisms/messager-detail';
import { ManagerWallet } from './pages/company-manager/wallet';
import CompanyStaff from './pages/company-staff';
import JobStaff from './pages/company-staff/job';
import HeadhunterDashboard from './pages/headhunter';
import CandidateManage from './pages/headhunter/candidate';
import InInterview from './pages/headhunter/interview';
import Job from './pages/headhunter/job';
import JobDetailPage from './pages/headhunter/job/job-detail';
import Rating from './pages/headhunter/rating-headhunter';
import Request from './pages/headhunter/request';
import Wait from './pages/headhunter/wait';
import AllTransaction from './pages/admin/transaction/all';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  const user = useSelector((store: RootState) => store.user);
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="chat" element={<Messenger />}>
        <Route path=":id" element={<MessagerDetail />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="verify" element={<VerifyPage />} />
      <Route path="add-cv/:uuid/:requestid" element={<ADDNewAC />} />
      <Route path="headhunter" element={<HeadhunterDashboard />}>
        <Route path=":id" element={<JobDetailPage />} />
        <Route path="candidate" element={<CandidateManage />} />
        <Route path="" element={<Job />} />
        <Route path="profile" element={<Profile />} />
        <Route path="matching" element={<MatchingCandidate />} />
        <Route path="wait" element={<Wait />} />
        <Route path="interview" element={<InInterview />} />
        <Route path="request" element={<Request />} />
        <Route path="wallet" element={<ManagerWallet />} />
        <Route path="rating" element={<Rating useCard headhunterId={user.headhunter?.id} />} />
        <Route path="job">
          <Route path="" element={<Job />} />
          <Route path=":id" element={<JobDetailPage />} />
        </Route>
      </Route>
      <Route path="staff" element={<CompanyStaff />}>
        <Route path="" element={<JobInProcess />} />
        <Route path="inprocess" element={<JobInProcess />} />
        <Route path="job">
          <Route path="" element={<JobStaff />} />
          <Route path=":id" element={<JobReport />} />
        </Route>
      </Route>
      <Route path="manager" element={<CompanyManager />}>
        <Route path="" element={<Overview />} />
        <Route path="overview" element={<Overview />} />
        <Route path="profile" element={<Profile />} />
        <Route path="job">
          <Route path="" element={<JobManager />} />
          <Route path=":id" element={<JobReport />} />
        </Route>
        <Route path="wallet" element={<ManagerWallet />} />
        <Route path="history" element={<History />} />
        <Route path="inprocess" element={<JobInProcess />} />
        <Route path="staff" element={<Staff />} />
        <Route path="campus" element={<Campus />} />
      </Route>
      <Route path="admin" element={<Admin />}>
        <Route path="" element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="candidate-approve" element={<AdminCandidateApprove />} />
        <Route path="candidate-interview" element={<AdminCandidateInterview />} />
        <Route path="city" element={<City />} />
        <Route path="candidate-apply" element={<AdminCandidateApply />} />
        <Route path="recruiter-stage" element={<RecruiterStage />} />
        <Route path="skill" element={<Skill />} />
        <Route path="skill-group" element={<SkillGroup />} />
        <Route path="language" element={<Language />} />
        <Route path="company-verify" element={<CompanyWait />} />
        <Route path="company/:id" element={<CompanyDetail />} />
        <Route path="company" element={<CompanyVerify />} />
        <Route path="headhunter-verify" element={<HeadhunterVerify />} />
        <Route path="headhunter" element={<HeadhunterActive />} />
        <Route path="withdraw" element={<AdminTransaction />} />
        <Route path="transaction" element={<ManagerWallet />} />
        <Route path="email-template" element={<EmailTemplate />} />
        <Route path="job-title" element={<JobTitle />} />
        <Route path="working-mode" element={<WorkingMode />} />
        <Route path="system-config" element={<SystemConfig />} />
      </Route>
      <Route path="candidate" element={<Candidate />}>
        <Route path="" element={<Headhunter />} />
        <Route path="headhunter" element={<Headhunter />} />
        <Route path="profile" element={<Profile />} />
        <Route path="request" element={<CandidateRequest />} />
        <Route path="cv">
          <Route path="" element={<CV />}></Route>
          <Route path="new" element={<CVCreate />}></Route>
        </Route>
        <Route path="interview" element={<Interview />} />
        <Route path="wait" element={<CandidateWait />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
