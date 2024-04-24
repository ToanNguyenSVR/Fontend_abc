import { Button, Col, Row, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import './index.scss';
import { FolderAddOutlined } from '@ant-design/icons';
import CVPreview from '../CV-preview';
import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { Candidate } from '../../../model/candidate';
const CVList = () => {
  const user = useSelector((store: RootState) => store.user);
  const [cv, setCV] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const response = await myAxios.get(`candidate/${user.candidate?.id}`);
      setCV(response.data.data);
      setLoading(false);
    };
    fetch();
  }, [render]);

  return (
    <div className={`cv-list ${loading && 'loading'}`}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Title>
            CV Manager
            <Button
              onClick={() => {
                navigate('new');
              }}
              type="primary"
              icon={<FolderAddOutlined />}
            >
              Add CV
            </Button>
          </Title>
          <Row gutter={[16, 16]}>
            {cv.map(item => {
              if (item.status != 'DELETED') {
                return (
                  <Col xl={8} lg={8} md={12} sm={24}>
                    <CVPreview
                      data={item}
                      setRender={() => {
                        setRender(render + 1);
                      }}
                    />
                  </Col>
                );
              }
            })}
          </Row>
        </>
      )}
    </div>
  );
};
export default CVList;
