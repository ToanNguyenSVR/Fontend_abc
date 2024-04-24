import {
  FrownOutlined,
  LoadingOutlined,
  MehOutlined,
  SmileOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import {
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Modal,
  Progress,
  Rate,
  Row,
  Spin,
  Statistic,
  Steps,
  Table,
  Tag,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import myAxios from '../../../axios/config';
import { Job } from '../../../model/job';
import { RootState } from '../../../redux/store';
import './index.scss';
import { formatDistanceToNow } from 'date-fns';

const { Meta } = Card;

const JobReport: FC = () => {
  const [job, setJob] = useState<Job>();
  const [candidate, setCandidate] = useState<any[]>();
  const [workingMode, setWorkingMode] = useState<any[]>();
  const [currentWorkingMode, setCurrentWorkingMode] = useState('');
  const param = useParams();
  const navigate = useNavigate();
  const user = useSelector((store: RootState) => store.user);
  const [showModal, setShowModal] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [current, setCurrent] = useState<number | 0>(0);
  const [color, setColor] = useState('primary');
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [render, setRender] = useState(0);
  const [applyStageID, setApplyStageID] = useState<string>('');
  const [headhunterName, setHeadhunterName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [activeTabKey2, setActiveTabKey2] = useState<string>('basic');

  const handleRating = (values: any) => {
    console.log(values);
    setApplyStageID(values.candidateApplyId);
    setHeadhunterName(values.headhunterName);
    setShowModal(true);
  };
  const handleSubmitRating = async () => {
    const dataConfirm = {
      comment: comment,
      ratingStar: rating,
      candidateApplyId: applyStageID,
    };

    try {
      const response = await myAxios.post(`/rating`, dataConfirm);
      if (response.status == 200) {
        toast.success('Rating success!');
        setRender(render + 1);
        setShowModal(false);
      }
    } catch (e: any) {
      toast.error(e.response.data);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await myAxios.get(`/job-report/${param.id}`);

      const responseWorkingMode = await myAxios.get(`/working-mode`);
      setWorkingMode(responseWorkingMode.data.data);
      setJob(response.data.data);
      setLoading(false);
    };

    fetch();
  }, [render]);
  useEffect(() => {
    job?.recruiterStages.forEach((item, index: any) => {
      if (item.jobStageStatus === 'INPROCESS' || item.jobStageStatus == 'CLOSE') {
        setCurrent(index);
      }
    });
  }, [job]);

  const steps =
    job?.recruiterStages?.map((item, index: number) => {
      if (item.jobStageStatus == 'INPROCESS') {
        return {
          title: item.recruitStageName,
          status: 'process',
          icon: <LoadingOutlined />,
        };
      } else if (item.jobStageStatus == 'CLOSE') {
        return {
          title: item.recruitStageName,

          status: 'finish',
        };
      } else if (item.jobStageStatus == 'NEW') {
        return {
          title: item.recruitStageName,
          status: 'wait',
        };
      }
    }) || [];
  const item =
    steps?.map((item: any) => ({
      key: item.title,
      title: item.title,
      icon: item.icon,
    })) || [];
  const columns: any[] = [
    {
      title: '',
      dataIndex: 'candidateAvatar',
      align: 'center',
      render: (value: string) => {
        return <Avatar icon={<UserOutlined />} alt="A" src={value} />;
      },
    },
    {
      title: 'Candidate Name',
      dataIndex: 'candidateName',
    },
    {
      title: 'Stage',
      dataIndex: 'nameStage',
      align: 'center',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (value: string) => {
        if (value === 'IN_PROCESS') return <Tag color="yellow">{value}</Tag>;
        if (value === 'PASS') return <Tag color="green">{value}</Tag>;
        if (value === 'FAIL') return <Tag color="red">{value}</Tag>;
        if (value === 'APPLIED') return <Tag color="yellow">{value}</Tag>;
      },
    },

    {
      title: 'Rating',
      dataIndex: 'rated',
      align: 'center',
      render: (value: boolean, record: any) => {
        if (value) {
          return <Tag color="success">Rated</Tag>;
        } else {
          if (record.status == 'IN_PROCESS' || record.status == 'FAIL' || record.status == 'PASS') {
            return (
              <Row style={{ justifyContent: 'center', gap: 10 }}>
                <Button
                  type="primary"
                  icon={<StarOutlined />}
                  onClick={() => {
                    handleRating(record);
                  }}
                ></Button>
              </Row>
            );
          }
        }
      },
    },
  ];
  const columnsTransaction: any[] = [
    {
      title: 'Money',
      dataIndex: 'money',
      align: 'center',
      render: (value: number) => {
        return <h4>{value}$</h4>;
      },
    },
    {
      title: 'Platform Fee',
      dataIndex: 'platformFee',
      align: 'center',
      render: (value: number) => {
        return <h4>{value}%</h4>;
      },
    },
    {
      title: 'Total Money',
      dataIndex: 'totalMoney',
      align: 'center',
      render: (value: number) => {
        return <h4>{value}$</h4>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'transferContent',
      render: (value: string) => {
        return <h4 style={{ maxWidth: 500 }}>{value}</h4>;
      },
    },
    {
      title: 'Type',
      dataIndex: 'transactionType',
      align: 'center',
      render: (value: string, record: any) => {
        if (value == 'PAY' && record.platformFee > 0) return <Tag color="blue">BLOCK</Tag>;
        if (value == 'PAY') return <Tag color="red">{value}</Tag>;
        if (value == 'RETURN') return <Tag color="green">{value}</Tag>;
        if (value == 'APPLIED') return <Tag color="yellow">{value}</Tag>;
      },
    },
    {
      title: 'Create at',
      dataIndex: 'createDate',
      alert: 'center',
      render: (value: any) => {
        return <strong style={{ textAlign: 'center' }}>{formatDistanceToNow(new Date(value))}</strong>;
      },
    },
  ];

  const dataSource = job?.candidateApplies.map(item => {
    return {
      candidateName: item.candidateName,
      status: item.status,
      candidateAvatar: item.candidateAvatar,
      nameStage: item.nameStage,
      candidateApplyId: item.candidateApplyId,
      rated: item.rated,
      headhunterName: item.headhunterName,
    };
  });
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  useEffect(() => {
    workingMode &&
      workingMode.forEach(item => {
        if (item.id == job?.workingMode) {
          setCurrentWorkingMode(item.mode);
        }
      });
  }, [job]);

  useEffect(() => {
    if (job?.status == 'DONE') {
      setColor('success');
    }
    if (job?.status == 'INPROCESS') {
      setColor('processing');
    }
  }, [job]);
  const onClose = () => {
    setShowModal(false);
  };

  const renderTitle = (score: number) => {
    if (score < 20) return 'Know about ';
    if (score < 60) return 'Experience with ';
    if (score < 100) return 'Expert with ';
  };

  function convertToCurrencyFormat(amount: number) {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return formattedAmount;
  }

  if (loading)
    return (
      <Row style={{ width: '100%', height: '100%' }} justify={'center'} align={'middle'}>
        <Spin />
      </Row>
    );

  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };

  const tabListNoTitle = [
    {
      key: 'basic',
      label: 'Basic Information',
      tab: 'Basic Information',
    },
    {
      key: 'candidate',
      label: 'Candidate Applies',
      tab: 'Candidate',
    },
    {
      key: 'payment',
      label: 'Payment',
      tab: 'Payment',
    },
  ];
  const contentListNoTitle: Record<string, React.ReactNode> = {
    basic: (
      <>
        {job && (
          <Card bordered={false}>
            <Row gutter={12}>
              <Col span={12} style={{ borderRight: '1px solid lightgrey' }}>
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
                <Divider />

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
              </Col>
              <Col span={12} className="job">
                <Row>
                  <h3 style={{ textAlign: 'center', width: '100%' }}>Skill</h3>
                  <Col
                    style={{
                      padding: '10px',
                    }}
                    span={24}
                  >
                    <Row justify={'center'}>
                      {job?.skillList?.map((item: any) => {
                        return (
                          <Col span={8}>
                            <Progress
                              percent={(item.point / 100) * 100}
                              showInfo
                              size={150}
                              type="circle"
                              format={() => {
                                return (
                                  <div>
                                    <h1>{(item.point / 100) * 100}</h1>
                                    <p
                                      style={{
                                        fontSize: 12,
                                        textAlign: 'center',
                                        padding: '0 25px',
                                        marginTop: 10,
                                        lineHeight: 2,
                                      }}
                                    >
                                      {renderTitle(Number(((item.point / 100) * 100).toFixed(0)))} {item.name}
                                    </p>
                                  </div>
                                );
                              }}
                            />
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>
                </Row>
                <Row style={{ marginTop: 30 }}>
                  <h3 style={{ textAlign: 'center', width: '100%' }}>Language</h3>
                  <Col
                    style={{
                      padding: '10px',
                    }}
                    span={24}
                  >
                    <Row justify={'center'}>
                      {job?.languageRequests?.map((item: any) => {
                        return (
                          <Col span={8}>
                            <Progress
                              percent={(item.ponit / 100) * 100}
                              showInfo
                              size={150}
                              type="circle"
                              format={() => {
                                return (
                                  <div>
                                    <h1>{((item.ponit / 100) * 100).toFixed(0)}</h1>
                                    <p
                                      style={{
                                        fontSize: 12,
                                        textAlign: 'center',
                                        padding: '0 25px',
                                        marginTop: 10,
                                        lineHeight: 2,
                                      }}
                                    >
                                      {renderTitle(Number(((item.ponit / 100) * 100).toFixed(0)))}
                                      {item.languageName}
                                    </p>
                                  </div>
                                );
                              }}
                            />
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        )}
      </>
    ),
    candidate: (
      <>
        {job && (
          <>
            <Row>
              <Col span={17}>
                <h3>Candidate Applies</h3>
              </Col>
              <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} span={7}>
                Total candidate applied:
                <Tag
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    marginLeft: 10,
                  }}
                  color="green"
                >
                  <UserOutlined style={{ marginRight: 5 }} />
                  <h3> {job.candidateApplied}</h3>
                </Tag>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16} style={{ marginBottom: 10 }}>
              {/* <Col span={6}>
          <Card style={{ width: '100%', height: '120px' }}>
            <Statistic
              title="Applied"
              value={job.candidateApplied}
              valueStyle={{ color: 'blue' }}
              prefix={<UserAddOutlined />}
            />
          </Card>
        </Col> */}
              <Col span={8}>
                <Card style={{ width: '100%', height: '120px' }}>
                  <Statistic
                    title="Inprocesing"
                    value={job.candidateInProcess}
                    valueStyle={{ color: '#bc9522' }}
                    prefix={<MehOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: '100%', height: '120px' }}>
                  <Statistic
                    title="Passed"
                    value={job.candidatePass}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<SmileOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: '100%', height: '120px' }}>
                  <Statistic
                    title="Failed"
                    value={job.candidateFail}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<FrownOutlined />}
                  />
                </Card>
              </Col>
            </Row>
            <Table
              pagination={{ pageSize: 50 }}
              scroll={{ y: 200 }}
              columns={columns}
              dataSource={dataSource}
            />
          </>
        )}
      </>
    ),
    payment: (
      <>
        {job && (
          <>
            <Row>
              <Col span={17}>
                <h3>Transaction Report</h3>
              </Col>
              <Col span={7}>
                Total amount paid: <Tag color="green">{convertToCurrencyFormat(job.totalMoneyPay)}</Tag>
              </Col>
            </Row>
            {/* <Divider />

            <Divider /> */}

            <Collapse accordion>
              {job.recruiterStages.map((stage: any) => (
                <Collapse.Panel header={<h5>{stage.recruitStageName}</h5>} key={stage.recruitStageId}>
                  <Row style={{ marginBottom: 10 }}>
                    <Col span={6}></Col>
                    <Col span={6}></Col>
                    <Col span={6}></Col>
                    <Col span={6}>
                      {' '}
                      Total amount paid in stage:{' '}
                      <Tag color="green">{convertToCurrencyFormat(stage.totalPayOfStage)}</Tag>
                    </Col>
                  </Row>
                  <Table bordered dataSource={stage.transactionResponses} columns={columnsTransaction} />
                </Collapse.Panel>
              ))}
            </Collapse>
            <Row justify={'end'}>
              <Col span={5}>
                <h3 style={{ marginTop: 20 }}>
                  Money available:{' '}
                  <Tag color="green">{convertToCurrencyFormat(job.availableMoneyOfStage)}</Tag>
                </h3>
              </Col>
            </Row>
          </>
        )}
      </>
    ),
  };

  return (
    <>
      <Modal title="Rating" open={showModal} onCancel={onClose} footer={[]}>
        <Card>
          <Meta avatar={<Avatar size="large" src={'/hacker.png'} />} title={headhunterName}></Meta>
          <div style={{ textAlign: 'center' }}>
            <Rate
              style={{ fontSize: '36px' }}
              allowHalf
              value={rating}
              onChange={value => setRating(value)}
            />
          </div>
          <div style={{ marginTop: '1em' }}>
            <TextArea
              rows={4}
              placeholder="Write your comment here"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </div>
          <div style={{ width: '100%', marginTop: '1em' }}>
            <Button onClick={handleSubmitRating} type="primary" style={{ width: '100%' }}>
              Submit
            </Button>
          </div>
        </Card>
      </Modal>

      {job && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}>
          <Row style={{ padding: '0 10px' }}>
            <Card style={{ width: '100%' }} bordered={false}>
              <Meta
                avatar={<Avatar size="large" src={job.image} />}
                title={job.title}
                description={<Tag color={color}>{job.status}</Tag>}
              />
              <Row style={{ marginTop: 20 }}>
                <Steps
                  size="small"
                  current={current}
                  items={item}
                  onChange={value => {
                    setCurrent(value);
                  }}
                />
              </Row>
            </Card>
          </Row>
          <Row style={{ padding: '0 10px' }}>
            <Card
              style={{ width: '100%' }}
              tabList={tabListNoTitle}
              activeTabKey={activeTabKey2}
              onTabChange={onTab2Change}
            >
              {contentListNoTitle[activeTabKey2]}
            </Card>
          </Row>
          {/* <Tabs defaultActiveKey="1" tabPosition={'left'} style={{ paddingRight: 10, flexGrow: 1 }}>
            <TabPane tab="Basic Information" key="1" style={{ maxHeight: 550, overflow: 'auto' }}>
              <Card bordered={false}>
                <Row gutter={12}>
                  <Col span={12} style={{ borderRight: '1px solid lightgrey' }}>
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
                    <Divider />

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
                  </Col>
                  <Col span={12}>
                    <Row>
                      <h3 style={{ textAlign: 'center', width: '100%' }}>Skill</h3>
                      <Col
                        style={{
                          padding: '10px',
                        }}
                        span={24}
                      >
                        <Row justify={'center'}>
                          {job?.skillList?.map((item: any) => {
                            return (
                              <Col span={8}>
                                <Progress
                                  percent={(item.point / 100) * 100}
                                  showInfo
                                  size={150}
                                  type="circle"
                                  format={() => {
                                    return (
                                      <div>
                                        <h1>{(item.point / 100) * 100}</h1>
                                        <p
                                          style={{
                                            fontSize: 12,
                                            textAlign: 'center',
                                            padding: '0 25px',
                                            marginTop: 10,
                                            lineHeight: 2,
                                          }}
                                        >
                                          {renderTitle(Number(((item.point / 100) * 100).toFixed(0)))}{' '}
                                          {item.name}
                                        </p>
                                      </div>
                                    );
                                  }}
                                />
                              </Col>
                            );
                          })}
                        </Row>
                       
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 30 }}>
                      <h3 style={{ textAlign: 'center', width: '100%' }}>Language</h3>
                      <Col
                        style={{
                          padding: '10px',
                        }}
                        span={24}
                      >
                        <Row justify={'center'}>
                          {job?.languageRequests?.map((item: any) => {
                            return (
                              <Col span={8}>
                                <Progress
                                  percent={(item.ponit / 100) * 100}
                                  showInfo
                                  size={150}
                                  type="circle"
                                  format={() => {
                                    return (
                                      <div>
                                        <h1>{((item.ponit / 100) * 100).toFixed(0)}</h1>
                                        <p
                                          style={{
                                            fontSize: 12,
                                            textAlign: 'center',
                                            padding: '0 25px',
                                            marginTop: 10,
                                            lineHeight: 2,
                                          }}
                                        >
                                          {renderTitle(Number(((item.ponit / 100) * 100).toFixed(0)))}
                                          {item.languageName}
                                        </p>
                                      </div>
                                    );
                                  }}
                                />
                              </Col>
                            );
                          })}
                        </Row>
                       
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="Candidate Applies" key="2" style={{ maxHeight: 550, overflow: 'auto' }}>
              <Card bordered={false} title="Candidate Applied">
                <Row gutter={16} style={{ marginBottom: 10 }}>
                 
                  <Col span={8}>
                    <Card style={{ width: '100%', height: '120px' }}>
                      <Statistic
                        title="Inprocesing"
                        value={job.candidateInProcess}
                        valueStyle={{ color: '#bc9522' }}
                        prefix={<MehOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card style={{ width: '100%', height: '120px' }}>
                      <Statistic
                        title="Passed"
                        value={job.candidatePass}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<SmileOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card style={{ width: '100%', height: '120px' }}>
                      <Statistic
                        title="Failed"
                        value={job.candidateFail}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<FrownOutlined />}
                      />
                    </Card>
                  </Col>
                </Row>
                <Table
                  pagination={{ pageSize: 50 }}
                  scroll={{ y: 200 }}
                  columns={columns}
                  dataSource={dataSource}
                />
              </Card>
            </TabPane>
            <TabPane tab="Payment" key="3" style={{ maxHeight: 550, overflow: 'auto' }}>
              <Card
                bordered={false}
                title={
                  <Row>
                    <Col span={17}>Transaction Report</Col>
                    <Col span={7}>
                      Total amount paid: <Tag color="green">{convertToCurrencyFormat(job.totalMoneyPay)}</Tag>
                    </Col>
                  </Row>
                }
              >
                <Steps
                  size="small"
                  current={current}
                  items={items}
                  onChange={value => {
                    setCurrent(value);
                  }}
                />
                <Divider />

                <Row justify={'end'}>
                  <Col span={5}>
                    <h3>
                      Money available:{' '}
                      <Tag color="green">{convertToCurrencyFormat(job.availableMoneyOfStage)}</Tag>
                    </h3>
                  </Col>
                </Row>

                <Table
                  pagination={{ pageSize: 50 }}
                  scroll={{ y: 200 }}
                  columns={columns}
                  dataSource={dataSource}
                />
              </Card>
            </TabPane>
          </Tabs> */}
        </div>
      )}
    </>
  );
};

export default JobReport;
