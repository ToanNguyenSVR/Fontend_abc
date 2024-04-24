import React, { useState } from 'react';
import './index.scss';

import { Layout, Menu, Card, Row, Col, Tag, Avatar, Pagination, Button } from 'antd';
import { DesktopOutlined, FileOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

const { Content, Sider } = Layout;

export interface ManageCandidateFormProps {}

export const ManageCandidateForm: React.FC<ManageCandidateFormProps> = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const candidates = [
    {
      id: 1,
      name: 'John Doe',
      description: 'Java Developer',
      skills: ['Java', 'ReactJS'],
      level: 'Junior',
      socialLink: 'https://example.com/janesmith',
      email: 'janesmith@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      description: 'Frontend Developer',
      skills: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
      level: 'Senior',
      socialLink: 'https://example.com/janesmith',
      email: 'janesmith@example.com',
    },
    {
      id: 4,
      name: 'Jane Smith',
      description: 'Frontend Developer',
      skills: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
      level: 'Senior',
      socialLink: 'https://example.com/janesmith',
      email: 'janesmith@example.com',
    },
    {
      id: 5,
      name: 'Jane Smith',
      description: 'Frontend Developer',
      skills: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
      level: 'Senior',
      socialLink: 'https://example.com/janesmith',
      email: 'janesmith@example.com',
    },
    {
      id: 6,
      name: 'Jane Smith',
      description: 'Frontend Developer',
      skills: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
      level: 'Senior',
      socialLink: 'https://example.com/janesmith',
      email: 'janesmith@example.com',
    },
    {
      id: 7,
      name: 'Jane Smith',
      description: 'Frontend Developer',
      skills: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
      level: 'Senior',
      socialLink: 'https://example.com/janesmith',
      email: 'janesmith@example.com',
    },
    {
      id: 8,
      name: 'Jane Smith',
      description: 'Frontend Developer',
      skills: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
      level: 'Senior',
      socialLink: 'https://example.com/janesmith',
      email: 'janesmith@example.com',
    },
    {
      id: 9,
      name: 'Jane Smith',
      description: 'Frontend Developer',
      skills: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
      level: 'Senior',
      socialLink: 'https://example.com/janesmith',
      email: 'janesmith@example.com',
    },
    {
      id: 10,
      name: 'Jane Smith',
      description: 'Frontend Developer',
      skills: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
      level: 'Senior',
      socialLink: 'https://example.com/janesmith',
      email: 'janesmith@example.com',
    },
    {
      id: 11,
      name: 'Jane Smith',
      description: 'Frontend Developer',
      skills: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
      level: 'Senior',
      socialLink: 'https://example.com/janesmith',
      email: 'janesmith@example.com',
    },
    {
      id: 12,
      name: 'Jane Smith',
      description: 'Frontend Developer',
      skills: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
      level: 'Senior',
      socialLink: 'https://example.com/janesmith',
      email: 'janesmith@example.com',
    },
    {
      id: 13,
      name: 'Jane Smith',
      description: 'Frontend Developer',
      skills: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
      level: 'Senior',
      socialLink: 'https://example.com/janesmith',
      email: 'janesmith@example.com',
    },
    {
      id: 14,
      name: 'Jane Smith',
      description: 'Frontend Developer',
      skills: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
      level: 'Senior',
      socialLink: 'https://example.com/janesmith',
      email: 'janesmith@example.com',
    },
  ];
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCandidates = candidates.slice(startIndex, endIndex);

  const generateTag = (title: string) => {
    if (title.includes('Frontend')) {
      return <Tag color="blue">{title}</Tag>;
    }
    if (title.includes('Backend')) {
      return <Tag color="blue">{title}</Tag>;
    }
    return <Tag color="yellow">{title}</Tag>;
  };

  return (
    <div className="mangage-candidate">
      <h1>Candidates</h1>

      <Row style={{ width: '100%', justifyContent: 'end', margin: '20px 0' }}>
        <Button type="primary">Add new candidate</Button>
      </Row>

      <div style={{ width: '100%', marginTop: '10px' }}>
        <Row gutter={[16, 16]}>
          {currentCandidates.map(candidate => (
            <Col xs={24} sm={12} md={8} lg={8} key={candidate.id}>
              <Card
                title={
                  <Row style={{ gap: 10 }}>
                    <span>{candidate.name}</span>
                    {generateTag(candidate.description)}
                  </Row>
                }
              ></Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={candidates.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
