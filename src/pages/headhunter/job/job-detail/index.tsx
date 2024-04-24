import React, { FC, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Image,
  List,
  Modal,
  Progress,
  Row,
  Spin,
  Tag,
} from 'antd';
import { Job } from '../../../../model/job';
import PageTemplate from '../../../../components/templates/page-template';
import myAxios from '../../../../axios/config';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { toast } from 'react-toastify';
import CVPreview from '../../../../components/organisms/CV-preview';
import './index.scss';

const { Meta } = Card;

const JobDetailPage: FC = () => {
  const [job, setJob] = useState<Job>();
  const [candidate, setCandidate] = useState<any[]>();
  const [workingMode, setWorkingMode] = useState<any[]>();
  const [currentWorkingMode, setCurrentWorkingMode] = useState('');
  const [render, setRender] = useState(0);
  const param = useParams();
  const navigate = useNavigate();
  const user = useSelector((store: RootState) => store.user);
  const [showModal, setShowModal] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      const response = await myAxios.get(`job-detail/${param.id}`);
      const responseCandidate = await myAxios.get(
        `/headhunter/${user.headhunter?.id}/candidate?jobId=${param.id}`
      );
      const responseWorkingMode = await myAxios.get(`/working-mode`);
      setWorkingMode(responseWorkingMode.data.data);
      setJob(response.data.data);
      setCandidate(responseCandidate.data.data);
      setLoading(false);
    };

    fetch();
  }, [render]);

  useEffect(() => {
    workingMode &&
      workingMode.forEach(item => {
        if (item.id == job?.workingMode) {
          setCurrentWorkingMode(item.mode);
        }
      });
  });

  return (
    <>
      {loading ? (
        <div className={`job-stage-detail ${loading && 'loading'}`}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <PageTemplate>
            {job && (
              <Row
                style={{
                  padding: '5px',
                }}
              >
                <Card style={{ width: '100%' }} bordered={false}>
                  <Meta
                    avatar={<Avatar size="large" src={job.image} />}
                    title={job.title}
                    description={<Tag color="success">{job.status}</Tag>}
                  />
                </Card>
              </Row>
            )}
            {job && (
              <Row
                style={{
                  padding: '5px',
                }}
                gutter={10}
              >
                <Col span={14}>
                  <Card>
                    <div className="about-company">
                      <h3>About Company</h3>
                      <Row>
                        <Col style={{ display: 'flex', flexDirection: 'column', padding: '10px' }} span={12}>
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
                  </Card>
                </Col>

                <Col span={10}>
                  <Card title="CV Suggestion" className="refer-candidate">
                    <Row gutter={[16, 16]} style={{ maxHeight: 500, overflow: 'auto' }}>
                      {candidate?.map(item => {
                        return (
                          <Col
                            xl={12}
                            lg={8}
                            md={12}
                            sm={24}
                            onClick={() => {
                              setSelectedCV(item.cvShared.sharedId);
                            }}
                          >
                            <CVPreview data={item} active={selectedCV === item.cvShared.sharedId} />
                          </Col>
                        );
                      })}
                    </Row>
                    <Divider />
                    <Row style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                      <Button
                        onClick={async () => {
                          if (selectedCV == null) {
                            toast.error('Please select CV!');
                            return;
                          }
                          try {
                            const response = await myAxios.post(`refer-cv/${job?.id}/${selectedCV}`);
                            toast.success(response.data.message);
                            setShowModal(false);
                            setRender(render + 1);
                            setSelectedCV(null);
                          } catch (error: any) {
                            toast.error(error.response.data + '.Please chosse other CV!');
                          }
                        }}
                        type="primary"
                      >
                        Aplly CV
                      </Button>
                    </Row>
                  </Card>
                </Col>
              </Row>
            )}
          </PageTemplate>
        </>
      )}
    </>
  );
};

export default JobDetailPage;
