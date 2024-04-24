import { FC, useEffect, useState } from 'react';
import { Job } from '../../../model/job';
import JobDetail from '../job-detail';
import JobStage from '../job-stage';
import myAxios from '../../../axios/config';
import { Col, Row, Spin } from 'antd';
import './index.scss';
interface JobStageProps {
  jobId: number | null;
  setCurrentJobId: () => void;
}

const JobStageDetail: FC<JobStageProps> = ({ setCurrentJobId, jobId }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(0);

  const fetch = async () => {
    const response = await myAxios.get(`applied-stage?jobId=${jobId}`);

    setJob(response.data.data);
    setLoading(false);
  };
  useEffect(() => {
    fetch();
  }, [jobId, render]);

  return (
    <div className={`job-stage-detail ${loading && 'loading'}`}>
      {loading ? (
        <Spin />
      ) : (
        <Row>
          <Col span={10}>
            <JobDetail job={job} />
          </Col>
          <Col span={14}>
            <JobStage
              setCurrentJobId={setCurrentJobId}
              setRender={() => {
                setRender(render + 1);
              }}
              job={job}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};
export default JobStageDetail;
