import { ContainerOutlined, FieldTimeOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Form, Input, Modal, Row, Steps, theme } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Dragger from 'antd/es/upload/Dragger';
import { StorageReference, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import myAxios from '../../../axios/config';
import DocumentPreview from '../../../components/organisms/document-preview';
import { storage } from '../../../firebase/config';
import { Company } from '../../../model/company';
import { RootState } from '../../../redux/store';
import './index.scss';
const CompanyDetail = () => {
  const user = useSelector((store: RootState) => store.user);
  const [file, setFile] = useState<File>();
  const [fileURL, setFileURL] = useState<string>();
  const [company, setCompany] = useState<Company>();
  const [isShowModal, setIsShowModal] = useState(false);
  const { token } = theme.useToken();
  const [form] = useForm();
  const [current, setCurrent] = useState(0);
  const param = useParams();
  const navigate = useNavigate();
  const fetch = async () => {
    const response = await myAxios.get(`company/${param.id}`);
    setCompany(response.data.data);
  };

  useEffect(() => {
    if (file) {
      const imageRef: StorageReference = ref(storage, `cv/${file.name}`);
      const metadata = {
        contentType: 'application/pdf',
      };
      uploadBytes(imageRef, file, metadata).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          console.log(url);
          form.setFieldValue('contractUrl', url);
          setFileURL(url);
        });
      });
    }
  }, [file]);

  const onFinish = (values: any) => {
    setCurrent(1);
  };

  const steps = [
    {
      title: 'Add Contract Information',
      content: (
        <Form form={form} onFinish={onFinish}>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Contract Number"
                name="contractNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please enter contract number',
                  },
                ]}
              >
                <Input addonBefore={<ContainerOutlined />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Month of contract"
                name="mothOfContract"
                rules={[
                  {
                    required: true,
                    message: 'Please enter month of contract',
                  },
                ]}
              >
                <Input type="number" addonBefore={<FieldTimeOutlined />} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Contract File"
                name="contractUrl"
                rules={[
                  {
                    required: true,
                    message: 'Please enter contract file',
                  },
                ]}
              >
                <Dragger
                  onChange={file => {
                    setFile(file.file.originFileObj);
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or
                    other banned files.
                  </p>
                </Dragger>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: 'Confirm',
      content: (
        <>
          <Row style={{ justifyContent: 'end' }}>
            <Descriptions column={2}>
              <Descriptions.Item label="Contract Number">
                {form.getFieldValue('contractNumber')}
              </Descriptions.Item>
              <Descriptions.Item label="Month of contract">
                {form.getFieldValue('mothOfContract')}
              </Descriptions.Item>
              <Descriptions.Item label="Contract" span={3} labelStyle={{ display: 'block' }}>
                <a target="_blank" href={fileURL}>
                  <Document
                    file={fileURL}
                    // onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={error => console.error('Error while loading PDF:', error)}
                  >
                    <Page pageNumber={1} />
                  </Document>
                </a>
              </Descriptions.Item>
            </Descriptions>

            <Button
              type="primary"
              onClick={() => {
                setCurrent(0);
              }}
            >
              Edit
            </Button>
          </Row>
        </>
      ),
    },
  ];

  const items = steps.map(item => ({ key: item.title, title: item.title }));

  useEffect(() => {
    fetch();
  }, []);

  if (!company) {
    return <></>;
  }

  const contentStyle: React.CSSProperties = {
    padding: 20,
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  console.log(company);

  return (
    <Card>
      <Descriptions title="Company Info" column={3}>
        <Descriptions.Item span={3}>
          <Row style={{ justifyContent: 'center', width: '100%', marginBottom: 30 }}>
            <img width={250} src={company.logoUrl} alt="" />
          </Row>
        </Descriptions.Item>
        <Descriptions.Item label="Title" style={{ textAlign: 'center' }}>
          {company.title}
        </Descriptions.Item>
        <Descriptions.Item label="Company Name">{company.name}</Descriptions.Item>
        <Descriptions.Item label="Short Name">{company.shortName}</Descriptions.Item>
        <Descriptions.Item label="Website URL">{company.websiteUrl}</Descriptions.Item>
        <Descriptions.Item label="Establish Date">{company.establishDate}</Descriptions.Item>
        <Descriptions.Item label="Tax Code">{company.taxCode}</Descriptions.Item>
        <Descriptions.Item label="Description">{company.description}</Descriptions.Item>
      </Descriptions>
      {company?.status == 'VERIFY' ? (
        <>
          <Row style={{ justifyContent: 'flex-end', marginTop: 20 }}>
            <Button
              type="primary"
              onClick={() => {
                setIsShowModal(true);
              }}
            >
              Upload contract
            </Button>
          </Row>
        </>
      ) : (
        <>
          <Row style={{ justifyContent: 'center', marginTop: 20 }}>
            <DocumentPreview url={company.contracts[0]?.contractUrl} />
          </Row>
        </>
      )}

      <Modal
        width={1000}
        onCancel={() => {
          setIsShowModal(false);
        }}
        open={isShowModal}
        onOk={async () => {
          if (current === 0) {
            form.submit();
          } else {
            const response = await myAxios.post(`company/contract/${param.id}`, form.getFieldsValue());
            toast.success(response.data.message);
            navigate('/admin/company-verify');
          }
        }}
        title="Active company"
      >
        <Steps current={current} items={items} />
        {steps.map((item, index) => {
          return (
            <div style={contentStyle} className={index === current ? 'step-content active' : 'step-content'}>
              {item.content}
            </div>
          );
        })}
      </Modal>
    </Card>
  );
};
export default CompanyDetail;
