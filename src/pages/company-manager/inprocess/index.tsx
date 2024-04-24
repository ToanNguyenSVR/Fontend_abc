import { Button, Drawer, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import myAxios from '../../../axios/config';
import JobStageDetail from '../../../components/organisms/job-stage-detail';
import { Job } from '../../../model/job';
import { RootState } from '../../../redux/store';
import './index.scss';
const JobInProcess = () => {
  const user = useSelector((store: RootState) => store.user);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [render, setRender] = useState(0);
  const [query, setQuery] = useState('');
  const [currentJobId, setCurrentJobId] = useState<number | null>(null);
  console.log(user);
  useEffect(() => {
    if (user.accountType == 'MANAGER') {
      const fetch = async () => {
        const response = await myAxios.get(`/job/${user.company?.id}/active`);
        setJobs(response.data.data);
        setIsLoading(false);
      };
      fetch();
    }
    if (user.accountType == 'STAFF') {
      const fetch = async () => {
        const response = await myAxios.get(`/job-assign/${user.companyStaff?.id}`);
        setJobs(response.data.data);
        setIsLoading(false);
      };
      fetch();
    }
  }, [user, render]);
  console.log(query);

  const tagColors: any = {
    ACTIVE: 'green',
    INPROCESS: 'blue',
    DONE: 'green',
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
        return <Tag color={tagColors[value]}>{value}</Tag>;
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

  return (
    <div className="inprocess-container">
      <Table loading={isLoading} columns={columns} dataSource={jobs} />
      <Drawer
        title="Job stage process"
        open={Boolean(currentJobId)}
        onClose={() => {
          setCurrentJobId(null);
        }}
      >
        <JobStageDetail
          setCurrentJobId={() => {
            setCurrentJobId(null);
            setRender(render + 1);
          }}
          jobId={currentJobId}
        />
      </Drawer>
    </div>
  );
};
export default JobInProcess;
