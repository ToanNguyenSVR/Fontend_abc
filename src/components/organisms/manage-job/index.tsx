import { DollarOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, List, Progress, Row, Select, Spin, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import { Job } from '../../../model/job';
import JobCard from '../job-card';
import './index.scss';
import { Link } from 'react-router-dom';
import FilterComponent from '../filter';
import { toast } from 'react-toastify';
const { Meta } = Card;
interface JobsProps {}

const JobList: React.FC<JobsProps> = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [job, setJob] = useState<Job>();
  const [isLoading, setIsLoading] = useState(true);
  const [level, setLevel] = useState([]);
  const [jobID, setJobID] = useState('');
  const [workingMode, setWorkingMode] = useState<any[]>();
  const [currentWorkingMode, setCurrentWorkingMode] = useState('');
  const [jobTitle, setJobTitle] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedJobID, setSelectedJobID] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const responseJob = await myAxios.get(`job-detail/${jobID}`);
      const responseJobTitle = await myAxios.get('job-title');
      setJobTitle(responseJobTitle.data.data);
      setJob(responseJob.data.data);
    };
    fetch();
  }, [jobID]);
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await myAxios.get('job');
      setJobs(response.data.data);
      setIsLoading(false);
      setJobID(response.data.data[0].id);
      setSelectedJobID(response.data.data[0].id);
    };
    fetchJobs();
  }, []);
  const handleFilter = async (params: any) => {
    const validParams: Record<string, string | string[]> = {};
    for (const key in params) {
      if (params[key] !== undefined && params[key].length !== 0) {
        validParams[key] = params[key];
      }
    }

    console.log(validParams);

    const queryStringArray = Object.keys(validParams).map(key => {
      if (Array.isArray(validParams[key])) {
        return (validParams[key] as string[]).map(item => `${key}=${item}`).join('&');
      } else {
        return `${key}=${validParams[key]}`;
      }
    });

    // Nối các chuỗi truy vấn
    const queryString = queryStringArray.length > 0 ? queryStringArray.join('&') : '';

    const response = await myAxios.get(`/job/${queryString ? `?${queryString}` : ''}`);
    if (response.data.data.length > 0) {
      setJobs(response.data.data);
      setIsLoading(false);
      setJobID(response.data.data[0].id);
      setSelectedJobID(response.data.data[0].id);
    } else {
      toast.info(`Can't find the job you want.`);
    }
  };

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
    <div className={`job-list ${isLoading && 'isLoading'}`}>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <div className="filter">
            <Card style={{ width: '100%' }}>
              <FilterComponent onFilter={handleFilter} />
            </Card>
          </div>
          <Card>
            <Row gutter={[16, 16]}>
              <Col style={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }} span={10}>
                {jobs.map(item => {
                  return (
                    <Row
                      onClick={() => {
                        setJobID(item.id);
                        setSelectedJobID(item.id);
                      }}
                      // className={`job-item ${selectedJobID === item.id && 'choose'}`}
                      style={{ width: '100%', margin: 5 }}
                      gutter={[16, 16]}
                    >
                      {selectedJobID === item.id ? (
                        <JobCard isChoose={true} job={item} />
                      ) : (
                        <JobCard isChoose={false} job={item} />
                      )}
                    </Row>
                  );
                })}
              </Col>
              <Col style={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }} span={14}>
                {job && (
                  <Row
                    style={{
                      padding: '5px',
                      width: '100%',
                    }}
                    gutter={10}
                  >
                    <Card style={{ width: '100%' }}>
                      <div>
                        <Card bordered={false}>
                          <Meta
                            avatar={
                              <Avatar
                                size={120}
                                shape="square"
                                src={job.company.logoUrl}
                                style={{ backgroundColor: '#fff' }}
                              />
                            }
                            title={job.title}
                            description={
                              <>
                                <p>{job.company.name}</p>
                                <h3>
                                  {' '}
                                  <DollarOutlined style={{ marginRight: 5 }} />
                                  Reward
                                  <strong style={{ margin: '0 5px' }}>
                                    {convertToCurrencyFormat(Number(job.reward) / job.employee_quantity)}
                                  </strong>
                                  /candidate
                                </h3>
                              </>
                            }
                          />
                          <Link to={job.id + ''} className="job-card-link">
                            <Button
                              type="primary"
                              style={{ width: '100%', marginTop: 20, backgroundColor: '#ff5722' }}
                            >
                              Apply Candidate
                            </Button>
                          </Link>
                        </Card>
                      </div>
                      <Divider />
                      <div>
                        <div className="about-company">
                          <h3>About Company</h3>
                          <Row>
                            <Col
                              style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}
                              span={12}
                            >
                              <span>Company name</span>
                              <h5> {job?.company.name}</h5>
                            </Col>
                            <Col
                              style={{
                                padding: '10px',
                              }}
                              span={12}
                            >
                              Website: <a href="">{job?.company.websiteUrl}</a>
                            </Col>
                          </Row>
                        </div>
                        <Divider />
                        <div>
                          <h3>Job Decription</h3>
                          <Row
                            style={{
                              padding: '10px',
                            }}
                          >
                            {job.skillList.map(item => {
                              return <Tag color="default">{item.name}</Tag>;
                            })}
                            {job.languageRequests.map(item => {
                              return <Tag color="default">{item.languageName}</Tag>;
                            })}
                          </Row>
                          <Row>
                            <Col style={{ display: 'flex', flexDirection: 'column' }} span={12}>
                              <div
                                style={{
                                  padding: '10px',
                                }}
                              >
                                <span>Gross Monthly salary</span>
                                <h5>
                                  {job.salaryForm}$-{job.salaryTo}$
                                </h5>
                              </div>
                              <div
                                style={{
                                  padding: '10px',
                                }}
                              >
                                <span>Employment type</span>
                                <h5>{currentWorkingMode}</h5>
                              </div>
                            </Col>
                            <Col span={12}>
                              <div
                                style={{
                                  padding: '10px',
                                }}
                              >
                                <span>Total vacancies:</span>
                                <h5>{job?.employee_quantity}</h5>
                              </div>
                              <div
                                style={{
                                  padding: '10px',
                                }}
                              >
                                <span>Location</span>
                                <h5>{job.campusName}</h5>
                              </div>
                              <div
                                style={{
                                  padding: '10px',
                                }}
                              >
                                <span>Level</span>
                                <h5>{job.level}</h5>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <Divider />
                        <Row>
                          <h3>Skill</h3>
                          <Col
                            style={{
                              padding: '10px',
                            }}
                            span={24}
                          >
                            <List
                              dataSource={job.skillList}
                              renderItem={skill => (
                                <List.Item>
                                  <div style={{ width: '100%' }}>
                                    <h3>{skill.name}</h3>
                                    <Progress
                                      percent={(skill.point / 100) * 100}
                                      showInfo={false}
                                      // strokeWidth={15}
                                      size={'small'}
                                    />
                                  </div>
                                </List.Item>
                              )}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <h3>Language</h3>
                          <Col
                            style={{
                              padding: '10px',
                            }}
                            span={24}
                          >
                            <List
                              dataSource={job.languageRequests}
                              renderItem={language => (
                                <List.Item>
                                  <div style={{ width: '100%' }}>
                                    <h3>{language.languageName}</h3>
                                    <Progress
                                      percent={(language.ponit / 100) * 100}
                                      showInfo={false}
                                      // strokeWidth={15}
                                      size={'small'}
                                    />
                                  </div>
                                </List.Item>
                              )}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <h3>Benefits</h3>
                          <Col
                            style={{
                              padding: '10px',
                            }}
                            span={24}
                          >
                            <span>{job.benefit}</span>
                          </Col>
                        </Row>
                        <Divider />
                        <Row>
                          <h3>Job overview and responsibility</h3>
                          <Col
                            style={{
                              padding: '10px',
                            }}
                            span={24}
                          >
                            <span>{job.jobDescription}</span>
                          </Col>
                          <Col
                            style={{
                              padding: '10px',
                            }}
                            span={24}
                          >
                            <span>{job.requirement}</span>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </Row>
                )}
              </Col>
            </Row>
          </Card>
        </>
      )}
    </div>
  );
};

export default JobList;
