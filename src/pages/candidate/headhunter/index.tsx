import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import HeadhunterCard from '../../../components/organisms/headhunter';
import { User } from '../../../model/user';
import { Col, Row, Spin } from 'antd';
import { RootState } from '../../../redux/store';
import './index.scss';
import { useSelector } from 'react-redux';

const Headhunter = () => {
  const [headhunters, setHeadhunters] = useState<User[]>([]);
  const [CVs, setCVs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((store: RootState) => store.user);
  const fetch = async () => {
    const response = await myAxios.get('top-headhunter');
    const responseCV = await myAxios.get(`candidate/${user.candidate?.id}`);
    setCVs(responseCV.data.data);
    setHeadhunters(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={`headhunter ${loading ? 'loading' : ''}`}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={16}>
          {headhunters ? (
            headhunters.map(item => {
              return (
                <Col span={8}>
                  <HeadhunterCard headhunter={item} cvs={CVs} />
                </Col>
              );
            })
          ) : (
            <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h1> There are currently no headhunters available!</h1>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};
export default Headhunter;
