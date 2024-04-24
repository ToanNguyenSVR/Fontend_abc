import { Button, Drawer, Form, Modal, Row, Space, Table } from 'antd';
import { FC, useEffect, useState } from 'react';
import myAxios from '../../../axios/config';

import { CloudUploadOutlined, DeleteOutlined, EditOutlined, FundViewOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from '../../../redux/store';
import JobList from '../../organisms/manage-job';
import './index.scss';
interface ManagerTemplateProps {
  columns: any[];
  modalContent: React.ReactNode;
  fetchData: () => Promise<any>;
  handleDelete?: (id: number) => Promise<any>;
  handleUpload?: (record: any) => Promise<any>;
  handleCreate?: (form: any) => void;
  handleUpdate?: (id: number, form: any) => Promise<any>;
  handleSetCurrentRecord: (callback: any, record: any) => void;
  onCloseModal?: () => void;
  isShowTable?: boolean;
  isShowButton?: boolean;
  isUseDrawer?: boolean;
  isUseAction?: boolean;
  isLoading?: boolean;
  title: string;
}

const ManagerTemplate: FC<ManagerTemplateProps> = ({
  columns,
  handleDelete,
  fetchData,
  handleCreate,
  handleUpdate,
  handleSetCurrentRecord,
  onCloseModal,
  handleUpload,
  modalContent,
  isShowButton = false,
  isShowTable = true,
  isUseDrawer = false,
  isUseAction = true,
  isLoading = false,
  title,
}) => {
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const [jobConfirm, setJobConfirm] = useState<any>(null);
  const [currentDelete, setCurrentDelete] = useState<any>(null);
  const [isShowModalTransaction, setIsShowModalTransaction] = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const [render, setRender] = useState(0);
  const [form] = useForm();
  const [columnsNew, setColumnsNew] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [titleJob, setTitleJob] = useState('');
  const user = useSelector((store: RootState) => store.user);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await fetchData();
      console.log(response.data.data);
      setRecords(response.data.data);
      setLoading(false);
    };

    fetch();
  }, [render]);

  const handleCancel = () => {
    setCurrentRecord(null);
    setCurrentDelete(null);
    setIsShowModalTransaction(false);
    onCloseModal && onCloseModal();
  };

  const handleOpenJob = async () => {
    setIsShowModalTransaction(false);
    try {
      const response = await myAxios.put(`start-stage/${jobConfirm.jobStage.id}?accountId=${user.id}`);
      toast.success('You have successfully opened a job!');
      setRender(render + 1);
    } catch (e: any) {
      console.log(e);

      toast.error(e.response.data);
    }
  };

  const paginationConfig = {
    pageSize: 7,
  };

  const showModal = () => {
    setCurrentRecord({
      id: 0,
    });
  };

  console.log('run');

  useEffect(() => {
    const newArr = [...columns];
    console.log(newArr.length === columns.length);

    if (newArr.length === columns.length) {
      isUseAction &&
        newArr.push({
          title: 'Action',
          align: 'center',
          render: (value: any, record: any) => {
            return (
              <>
                {isShowButton && record.status == 'PENDING' ? (
                  <Button
                    type="primary"
                    style={{ marginRight: 10 }}
                    onClick={async () => {
                      if (!handleUpload) return;
                      setIsShowModalTransaction(true);
                      const response = await handleUpload(record);
                      if (response.status == 200) {
                        setJobConfirm(response.data.data);
                      }
                    }}
                  >
                    Open Job
                  </Button>
                ) : (
                  <></>
                )}
                {(isShowButton && record.status == 'DONE') ||
                (isShowButton && record.status == 'INPROCESS') ? (
                  <Link to={record.id + ''}>
                    <Button type="primary">Report</Button>
                  </Link>
                ) : (
                  <>
                    <Button
                      type="primary"
                      style={{ marginRight: 10, backgroundColor: '#4096ff' }}
                      onClick={() => {
                        handleSetCurrentRecord(setCurrentRecord, record);
                      }}
                    >
                      Update
                    </Button>

                    {handleDelete && (
                      <Button
                        danger
                        type="primary"
                        onClick={() => {
                          setCurrentDelete(record.id);
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </>
                )}
              </>
            );
          },
        });

      setColumnsNew(newArr);
    }
  }, []);

  useEffect(() => {
    console.log(currentRecord);
    if (currentRecord?.title) {
      setTitleJob(currentRecord?.title);
    }
    if (currentRecord) {
      // form.setFieldValue('cityId', currentRecord.city?.id);
      console.log(currentRecord);

      form.setFieldsValue(currentRecord);
    } else {
      form.resetFields();
    }
  }, [currentRecord]);

  return (
    <div className="manager-template">
      {handleCreate && (
        <Row style={{ justifyContent: 'end', marginBottom: 20 }}>
          <Button onClick={showModal} type="primary">
            Add
          </Button>
        </Row>
      )}
      <Modal onCancel={handleCancel} onOk={handleOpenJob} open={isShowModalTransaction}>
        You will have to pay {jobConfirm?.moneyOfNextStage}$ opening a job in this stage. Are you sure you
        want to open it?
      </Modal>
      {isShowTable ? (
        <Table pagination={paginationConfig} loading={loading} dataSource={records} columns={columnsNew} />
      ) : (
        <JobList />
      )}

      {isUseDrawer ? (
        <Drawer
          width={720}
          open={Boolean(currentRecord)}
          onClose={handleCancel}
          title={currentRecord?.id !== 0 ? `Update ${title}` : `Create new ${title}`}
          className="full-width-drawer"
          extra={
            <Space>
              <Button
                loading={loadingButton}
                onClick={() => {
                  form.submit();
                }}
                type="primary"
              >
                Submit
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
              {/* <Button
                type="primary"
                style={{ marginRight: 20 }}
                onClick={() => {
                  setIsShowModalTransaction(true);
                }}
              >
                <CloudUploadOutlined /> */}
              {/* </Button> */}
            </Space>
          }
        >
          <Form
            form={form}
            onFinish={async values => {
              try {
                setLoadingButton(true);
                const response =
                  currentRecord && currentRecord?.id
                    ? handleUpdate && (await handleUpdate(currentRecord.id, values))
                    : handleCreate
                    ? await handleCreate(values)
                    : null;
                setCurrentRecord(null);
                toast.success(response.data.message);
                setRender(render + 1);
                setLoadingButton(false);
              } catch (e: any) {
                toast.error(e.response.data);
              }
            }}
            labelCol={{ span: 4 }}
          >
            {modalContent}
          </Form>
        </Drawer>
      ) : (
        <Modal
          title={currentRecord?.id !== 0 ? `Update ${title}` : `Create new ${title}`}
          width={1000}
          visible={Boolean(currentRecord)}
          onCancel={handleCancel}
          onOk={() => form.submit()}
          confirmLoading={loadingButton}
        >
          <Form
            form={form}
            onFinish={async values => {
              setLoadingButton(true);
              try {
                const response =
                  currentRecord && currentRecord?.id
                    ? handleUpdate && (await handleUpdate(currentRecord.id, values))
                    : handleCreate
                    ? await handleCreate(values)
                    : null;
                setCurrentRecord(null);
                toast.success(response.data.message);
                setRender(render + 1);
              } catch (e: any) {
                toast.error(e.response.data);
              } finally {
                setLoadingButton(false);
              }
            }}
            labelCol={{ span: 4 }}
          >
            {modalContent}
          </Form>
        </Modal>
      )}

      {handleDelete && (
        <Modal
          title={
            <span>
              <DeleteOutlined style={{ marginRight: '8px' }} />
              Confirm Delete
            </span>
          }
          open={Boolean(currentDelete)}
          onOk={async () => {
            setLoadingButton(true);
            try {
              const response = await handleDelete(currentDelete);
              setCurrentDelete(null);
              toast.success(response.data.message);
              setRender(render + 1);
              setLoadingButton(false);
            } catch (e: any) {}
          }}
          onCancel={handleCancel}
          confirmLoading={loadingButton}
        >
          <p>Are you sure you want to delete this item?</p>
        </Modal>
      )}
    </div>
  );
};
export default ManagerTemplate;
