import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import myAxios from '../../../axios/config';
import { Job } from '../../../model/job';
import { RootState } from '../../../redux/store';

import { Button, Drawer, Table, Tag } from 'antd';
import JobApplyDetail from './jobapplydetail';
const AdminCandidateApply = () => {
  const user = useSelector((store: RootState) => store.user);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentJobId, setCurrentJobId] = useState<number | null>(null);
  const [render, setRender] = useState(0);
  const fetch = async () => {
    const response = await myAxios.get(`job-confirm`);
    setJobs(response.data.data);
    setIsLoading(false);
  };

  const columns: any[] = [
    {
      title: 'Job Title',
      dataIndex: 'title',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (value: string) => {
        return <Tag color="green">{value}</Tag>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'id',
      align: 'center',
      render: (value: number) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              setCurrentJobId(value!);
            }}
          >
            Show Detail
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    fetch();
  }, [render]);
  return (
    <div className="inprocess-container">
      <Table loading={isLoading} columns={columns} dataSource={jobs} />
      <Drawer
        title="Apply candidate for job"
        open={Boolean(currentJobId)}
        onClose={() => {
          setCurrentJobId(null);
        }}
      >
        <JobApplyDetail jobId={currentJobId} />
      </Drawer>
    </div>
  );
};
export default AdminCandidateApply;
