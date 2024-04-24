import { Button, Card, Drawer, List, Steps } from 'antd';
import { LoadingOutlined, ContactsOutlined, ContainerOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import CVDetail from '../CV-detail';
import JobDetail from '../job-detail';
import { Job } from '../../../model/job';

interface CVInprocessProps {
  data: any[];
  loading: boolean;
}

const CVInprocess: FC<CVInprocessProps> = ({ data, loading }) => {
  const [job, setJob] = useState<Job | null>();
  const [cvId, setCvId] = useState<number | null>();

  return (
    <div style={{ padding: '0 20px' }}>
      <List
        loading={loading}
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item: any, index) => (
          <Card style={{ margin: '30px 0', borderRadius: 20 }}>
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => {
                    setCvId(item.cv.id);
                  }}
                >
                  <ContactsOutlined />
                </Button>,
                <Button
                  type="primary"
                  onClick={() => {
                    setJob(item.jobResponse);
                  }}
                >
                  <ContainerOutlined />
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <h4>
                    {item?.jobResponse?.company.name} - {item?.jobResponse?.title} [{item.cv.fullName}]
                  </h4>
                }
                description={<h5>{item?.jobResponse?.jobDescription}</h5>}
              />
              <Steps
                style={{ marginTop: 8 }}
                type="default"
                size="small"
                labelPlacement="vertical"
                current={item.stageIn}
                // status={item.status as StepsProps['status']}
                items={item?.jobResponse.recruiterStages?.map((item2: any, index: number) => {
                  const result: any = {
                    title: item2.recruitStageName,
                    // status:
                  };

                  if (item.resultStage === 'CONFIRM' && index === 0) {
                    result.status = 'process';
                    result.icon = <LoadingOutlined />;
                  }
                  if (item.resultStage === 'FAIL' && index === item.stageIn) {
                    result.status = 'error';
                  }

                  console.log(item.stageIn);

                  // if (index === item.stageIn && item.resultStage !== 'FAIL') {
                  //   result.status = 'process';
                  //   result.icon = <LoadingOutlined />;
                  // }
                  return result;
                })}
              />
            </List.Item>
          </Card>
        )}
      />
      <Drawer
        open={Boolean(cvId) || Boolean(job)}
        onClose={() => {
          setCvId(null);
          setJob(null);
        }}
      >
        {cvId && <CVDetail cvId={cvId!} />}
        {job && <JobDetail job={job} />}
      </Drawer>
    </div>
  );
};
export default CVInprocess;
