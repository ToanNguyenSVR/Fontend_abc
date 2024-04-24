import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Col, Row, Spin } from 'antd';
import CVPreview from '../../../components/organisms/CV-preview';

const CandidateManage = () => {
  const user = useSelector((store: RootState) => store.user);
  const [CVs, setCVs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fetch = async () => {
    const response = await myAxios.get(`/headhunter/${user.headhunter?.id}/candidate`);
    setCVs(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Candidate List</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Row gutter={16}>
            {CVs?.map(item => {
              return (
                <Col span={6}>
                  <CVPreview data={item} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </div>
  );
};
export default CandidateManage;
