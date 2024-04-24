import React, { FC, useEffect, useState } from 'react';

import './index.scss';
import { Document, Page, pdfjs } from 'react-pdf';
import myAxios from '../../../axios/config';
import { Button, Col, Drawer, Form, Input, Modal, Progress, Row } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import TextArea from 'antd/es/input/TextArea';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import CVDetail from '../CV-detail';

interface CVPreviewProps {
  data: any;
  active?: boolean;
  setRender?: () => void;
}
const CVPreview: FC<CVPreviewProps> = ({ data, active = false, setRender }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const user = useSelector((store: RootState) => store.user);
  const [isShowModal, setShowModal] = useState(false);
  const [idCV, setIdCV] = useState<number | null>(null);
  const [requestType, setRequestType] = useState<string | null>(null);
  const [currentCVId, setCurrentCVId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm();
  // useEffect(() => {
  //   myAxios.get(
  //     'https://firebasestorage.googleapis.com/v0/b/refferity.appspot.com/o/bn-ch290220.jpg?alt=media&token=fdbae74c-c54c-4df7-b551-9e71b4e92b5f'
  //   );
  // }, [data]);

  const handleDetail = () => {
    setCurrentCVId(data.id);
    console.log(data.id);
  };

  const onFinish = async (values: any) => {
    values.requestType = requestType;
    values.cvSharedId = data.cvShared.sharedId;
    try {
      const response = await myAxios.post(`headhunter/${user.headhunter?.id}/request`, values);
      toast.success(response.data.data);
      setShowModal(false);
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
  };
  const showModal = (id: number) => {
    setIsModalVisible(true);
    setIdCV(id);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const response = await myAxios.delete(`/cv/${idCV}`);
      if (response.status == 200) {
        setIsModalVisible(false);
        toast.success('Delete successfully!');
        setRender && setRender();
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={`cv-preview ${active && 'active'}`}>
      <Document
        file={data.cvUrl}
        // onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={error => console.error('Error while loading PDF:', error)}
      >
        <Page pageNumber={1} />
      </Document>

      <div className="score">
        {data?.score && (
          <Progress
            type="circle"
            strokeWidth={7}
            percent={data.score}
            size={60}
            format={() => `${Number(data?.score).toFixed(0)}%`}
          />
        )}
      </div>

      <div className="cv-preview__data">
        {new Date() > new Date(data?.cvShared?.expireDate) ? (
          <>
            CV Expired
            <Button
              type="primary"
              onClick={async () => {
                setRequestType('EXTEND');
                setShowModal(true);
              }}
            >
              Extend Request
            </Button>
          </>
        ) : (
          <>
            <h1>
              <span>{data.fullName}</span>
              <span>{data.jobTitle}</span>
            </h1>

            <div className="action">
              {user.headhunter ? (
                <>
                  <h1>
                    {data?.cvShared?.expireDate && formatDistanceToNow(new Date(data?.cvShared?.expireDate))}
                  </h1>
                  <Button onClick={handleDetail} type="primary">
                    Detail
                  </Button>
                  <Button
                    type="primary"
                    onClick={async () => {
                      setRequestType('EXTEND');
                      setShowModal(true);
                    }}
                  >
                    Extend Request
                  </Button>
                  <Button
                    type="primary"
                    onClick={async () => {
                      setRequestType('UPDATE');
                      setShowModal(true);
                    }}
                  >
                    Update Request
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleDetail} type="primary">
                    Detail
                  </Button>

                  <Button danger onClick={() => showModal(data.id)}>
                    Delete
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <Modal
        open={isModalVisible}
        title="Confirm Delete"
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
      <Modal
        open={isShowModal}
        title={'Request to ' + data.fullName}
        onCancel={() => {
          setShowModal(false);
        }}
        onOk={() => {
          form.submit();
        }}
      >
        <Form form={form} onFinish={onFinish}>
          <Row gutter={12}>
            <Col span="24">
              <Form.Item
                labelCol={{ span: 24 }}
                label="Title"
                name="requestTitle"
                rules={[{ required: true, message: 'Please enter title' }]}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>
            <Col span="24">
              <Form.Item
                labelCol={{ span: 24 }}
                label="Content"
                name="requestContent"
                rules={[{ required: true, message: 'Please enter content' }]}
              >
                <TextArea placeholder="Content" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Drawer
        open={Boolean(currentCVId)}
        title="CV Detail"
        onClose={() => {
          setCurrentCVId(null);
        }}
      >
        {currentCVId && <CVDetail cvId={currentCVId!} />}
      </Drawer>
    </div>
  );
};

export default CVPreview;
