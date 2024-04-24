import { Avatar, Card, List, Steps, StepsProps, Table } from 'antd';
import myAxios from '../../../axios/config';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { AppliedInterview } from '../../../model/appliedInterview';
import CVInprocess from '../../../components/organisms/cv-inprocess';
const { Step } = Steps;

const InInterview = () => {
  const user = useSelector((store: RootState) => store.user);
  const [loading, setLoading] = useState(true);
  const [appliedInterview, setAppliedInterview] = useState<AppliedInterview[]>([]);
  const fetch = async () => {
    const response = await myAxios.get(`/candidate-apply?headhunterId=${user.headhunter?.id}`);
    setAppliedInterview(response.data.data);
    setLoading(false);
  };
  useEffect(() => {
    fetch();
  }, []);
  return <CVInprocess data={appliedInterview} loading={loading} />;
};
export default InInterview;
