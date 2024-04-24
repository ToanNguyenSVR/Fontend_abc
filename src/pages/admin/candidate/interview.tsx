import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import CVInprocess from '../../../components/organisms/cv-inprocess';

const AdminCandidateInterview = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetch = async () => {
    const response = await myAxios.get(`/candidate-apply`);
    setData(response.data.data);
    setLoading(false);
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <CVInprocess loading={loading} data={data} />
    </div>
  );
};
export default AdminCandidateInterview;
