import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Avatar, Button, Col, Modal, Row, Table, Tag } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import CVPreview from '../../../components/organisms/CV-preview';
import { toast } from 'react-toastify';
const CandidateRequest = () => {
  const user = useSelector((store: RootState) => store.user);
  const [request, setRequest] = useState();
  const [CVs, setCVs] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCV, setSelectedCV] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const [render, setRender] = useState(0);

  const columns: any[] = [
    {
      title: 'Title',
      dataIndex: 'requestTitle',
      key: 'requestTitle',
    },
    {
      title: 'Content',
      dataIndex: 'requestContent',
      key: 'requestContent',
    },
    {
      title: 'Type',
      dataIndex: 'requestType',
      key: 'requestType',
      align: 'center',
      render: (value: string) => {
        if (value === 'ADD_CV') return <Tag color="green">{value}</Tag>;
        if (value === 'EXTEND') return <Tag color="yellow">{value}</Tag>;
        if (value === 'UPDATE') return <Tag color="blue">{value}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'requestStatus',
      key: 'requestStatus',
      align: 'center',
      render: (value: string) => {
        if (value === 'DONE') return <Tag color="green">{value}</Tag>;
        if (value === 'WAITING') return <Tag color="yellow">{value}</Tag>;
        if (value === 'REJECT') return <Tag color="red">{value}</Tag>;
      },
    },
    {
      title: 'From',
      dataIndex: ['headhunter', 'fullName'],
      key: 'headhunter',
      align: 'center',
      render: (value: string, record: any) => {
        return (
          <Row style={{ alignItems: 'center', gap: 10 }}>
            <Avatar src={record.headhunter.avatar} />
            {value}
          </Row>
        );
      },
    },
    {
      title: 'Time',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'center',
      render: (value: string) => {
        return <>{formatDistanceToNow(new Date(value), { addSuffix: true })}</>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (value: string, record: any) => {
        if (record.requestStatus === 'WAITING' && record.requestType === 'UPDATE') {
          return (
            <Button
              type="primary"
              onClick={() => {
                setCurrentRecord(record);
                setShowModal(true);
              }}
            >
              Update CV
            </Button>
          );
        }

        if (record.requestStatus === 'WAITING' && record.requestType === 'ADD_CV') {
          return (
            <Button
              type="primary"
              onClick={() => {
                setCurrentRecord(record);
                setShowModal(true);
              }}
            >
              Add CV
            </Button>
          );
        }

        if (record.requestStatus === 'WAITING' && record.requestType === 'EXTEND') {
          return (
            <Row style={{ gap: 10 }}>
              <Button
                type="primary"
                onClick={async () => {
                  try {
                    const response = await myAxios.put(`/candidate/request/${record.id}/extend`, {
                      cvSharedId: record.cvShared.id,
                      accept: true,
                    });
                    toast.success(response.data.message);
                    setRender(render + 1);
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                Extend
              </Button>
              <Button
                type="primary"
                danger
                onClick={async () => {
                  try {
                    const response = await myAxios.put(`/candidate/request/${record.id}/extend`, {
                      cvSharedId: record.cvShared.id,
                      accept: false,
                    });
                    toast.success(response.data.message);
                    setRender(render + 1);
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                Reject
              </Button>
            </Row>
          );
        }
      },
    },
  ];

  const fetch = async () => {
    const response = await myAxios.get(`/candidate/${user.candidate?.id}/request`);
    const responseCV = await myAxios.get(`candidate/${user.candidate?.id}`);

    setRequest(response.data.data);
    setCVs(responseCV.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, [render]);
  console.log(currentRecord);

  return (
    <div>
      <Table loading={loading} columns={columns} dataSource={request} />

      {currentRecord && (
        <Modal
          open={showModal}
          onCancel={() => {
            setShowModal(false);
            setSelectedCV(null);
            setCurrentRecord(null);
          }}
          confirmLoading={loadingButton}
          title="Choose CV"
          width={1000}
          onOk={async () => {
            if (!selectedCV) toast.error('Please select CV');

            if (currentRecord.requestType === 'ADD_CV') {
              setLoadingButton(true);
              try {
                const response = await myAxios.post(
                  `/add-cv/${currentRecord.headhunter.id}/${currentRecord.id}`,
                  {
                    cvId: selectedCV.id,
                  }
                );
                toast.success(response.data.message);
                setRender(render + 1);
                setShowModal(false);
              } catch (e) {
                console.log(e);
              } finally {
                setLoadingButton(false);
              }
            }

            if (currentRecord.requestType === 'UPDATE') {
              setLoadingButton(true);
              try {
                const response = await myAxios.put(`/candidate/request/${currentRecord.id}/update`, {
                  newCvId: selectedCV.id,
                  cvSharedId: currentRecord.cvShared.id,
                  accpet: true,
                });
                toast.success(response.data.message);
                setRender(render + 1);
                setShowModal(false);
              } catch (e) {
                console.log(e);
              } finally {
                setLoadingButton(false);
              }
            }
          }}
        >
          <Row gutter={[16, 24]} style={{ maxHeight: 500, overflow: 'auto' }}>
            {CVs.map(item => {
              return (
                <Col
                  xl={8}
                  lg={8}
                  md={12}
                  sm={24}
                  onClick={() => {
                    setSelectedCV(item);
                  }}
                >
                  <CVPreview data={item} active={selectedCV?.id === item.id} />
                </Col>
              );
            })}
          </Row>
        </Modal>
      )}
    </div>
  );
};
export default CandidateRequest;
