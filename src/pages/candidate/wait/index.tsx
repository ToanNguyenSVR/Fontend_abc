import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Avatar, Button, Drawer, Row, Table, Tag } from 'antd';
import { formatDistance, formatDistanceToNow } from 'date-fns';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CheckOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import CVDetail from '../../../components/organisms/CV-detail';
const CandidateWait = () => {
  const [request, setRequest] = useState();

  const [loading, setLoading] = useState(true);

  const [currentCVId, setCurrentCVId] = useState<number | null>(null);
  const columns: any[] = [
    {
      title: 'Submission time',
      dataIndex: ['cvShared', 'createDate'],
      key: 'cvShared',
      align: 'center',
      render: (value: string, record: any) => {
        return <h4>{formatDistanceToNow(new Date(record.cvShared?.createDate), { addSuffix: true })}</h4>;
      },
    },
    {
      title: 'Duration',
      dataIndex: ['cvShared', 'createDate', 'expireDate'],

      key: 'cvShared',
      align: 'center',
      render: (value: string, record: any) => {
        return (
          <h4>
            {formatDistance(new Date(record.cvShared?.createDate), new Date(record.cvShared?.expireDate), {
              addSuffix: true,
            })}
          </h4>
        );
      },
    },
    {
      title: 'Headhunter',
      dataIndex: ['cvShared', 'headhunter', 'fullName'],
      key: 'cvShared',
      align: 'center',
      render: (value: string, record: any) => {
        return (
          <Row style={{ alignItems: 'center', gap: 10 }}>
            <Avatar src={record.cvShared.headhunter.avatar} />
            {value}
          </Row>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: ['cvShared', 'status'],
      key: 'cvShared',
      align: 'center',
      render: (value: string, record: any) => {
        return (
          <div>
            {record.cvShared.status == 'VERIFY' && (
              <Tag icon={<SyncOutlined spin />} color="processing">
                VERIFY
              </Tag>
            )}
            {record.cvShared.status == 'HAVEJOB' && (
              <Tag icon={<CheckOutlined />} color="processing">
                HAVE JOB
              </Tag>
            )}
            {record.cvShared.status == 'ACTIVE' && (
              <Tag icon={<CheckCircleOutlined spin />} color="success">
                ACTIVE
              </Tag>
            )}
            {record.cvShared.status == 'DELETED' && (
              <Tag icon={<CloseCircleOutlined spin />} color="error">
                DELETED
              </Tag>
            )}
            {record.cvShared.status == 'OLD' && (
              <Tag icon={<ClockCircleOutlined spin />} color="default">
                OLD
              </Tag>
            )}
          </div>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (value: string, record: any) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              setCurrentCVId(record.id);
            }}
          >
            Show CV
          </Button>
        );
      },
    },
  ];
  const user = useSelector((store: RootState) => store.user);
  console.log(user.candidate?.id);

  const fetch = async () => {
    const response = await myAxios.get(`/candidate/${user.candidate?.id}/shared`);
    setRequest(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <Table loading={loading} columns={columns} dataSource={request} />
      <Drawer
        open={Boolean(currentCVId)}
        title="CV Detail"
        onClose={() => {
          setCurrentCVId(null);
        }}
      >
        {currentCVId && <CVDetail cvId={currentCVId!} />}
      </Drawer>
    </div>
  );
};
export default CandidateWait;
