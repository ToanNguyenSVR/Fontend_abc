import React, { useEffect, useState } from 'react';
import {
  SearchOutlined,
  PlusSquareOutlined,
  PlusOutlined,
  PlusCircleOutlined,
  LoginOutlined,
  HeartOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { Input, Button, Select, Card, Row, Col, Progress, Avatar } from 'antd';

import myAxios from '../../../axios/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { toast } from 'react-toastify';

const { Meta } = Card;

interface MatchingCandidateProps {}

interface CartProps {
  item: any;
  setRender: () => void;
}

const MatchingCandidate: React.FC<MatchingCandidateProps> = () => {
  const [listMatching, setListMatching] = useState<any[]>();

  const user = useSelector((store: RootState) => store.user);
  const [render, setRender] = useState(0);
  function truncateAndCreateLink(value: any) {
    if (value.length > 40) {
      value = value.substring(0, 40) + '...';
    }

    return value;
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await myAxios.get(`/matching/${user.headhunter?.id}`);
      setListMatching(response.data.data);
    };
    fetch();
  }, [render]);
  console.log(listMatching);

  return (
    <div className="matching">
      <Row gutter={[16, 16]}>
        {listMatching?.map((item: any) => {
          return (
            <Col xs={24} md={8}>
              <Cart
                item={item}
                setRender={() => {
                  setRender(render + 1);
                }}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

const Cart: React.FC<CartProps> = ({ item, setRender }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '300px', overflow: 'auto' }}>
            <span>{item.job?.title}</span>
          </div>

          <div>
            <Button
              loading={loading}
              onClick={async () => {
                setLoading(true);
                try {
                  const response = await myAxios.post(`refer-cv/${item.job?.id}/${item.cvSharedId}`);
                  toast.success(response.data.message);
                  setLoading(false);
                  setRender();
                } catch (error: any) {
                  toast.error(error.response.data + '.Please chosse other CV!');
                  setLoading(false);
                }
              }}
              type="primary"
              icon={<LoginOutlined />}
            >
              Refer
            </Button>
          </div>
        </div>
      }
    >
      <Meta
        avatar={
          <Progress
            type="circle"
            percent={item.score}
            size="small"
            format={() => {
              return Number(item.score).toFixed(0) + '%';
            }}
          />
        }
        title={<>{item.cv?.fullName}</>}
        description={<>Reward {item.job?.reward}$/candidate</>}
      />
    </Card>
  );
};

export default MatchingCandidate;
