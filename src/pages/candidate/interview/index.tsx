import { Avatar, Card, List, Steps, StepsProps, Table } from 'antd';
import myAxios from '../../../axios/config';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { LoadingOutlined } from '@ant-design/icons';
import CVInprocess from '../../../components/organisms/cv-inprocess';

const Interview = () => {
  const user = useSelector((store: RootState) => store.user);
  const [job, setJob] = useState<any>();
  const [loading, setLoading] = useState(false);
  const fetch = async () => {
    const response = await myAxios.get(`/candidate-apply?candidateId=${user.candidate?.id}`);
    setJob(response.data.data);
    setLoading(false);
    console.log(response.data.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return <CVInprocess data={job} loading={loading} />;
};
export default Interview;
