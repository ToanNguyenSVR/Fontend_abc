import { useEffect, useState } from 'react';
import { Candidate } from '../../../model/candidate';
import myAxios from '../../../axios/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Button, Drawer, Modal, Table } from 'antd';
import CVDetail from '../../../components/organisms/CV-detail';

const Wait = () => {
  const user = useSelector((store: RootState) => store.user);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCVId, setCurrentCVId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [cvSharedID, setCvSharedID] = useState<number | null>(null);
  const fetch = async () => {
    const response = await myAxios.get(`candidate/?headhunterId=${user.headhunter?.id}&isVerified=false`);

    setCandidates(response.data.data);
    setLoading(false);
  };
  console.log(candidates);

  const columns: any[] = [
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Title',
      dataIndex: 'jobTitle',
    },
    {
      title: 'Action',
      render: (value: string, record: Candidate) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              setCurrentCVId(record.id);

              setCvSharedID(record.cvShared?.sharedId);
            }}
          >
            Show CV
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <Table loading={loading} columns={columns} dataSource={candidates} />

      <Drawer
        open={Boolean(currentCVId)}
        title="CV Detail"
        onClose={() => {
          setCurrentCVId(null);
          setCvSharedID(null);
        }}
      >
        {currentCVId && (
          <CVDetail
            clearCurrentCVId={() => {
              setCurrentCVId(null);
              setCvSharedID(null);
            }}
            sharedID={cvSharedID!}
            cvId={currentCVId!}
          />
        )}
      </Drawer>
    </div>
  );
};
export default Wait;
