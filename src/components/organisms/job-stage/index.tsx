import { Steps, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { Job } from '../../../model/job';
import CVTable from '../cv-table';
import './index.scss';
interface JobStageProps {
  job: Job | null;
  setRender: () => void;
  setCurrentJobId: () => void;
}
const JobStage: React.FC<JobStageProps> = ({ job, setRender, setCurrentJobId }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState<number | 0>(0);

  useEffect(() => {
    job?.stageResponseList.forEach((item, index: any) => {
      if (item.jobStageStatus === 'INPROCESS') {
        setCurrent(index);
      }
      if (item.jobStageStatus === 'CLOSE') {
        setCurrent(index);
      }
    });
  }, [job]);
  const onChange = (value: number) => {
    console.log();
    if (job?.stageResponseList[value].jobStageStatus !== 'NEW') {
      setCurrent(value);
    }
  };

  const steps =
    job?.stageResponseList.map((item, index, array) => {
      const isLastItem = index === array.length - 1;
      const buttonText = isLastItem ? 'Close Job' : 'Finish Round';

      return {
        title: item.stageName,
        onclick: () => {
          if (item.jobStageStatus !== 'NEW') {
            console.log(item);
          }
        },
        content: (
          <CVTable
            isShow={item.noOfStage != 1}
            setCurrent={() => setCurrent(current + 1)}
            setCurrentJobId={setCurrentJobId}
            setRender={setRender}
            job={job}
            applystage={item.applyStages}
            nameButton={buttonText}
          />
        ),
      };
    }) || [];
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps?.map((item: any) => ({ key: item.title, title: item.title })) || [];

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div className="job-stage">
      <Steps onChange={onChange} current={current} items={items} />
      {steps.length > 0 && <div style={contentStyle}>{steps[current]?.content}</div>}
    </div>
  );
};

export default JobStage;
