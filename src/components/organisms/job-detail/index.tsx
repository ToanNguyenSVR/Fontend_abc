import { Card, Col, Descriptions, Image, List, Progress, Row, Tag } from 'antd';
import { Job } from '../../../model/job';
import { FC } from 'react';
import './index.scss';
interface JobDetailProps {
  job: Job | null;
}
const tagColors: any = {
  ACTIVE: 'green',
  INPROCESS: 'blue',
  DONE: 'green',
};
const JobDetail: FC<JobDetailProps> = ({ job }) => {
  return (
    <div className="job-detail">
      {job && (
        <Card>
          <Descriptions column={3} bordered>
            <Descriptions.Item span={3}>
              <Row style={{ justifyContent: 'center', width: '100%' }}>
                <Col>
                  <Image width={200} src={job?.image} />
                </Col>
              </Row>
            </Descriptions.Item>
            <Descriptions.Item label="Job Title" span={2}>
              <span>{job?.title}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={2}>
              <Tag color={tagColors[job.status]}>{job?.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Level" span={2}>
              <span>{job?.level}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Reward" span={3}>
              <span>{job?.reward}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={4}>
              <p>{job?.jobDescription}</p>
            </Descriptions.Item>
            <Descriptions.Item label="Skills" span={3}>
              <List
                dataSource={job?.skillList}
                renderItem={skillLevel => (
                  <List.Item>
                    <div style={{ width: '100%' }}>
                      <h3>{skillLevel.name}</h3>
                      <Progress percent={(skillLevel.point / 100) * 100} showInfo={false} strokeWidth={15} />
                    </div>
                  </List.Item>
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Languages" span={3}>
              <List
                dataSource={job?.languageRequests}
                renderItem={skillLevel => (
                  <List.Item>
                    <div style={{ width: '100%' }}>
                      <h3>{skillLevel.languageName}</h3>
                      <Progress percent={(skillLevel.ponit / 100) * 100} showInfo={false} strokeWidth={15} />
                    </div>
                  </List.Item>
                )}
              />
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </div>
  );
};
export default JobDetail;
