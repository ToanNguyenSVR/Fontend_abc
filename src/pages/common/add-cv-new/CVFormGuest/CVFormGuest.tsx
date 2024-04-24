import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Row, Select, Steps, notification, theme } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FC, useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { StorageReference, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import myAxios from '../../../../axios/config';
import LanguageForm from '../../../../components/organisms/language-form';
import SkillForm from '../../../../components/organisms/skill-form';
import { storage } from '../../../../firebase/config';
import { RootState } from '../../../../redux/store';
import { useNavigate, useParams } from 'react-router-dom';

interface CVFormProps {
  cv: any;
  file: any;
}

const CVFormGuest: FC<CVFormProps> = ({ cv, file }) => {
  const [form] = useForm();
  const param = useParams();
  const navigative = useNavigate();
  const [language, setLanguage] = useState<any[]>([]);
  const [jobTitle, setJobTitle] = useState<any[]>([]);
  const [skill, setSkill] = useState<any[]>([]);
  const [workingMode, setWorkingMode] = useState<any[]>([]);
  const [fileURL, setFileURL] = useState<string | null>();
  const labelColConfig = { span: 24 };
  const user = useSelector((store: RootState) => store.user);
  const { token } = theme.useToken();
  const onFinish = async (values: any) => {
    try {
      const payload = {
        candidateRequest: {
          cvRequest: {
            cvUrl: fileURL,
            linkedInLink: values['linkedInLink'],
            facebookLink: values['facebookLink'],
            githubLink: values['githubLink'],
            summary: values['summary'],
            education: values['education'],
            fullName: values['fullName'],
            email: values['email'],
            address: values['address'],
            phone: values['phone'],
            skillList: values['skillList'],
            certificationRequestList: values['certificationRequestList'],
            experienceRequestList: values['experienceRequestList'],
            languageRequests: values['languageRequests'],
          },
          workingModeId: values['workingModeId'],
          jobTitle: values['jobTitle'],
        },
        candidate: {
          fullName: values['fullName'],
          phone: values['phone'],
          email: values['email'],
        },
      };

      const response = await myAxios.post(`/add-cv/${param.uuid}/${param.requestid}`, payload);
      console.log(response);
      if (response.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Upload Successfully.',
        });
        navigative('/login');
      } else {
        notification.error({
          message: 'Error',
          description: 'An error occurred while submitting your data. Please try again later.',
        });
        console.error(response);
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while communicating with the server. Please try again later.',
      });
      console.error(error);
    }
  };

  const [current, setCurrent] = useState(0);

  function convertDatesToObject(obj: any) {
    function convertDateStringToDate(dateString: string) {
      if (dateString === 'present') {
        return new Date();
      } else {
        return new Date(dateString);
      }
    }

    function convertDateFields(item: any) {
      if (item.dateFrom) {
        item.dateFrom = moment(item.dateFrom);
      }
      if (item.dateTo) {
        item.dateTo = moment(item.dateTo);
      }
      return item;
    }

    if (obj.certificationRequestList) {
      obj.certificationRequestList = obj.certificationRequestList.map(convertDateFields);
    }

    if (obj.experienceRequestList) {
      obj.experienceRequestList = obj.experienceRequestList.map(convertDateFields);
    }

    return obj;
  }
  useEffect(() => {
    if (cv) {
      form.setFieldsValue(convertDatesToObject(JSON.parse(cv)));
    }
  }, [cv]);

  useEffect(() => {
    console.log(file);
    const imageRef: StorageReference = ref(storage, `cv/${file.name}`);
    const metadata = {
      contentType: 'application/pdf',
    };
    uploadBytes(imageRef, file, metadata).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        console.log(url);

        setFileURL(url);
      });
    });
  }, [file]);

  useEffect(() => {
    const fetchData = async () => {
      const programLanguageResponse = await myAxios.get('language');
      const programJobTitle = await myAxios.get('job-title');
      const programSkill = await myAxios.get('skill');
      const responseWorkingMode = await myAxios.get('working-mode');

      setWorkingMode(
        responseWorkingMode.data.data.map((item: any) => {
          return {
            value: item.id,
            label: item.mode,
          };
        })
      );

      setSkill(
        programSkill.data.data.map((item: any) => {
          return {
            value: item.id,
            label: item.skillName,
          };
        })
      );

      setJobTitle(
        programJobTitle.data.data.map((item: any) => {
          return {
            value: item.id,
            label: item.position,
          };
        })
      );

      setLanguage(
        programLanguageResponse.data.data.map((item: any) => {
          return {
            value: item.id,
            label: item.language,
          };
        })
      );
    };

    fetchData();
  }, []);

  const steps = [
    {
      title: 'Information',
      content: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Working Mode"
                labelCol={labelColConfig}
                name="workingModeId"
                rules={[{ required: true, message: 'Please enter the working mode!' }]}
              >
                <Select
                  showSearch
                  placeholder="Select working mode"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={workingMode}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Job Title"
                labelCol={labelColConfig}
                name="jobTitle"
                rules={[{ required: true, message: 'Please enter the jobTitle!' }]}
              >
                <Select
                  showSearch
                  placeholder="Select language"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={jobTitle}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Full Name"
                labelCol={labelColConfig}
                name="fullName"
                rules={[{ required: true, message: 'Please enter the Full Name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Address"
                labelCol={labelColConfig}
                name="address"
                rules={[{ required: true, message: 'Please enter the address!' }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Phone"
                labelCol={labelColConfig}
                name="phone"
                rules={[{ required: true, message: 'Please enter the phone!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                labelCol={labelColConfig}
                name="email"
                rules={[{ required: true, message: 'Please enter the email!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="LinkedIn Link" labelCol={labelColConfig} name="linkedInLink">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Facebook Link" name="facebookLink" labelCol={labelColConfig}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="GitHub Link" labelCol={labelColConfig} name="githubLink">
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Education" name="education" labelCol={labelColConfig}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Summary" name="summary" labelCol={labelColConfig}>
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Certificates',
      content: (
        <Col span={24}>
          <Row>
            <Col span={24}>
              <Form.List name="certificationRequestList">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row gutter={5} style={{ alignItems: 'center' }}>
                        <Col span={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'certificationName']}
                            rules={[{ required: true, message: 'Missing name' }]}
                          >
                            <Input placeholder="Name" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...restField}
                            name={[name, 'organization']}
                            rules={[{ required: true, message: 'Missing organization' }]}
                          >
                            <Input placeholder="Organization" />
                          </Form.Item>
                        </Col>
                        <Col span={3}>
                          <Form.Item
                            {...restField}
                            name={[name, 'certificationUrl']}
                            rules={[{ required: true, message: 'Missing url' }]}
                          >
                            <Input placeholder="URL" />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            {...restField}
                            name={[name, 'dateFrom']}
                            rules={[{ required: true, message: 'Missing date from' }]}
                          >
                            <DatePicker placeholder="from" />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            {...restField}
                            name={[name, 'dateTo']}
                            rules={[{ required: true, message: 'Missing date to' }]}
                          >
                            <DatePicker placeholder="to" />
                          </Form.Item>
                        </Col>
                        <Col span={2}>
                          <Form.Item>
                            <Button danger type="primary" onClick={() => remove(name)}>
                              <MinusCircleOutlined />
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
        </Col>
      ),
    },
    {
      title: 'Experience',
      content: (
        <>
          <Row gutter={16}>
            <Col span={24}>
              <Form.List name="experienceRequestList">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row gutter={10} style={{ alignItems: 'center' }}>
                        <Col span={22}>
                          <Row gutter={5}>
                            <Col span={8}>
                              <Form.Item
                                {...restField}
                                name={[name, 'company']}
                                rules={[{ required: true, message: 'Missing company name' }]}
                              >
                                <Input placeholder="Company Name" />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                {...restField}
                                name={[name, 'jobTitle']}
                                rules={[{ required: true, message: 'Missing job title' }]}
                              >
                                <Input placeholder="Job Title" />
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item
                                {...restField}
                                name={[name, 'dateFrom']}
                                rules={[{ required: true, message: 'Missing date from' }]}
                              >
                                <DatePicker placeholder="From" />
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item
                                {...restField}
                                name={[name, 'dateTo']}
                                rules={[{ required: true, message: 'Missing date to' }]}
                              >
                                <DatePicker placeholder="To" />
                              </Form.Item>
                            </Col>

                            <Col span={24}>
                              <Form.Item
                                {...restField}
                                name={[name, 'jobDescription']}
                                rules={[{ required: true, message: 'Missing date to' }]}
                              >
                                <TextArea placeholder="Job Description" />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={2}>
                          <Form.Item>
                            <Button danger type="primary" onClick={() => remove(name)}>
                              <MinusCircleOutlined />
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Skill',
      content: (
        <>
          <Col span={24}>
            <Row gutter={16}>
              <Col span={24}>
                <SkillForm />
              </Col>
            </Row>
          </Col>
        </>
      ),
    },
    {
      title: 'Language',
      content: (
        <>
          <Col span={24}>
            <Row gutter={16}>
              <Col span={24}>
                <LanguageForm />
              </Col>
            </Row>
          </Col>
        </>
      ),
    },
  ];
  const items = steps.map(item => ({ key: item.title, title: item.title }));

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    padding: 20,
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div className="cv-form">
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={value => {
          console.log(value);
        }}
      >
        <Steps current={current} items={items} />
        {steps.map((item, index: number) => {
          return (
            <div style={contentStyle} className={current === index ? 'content active' : 'content'}>
              {item.content}
            </div>
          );
        })}
      </Form>

      {current < steps.length - 1 && (
        <Button type="primary" onClick={() => next()}>
          Next
        </Button>
      )}
      {current === steps.length - 1 && (
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          Done
        </Button>
      )}
      {current > 0 && (
        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
          Previous
        </Button>
      )}
    </div>
  );
};
export default CVFormGuest;
