import React, { FC, useEffect, useState } from 'react';
import { Card, Row, Col, Avatar, Tag, Image, Divider } from 'antd';
import { Job } from '../../../model/job';
import {
  InfoCircleOutlined,
  HeartOutlined,
  DollarOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import './index.scss';
import { Link } from 'react-router-dom';
const { Meta } = Card;

interface JobDetailsProps {
  job: Job;
  isChoose: boolean;
}

const JobCard: FC<JobDetailsProps> = ({ job, isChoose }) => {
  const [location, setLocation] = useState('');

  useEffect(() => {
    setLocation(job.campus.city.name);
  }, [job]);
  function truncateAndCreateLink(value: any) {
    if (value.length > 200) {
      value = value.substring(0, 200) + '...';
    }

    return value;
  }

  function convertToCurrencyFormat(amount: number) {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0, // Ensure two decimal places
      maximumFractionDigits: 0, // Ensure two decimal places
    }).format(amount);
    return formattedAmount;
  }

  return (
    <Card
      type="inner"
      bordered={true}
      className={`job-card ${isChoose && 'isChoose'}`}
      style={{ backgroundColor: '#fff', cursor: 'pointer', width: '100%' }}
    >
      <div>
        <div style={{ marginBottom: 10 }}>
          <h3>{job.title}</h3>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Meta
            avatar={
              <Avatar
                size={50}
                shape="square"
                src={job.company.logoUrl}
                style={{ backgroundColor: '#fff', padding: 7 }}
              />
            }
            title={job.company.name}
            description={
              <>
                <Tag color="#87d068">{job.status}</Tag>

                <Tag color="#108ee9">{job.level}</Tag>
              </>
            }
          />

          <p style={{ fontSize: 16 }}>
            <DollarOutlined style={{ marginRight: 5 }} />
            Reward
            <strong style={{ margin: '0 5px' }}>
              {convertToCurrencyFormat(Number(job.reward) / job.employee_quantity)}
            </strong>
            /candidate
          </p>
          <Divider dashed style={{ margin: '10px 0' }} />
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <ShoppingOutlined style={{ marginRight: 5 }} />
              <span>{job.workingMode}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <EnvironmentOutlined style={{ marginRight: 5 }} />
              <span>{location}</span>
            </div>
          </div>
          <div style={{ margin: 5 }}>
            {job.languageLevels?.map(item => {
              return <Tag color="default">{item.programLanguage.language}</Tag>;
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
