import { FC, useEffect, useState } from 'react';
import { Col, Row, Spin } from 'antd';
import { Job, applyResponses } from '../../../../model/job';
import myAxios from '../../../../axios/config';
import JobDetail from '../../../../components/organisms/job-detail';
import ListCandidateApply from '../list-candidate-apply';
interface JobStageProps {
  jobId: number | null;
}

const JobApplyDetail: FC<JobStageProps> = ({ jobId }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [apply, setApply] = useState<applyResponses[]>([]);
  const [render, setRender] = useState(0);
  const fetch = async () => {
    const response = await myAxios.get(`apply-confirm?jobId=${jobId}`);
    setApply(response.data.data.applyResponses);
    setJob(response.data.data.jobResponse);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
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
            <ListCandidateApply
              apply={apply}
              setRender={() => {
                setRender(render + 1);
              }}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};
export default JobApplyDetail;
