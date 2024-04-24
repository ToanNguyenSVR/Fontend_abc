import { FilePdfOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, Drawer, Modal, Popover, Row, Statistic, Table, Tag } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import myAxios from '../../../axios/config';
import { ApplyStage, Job } from '../../../model/job';
import { RootState } from '../../../redux/store';
import obfuscateInput from '../../../utils/hide';
import CVDetail from '../CV-detail';
import './index.scss';
import { Headhunter, User } from '../../../model/user';
import Rating from '../../../pages/headhunter/rating-headhunter';
interface CVTableProps {
  isShow: boolean;
  applystage: ApplyStage[];

  setRender: () => void;
  job: Job | null;
  setCurrentJobId: () => void;
  setCurrent: () => void;
  nameButton: string;
}
const CVTable: React.FC<CVTableProps> = ({
  isShow,
  job,
  applystage,
  setRender,
  setCurrentJobId,
  setCurrent,
  nameButton,
}) => {
  const user = useSelector((store: RootState) => store.user);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stageID, setstageID] = useState<number | undefined>(0);
  const [isShowModalTransaction, setIsShowModalTransaction] = useState(false);
  const [cvUrl, setCVUrl] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [applyId, setApplyId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [current1, setCurrent1] = useState<number>(0);
  const [length, setLength] = useState<number | undefined>(0);
  const [headhunterId, setHeadhunterId] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const [jobConfirm, setJobConfirm] = useState<any>(null);
  const handleConfirm = async (values: any) => {
    const dataConfirm = {
      accountCompanyId: user.id,
      resultApply: 'ACCEPT',
    };
    try {
      const response = await myAxios.put(`confirm-apply/${values}`, dataConfirm);
      toast.success(response.data.message);
      setRender();
    } catch (e: any) {
      toast.error(e.response.data);
    }
  };
  const handleReject = (values: any) => {
    if (!loading) {
      setIsModalOpen(true);
      setApplyId(values);
    }
  };
  const handleOk = async () => {
    setLoading(true);
    const dataConfirm = {
      accountCompanyId: user.id,
      resultApply: 'REJECT',
      note: reason,
    };
    try {
      const response = await myAxios.put(`confirm-apply/${applyId}`, dataConfirm);
      if (response.status == 200) {
        toast.success('Reject success!');
        setRender();
        setIsModalOpen(false);
        setLoading(false);
      }
    } catch (e: any) {
      toast.error(e.response.data);
    }
  };
  const handleNextStage = async (values: any) => {
    setLoading(true);
    try {
      const response = await myAxios.get(`/confirm-pay?jobRequest=${stageID}`);
      if (response.status == 200) {
        setJobConfirm(response.data.data);
        setIsShowModalTransaction(true);
        setLoading(false);
      }
    } catch (e: any) {
      setLoading(false);
    }
  };
  const showDrawer = (value: any) => {
    setOpen(true);
    setCVUrl(value);
  };

  const onClose = () => {
    setOpen(false);
  };
  const columns: any[] = [
    {
      title: 'Candidate Name',
      dataIndex: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (value: string) => {
        if (value == 'IN_PROCESS') return <Tag color="yellow">{value}</Tag>;
        if (value == 'PASS') return <Tag color="green">{value}</Tag>;
        if (value == 'FAIL') return <Tag color="red">{value}</Tag>;
      },
    },
    {
      title: 'CV Preview',
      dataIndex: 'cv',
      align: 'center',
      render: (value: number, record: any) => {
        return (
          <Button
            icon={<FilePdfOutlined />}
            onClick={() => {
              showDrawer(value);
              setIsAccepted(record.status === 'PASS');
            }}
          ></Button>
        );
      },
    },
    {
      title: 'Headhunter',
      dataIndex: 'headhunter',
      align: 'center',
      render: (headhunter: User, record: any) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
            }}
            onClick={() => {
              setHeadhunterId(headhunter.headhunter?.id);
            }}
          >
            <Avatar src={headhunter.avatar ? headhunter.avatar : '/logo-icon.png'} />
            <span
              style={{
                fontWeight: 500,
                textAlign: 'left',
              }}
            >
              {headhunter.fullName}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'appliedID',
      align: 'center',
      render: (value: number, record: any) => {
        if (record.status === 'IN_PROCESS') {
          return (
            <RowItem
              handleConfirm={async (value, set) => {
                set(true);
                await handleConfirm(value);
                set(false);
              }}
              handleReject={(value, set) => {
                handleReject(value);
                console.log(set);

                set(false);
              }}
              value={value}
            />
          );
        }
        if (record.status == 'PASS') {
          return <Tag color="green">ACCEPTED</Tag>;
        }
        if (record.status == 'FAIL') {
          return <Tag color="red">REJECTED</Tag>;
        }
      },
    },
  ];
  useEffect(() => {
    let current: number;

    job?.stageResponseList.forEach((item, index: number) => {
      if (item.jobStageStatus == 'INPROCESS') {
        current = index;
      }
      if (item.jobStageStatus == 'CLOSE') {
        current = index;
      }
    });
    setCurrent1(current!);
    setstageID(job?.stageResponseList[current!].stageId);
    setLength(job?.stageResponseList.length);
  }, [job]);

  const dataSource = applystage.map(item => {
    return {
      name: item.cv.fullName,
      phone: !isShow && item.status != 'PASS' ? obfuscateInput(item.cv.phone) : item.cv.phone,
      status: item.status,
      appliedID: item.id,
      cv: item.cv.id,
      headhunter: item.headhunter,
    };
  });
  useEffect(() => {
    dataSource ? setIsLoading(false) : setIsLoading(true);
  });
  const handleCancel = () => {
    setIsShowModalTransaction(false);
    setIsModalOpen(false);
  };
  const handleOpenJob = async () => {
    setLoading(true);
    setIsShowModalTransaction(false);
    try {
      const response = await myAxios.put(
        `start-stage/${jobConfirm.presentStageResponse.stageId}?accountId=${user.id}`
      );

      if (response.data.data.jobStageStatus == 'CLOSE') {
        setCurrentJobId();
      }
      setCurrent();
      toast.success(response.data.message);
      setRender();
      setLoading(false);
    } catch (e: any) {
      console.log(e);

      toast.error(e.response.data);
    }
  };
  const handleCloseJob = async () => {
    setLoading(true);
    setIsShowModalTransaction(false);
    try {
      const response = await myAxios.put(
        `start-stage/${jobConfirm.presentStageResponse.stageId}?accountId=${user.id}`
      );

      if (response.data.data.jobStageStatus == 'CLOSE') {
        setCurrentJobId();
      }
      setCurrent();
      toast.success(response.data.message);
      setRender();
      setLoading(false);
    } catch (e: any) {
      console.log(e);

      toast.error(e.response.data);
    }
  };
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#000',
    // lineHeight: '160px',
    // textAlign: 'center',
    backgroundColor: '#5996f7',
  };
  const content = (
    <div>
      {jobConfirm && (
        <>
          <h5>Reward {jobConfirm.presentStageResponse.rewardPredictedForOne}$/candidate</h5>
          <h5>Quantity request: {jobConfirm.presentStageResponse.personTargetInStage} candidate</h5>
          <h5>Platform fee in stage: {jobConfirm.presentStageResponse.platformFee}%</h5>
        </>
      )}
    </div>
  );
  const content1 = (
    <div>
      {jobConfirm && (
        <>
          <h5>Reward {jobConfirm.nextStageResponse.rewardPredictedForOne}$/candidate</h5>
          <h5>Quantity request: {jobConfirm.nextStageResponse.personQuantity} candidate</h5>
          <h5>Platform fee in stage: {jobConfirm.nextStageResponse.platformFee}%</h5>
        </>
      )}
    </div>
  );
  return (
    <>
      <Modal
        confirmLoading={loading}
        title="Reject Candidate"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea
          placeholder="Ex: Not suitable. Sufficient number of applicants..."
          autoSize={{ minRows: 2, maxRows: 6 }}
          onChange={(e: any) => {
            setReason(e.target.value);
          }}
        />
      </Modal>
      <Modal
        title="Headhunter Rating"
        style={{
          top: '12px',
          height: '82vh',
        }}
        open={Boolean(headhunterId)}
        onOk={() => {
          setHeadhunterId(undefined);
        }}
        onCancel={() => setHeadhunterId(undefined)}
        width={`1000`}
      >
        <Rating useCard={false} headhunterId={headhunterId!} />
      </Modal>
      <Modal
        width={700}
        title="Job confirm"
        onCancel={handleCancel}
        onOk={handleOpenJob}
        okText="Pay"
        open={isShowModalTransaction}
        footer={[]}
      >
        {jobConfirm?.close ? (
          <>
            <Card
              title={
                <>
                  {jobConfirm?.presentStageResponse?.stageName}
                  <Popover content={content}>
                    <Button style={{ border: 'none' }} icon={<InfoCircleOutlined />}></Button>
                  </Popover>
                </>
              }
            >
              <Row gutter={16}>
                <Col>
                  <Statistic
                    title={<Tag color="default">CV Applied in Stage</Tag>}
                    value={jobConfirm?.presentStageResponse?.cvAppliedInStage}
                    prefix={<UserOutlined />}
                  />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title={<Tag color="success">CV Passed in Stage</Tag>}
                    value={jobConfirm?.presentStageResponse?.cvPassedInStage}
                    prefix={<UserOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title={<Tag color="yellow">CV InProcess in Stage</Tag>}
                    value={jobConfirm?.presentStageResponse?.cvInProcessInStage}
                    prefix={<UserOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title={<Tag color="red">CV Failed in Stage</Tag>}
                    value={jobConfirm?.presentStageResponse?.cvFailInStage}
                    prefix={<UserOutlined />}
                  />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    suffix={'$'}
                    title="Money Blocked"
                    value={jobConfirm?.presentStageResponse?.blockMoney}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    suffix={'$'}
                    title="Money Paid"
                    value={jobConfirm?.presentStageResponse?.paidMoney}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    suffix={'$'}
                    title="Money Return"
                    value={jobConfirm?.presentStageResponse?.returnMoney}
                  />
                </Col>
              </Row>
            </Card>
            <Row style={{ marginTop: 10 }}>
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}>
                {' '}
                <Button loading={loading} onClick={handleOpenJob} type="primary">
                  Close Job
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Card
              title={
                <>
                  {jobConfirm?.presentStageResponse?.stageName}
                  <Popover content={content}>
                    <Button style={{ border: 'none' }} icon={<InfoCircleOutlined />}></Button>
                  </Popover>
                </>
              }
            >
              <Row gutter={16}>
                <Col>
                  <Statistic
                    title={<Tag color="default">CV Applied in Stage</Tag>}
                    value={jobConfirm?.presentStageResponse?.cvAppliedInStage}
                    prefix={<UserOutlined />}
                  />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title={<Tag color="success">CV Passed in Stage</Tag>}
                    value={jobConfirm?.presentStageResponse?.cvPassedInStage}
                    prefix={<UserOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title={<Tag color="yellow">CV InProcess in Stage</Tag>}
                    value={jobConfirm?.presentStageResponse?.cvInProcessInStage}
                    prefix={<UserOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title={<Tag color="red">CV Failed in Stage</Tag>}
                    value={jobConfirm?.presentStageResponse?.cvFailInStage}
                    prefix={<UserOutlined />}
                  />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    suffix={'$'}
                    title="Money Blocked"
                    value={jobConfirm?.presentStageResponse?.blockMoney}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    suffix={'$'}
                    title="Money Paid"
                    value={jobConfirm?.presentStageResponse?.paidMoney}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    suffix={'$'}
                    title="Money Return"
                    value={jobConfirm?.presentStageResponse?.returnMoney}
                  />
                </Col>
              </Row>
            </Card>
            <Divider />
            <Card
              title={
                <>
                  {jobConfirm?.nextStageResponse?.stageName}
                  <Popover content={content1}>
                    <Button style={{ border: 'none' }} icon={<InfoCircleOutlined />}></Button>
                  </Popover>
                </>
              }
            >
              <Row gutter={16}>
                <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} span={12}>
                  <Statistic
                    suffix={'$'}
                    title="Money Blocked"
                    value={jobConfirm?.nextStageResponse?.rewardPredictedForALL}
                  />
                </Col>
                <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} span={12}>
                  <Statistic
                    suffix={'$'}
                    title="Money Paid"
                    value={jobConfirm?.nextStageResponse?.totalMoney}
                  />
                </Col>
              </Row>
            </Card>
            <Row style={{ marginTop: 10 }}>
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}>
                <Button loading={loading} onClick={handleOpenJob} type="primary">
                  Pay
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Modal>
      <Drawer width={640} placement="right" closable={true} onClose={onClose} open={open}>
        <CVDetail isShow={isShow || isAccepted} cvId={cvUrl} />
      </Drawer>
      <Table
        loading={isLoading}
        pagination={{
          pageSize: 7,
        }}
        columns={columns}
        dataSource={dataSource}
      />

      <Button loading={loading} style={{ marginBottom: 20 }} onClick={handleNextStage}>
        {nameButton}
      </Button>
    </>
  );
};
export default CVTable;

interface RowItemProps {
  handleConfirm: (value: any, set: any) => void;
  handleReject: (value: any, set: any) => void;
  value: any;
}

const RowItem: FC<RowItemProps> = ({ handleConfirm, handleReject, value }) => {
  const [loading, setLoading] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  return (
    <Row style={{ justifyContent: 'center', gap: 10 }}>
      <Button
        style={{ backgroundColor: '#00b96b' }}
        loading={loading}
        onClick={() => {
          setLoading(true);
          handleConfirm(value, setLoading);
        }}
        type="primary"
      >
        Accept
      </Button>
      <Button
        loading={loadingReject}
        danger
        onClick={() => {
          setLoadingReject(true);
          handleReject(value, setLoadingReject);
        }}
        type="primary"
      >
        Reject
      </Button>
    </Row>
  );
};
