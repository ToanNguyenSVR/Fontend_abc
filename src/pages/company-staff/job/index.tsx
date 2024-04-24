import { LoadingOutlined, PlusOutlined, TeamOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Popover,
  Row,
  Select,
  Steps,
  StepsProps,
  Tag,
  Upload,
  theme,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { StorageReference, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import myAxios from '../../../axios/config';
import LanguageForm from '../../../components/organisms/language-form';
import SkillForm from '../../../components/organisms/skill-form';
import ManagerTemplate from '../../../components/templates/manager-template';
import { storage } from '../../../firebase/config';
import { RootState } from '../../../redux/store';
import './index.scss';
const JobStaff = () => {
  const user = useSelector((store: RootState) => store.user);
  const { token } = theme.useToken();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [jobTitle, setJobTitle] = useState<any[]>([]);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [workingMode, setWorkingMode] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [recruiterStages, setRecruiterStages] = useState<any>([]);
  const labelColConfig = { span: 24 };
  const [currentStage, setCurrentStage] = useState(0);

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseRecruiterStage = await myAxios.get('recruit-stage');
      const programJobTitle = await myAxios.get('job-title');
      const responseWorkingMode = await myAxios.get('working-mode');
      const responseCampus = await myAxios.get(`company/${user.company?.id}/campus`);
      const responseStaff = await myAxios.get(`/staff/${user.company?.id}`);
      setRecruiterStages(responseRecruiterStage.data.data);
      console.log(recruiterStages);

      setCampuses(
        responseCampus.data.data.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          };
        })
      );
      setStaff(
        responseStaff.data.data.map((item: any) => {
          return {
            value: item.id,
            label: item.fullname,
          };
        })
      );

      setWorkingMode(
        responseWorkingMode.data.data.map((item: any) => {
          return {
            value: item.id,
            label: item.mode,
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
    };

    fetchData();
  }, []);

  const handleFileChange = (info: any) => {
    if (info.file) {
      setSelectedImage(info.file);
    }

    if (info.file) {
      setLoading(true);
      const imageRef: StorageReference = ref(storage, `avatarUser/${info.file.name + v4()}`);
      uploadBytes(imageRef, info.file).then(snapshot => {
        getDownloadURL(snapshot.ref).then((url: string) => {
          setLoading(false);
          setSelectedImage(url);
        });
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload image</div>
    </div>
  );

  const customDot: StepsProps['progressDot'] = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          <h4> {recruiterStages[index].description}</h4>
          <h5>Base Stage Reward: {recruiterStages[index].baseStageRewardPresent}$ </h5>
        </span>
      }
    >
      {dot}
    </Popover>
  );

  const steps = [
    {
      title: 'Job Description',
      content: (
        <>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item labelCol={labelColConfig} name="image">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  action="/upload"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleFileChange}
                >
                  {selectedImage ? (
                    <img src={selectedImage} alt="avatar" style={{ width: '100%' }} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="title" label="Title" labelCol={labelColConfig}>
                <Input placeholder="Title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="workingMode" label="Working Mode" labelCol={labelColConfig}>
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
              <Form.Item name="campus" label="Campus" labelCol={labelColConfig}>
                <Select
                  showSearch
                  placeholder="Select campus"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={campuses}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="jobTitle" label="Job Title" labelCol={labelColConfig}>
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
              <Form.Item name="level" label="Level" labelCol={labelColConfig}>
                <Select
                  showSearch
                  placeholder="Select level"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    { label: 'Intern', value: 'INTERN' },
                    { label: 'Fresher', value: 'FRESHER' },
                    { label: 'Junior', value: 'JUNIOR' },
                    { label: 'Senior', value: 'SENIOR' },
                    { label: 'Master', value: 'MASTER' },
                    { label: 'All Level', value: 'ALLLEVEL' },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="salaryForm" label="Salary From" labelCol={labelColConfig} initialValue={100}>
                <Input addonBefore="$" type="number" min={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="salaryTo" label="Salary To" labelCol={labelColConfig} initialValue={700}>
                <Input addonBefore="$" type="number" min={1} defaultValue={700} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="summary" label="Summary" labelCol={labelColConfig}>
                <TextArea />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="responsibility" label="Responsibility" labelCol={labelColConfig}>
                <TextArea />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="jobDescription" label="Job Description" labelCol={labelColConfig}>
                <TextArea />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="requirement" label="Requirement" labelCol={labelColConfig}>
                <TextArea />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="benefit" label="Benefit" labelCol={labelColConfig}>
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Skills',
      content: <SkillForm />,
    },
    {
      title: 'Language',
      content: <LanguageForm />,
    },
    {
      title: 'Settings',
      content: (
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={`reward`} label="Reward" labelCol={labelColConfig}>
              <Input addonBefore="$" placeholder="Reward" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={`employee_quantity`} label="Employee Quantity" labelCol={labelColConfig}>
              <Input addonBefore={<TeamOutlined />} placeholder="Employee Quantity" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="assignTo" label="Staff" labelCol={labelColConfig}>
              <Select
                showSearch
                placeholder="Select Staff"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={staff}
              />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Stage',
      content: (
        <>
          <Steps
            current={currentStage}
            progressDot={customDot}
            items={recruiterStages.map((item: any) => {
              return {
                title: item.nameProcess,
                content: <h1></h1>,
              };
            })}
          />

          {recruiterStages.map((item: any, index: number) => (
            <div
              key={item.id}
              className={currentStage === index ? 'step-child-content active' : 'step-child-content'}
            >
              <Form.Item
                style={{ display: 'none' }}
                name={`recruiterStages[${index}].recruitStageId`}
                initialValue={item.id}
              >
                <Input />
              </Form.Item>
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item
                    name={`recruiterStages[${index}].createDate`}
                    label="From Date"
                    labelCol={labelColConfig}
                  >
                    <DatePicker placeholder="From Date" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={`recruiterStages[${index}].finishDate`}
                    label="To Date"
                    labelCol={labelColConfig}
                  >
                    <DatePicker placeholder="To Date" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={`recruiterStages[${index}].rewardPercent`}
                    label="Reward Percent"
                    labelCol={labelColConfig}
                  >
                    <Input type="number" min={1} max={100} addonBefore="%" placeholder="Reward Percent" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={`recruiterStages[${index}].personQuantity`}
                    label="Person Quantity"
                    labelCol={labelColConfig}
                  >
                    <Input addonBefore={<TeamOutlined />} placeholder="Person Quantity" />
                  </Form.Item>
                  <Form.Item name="status" hidden></Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={`recruiterStages[${index}].stageId`}
                    label="From Date"
                    hidden
                    labelCol={labelColConfig}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          ))}

          <Row style={{ justifyContent: 'end', marginRight: 20 }}>
            {currentStage < recruiterStages.length - 1 && (
              <Button type="primary" onClick={() => setCurrentStage(currentStage + 1)}>
                Next
              </Button>
            )}
            {currentStage === recruiterStages.length - 1 && <></>}
            {currentStage > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => setCurrentStage(currentStage - 1)}>
                Previous
              </Button>
            )}
          </Row>
        </>
      ),
    },
  ];

  const items = steps.map(item => ({ key: item.title, title: item.title }));

  const onFinish = (values: any) => {
    const data = {
      jobRequest: {
        title: 'string',
        summary: 'dddd',
        level: 'INTERN',
        salaryForm: 0,
        salaryTo: 0,
        reward: 0,
        balance: 0,
        image: 'string',
        employee_quantity: 0,
        responsibility: 'string',
        jobDescription: 'string',
        requirement: 'stringstringstringst',
        benefit: 'stringstringstringst',
        status: 'PENDING',
        skillList: [1, 2],
        languageRequests: [
          {
            ponit: 0,
            best: true,
            languageId: 2,
          },
        ],
      },
      staffId: 1,
      workingModeId: 1,
      jobTitle: 1,
      campusId: 1,
    };

    myAxios.post('job', data).then(res => {
      console.log(res);
    });
    // Add logic to handle form submission here
  };
  const getRandomName = () => {
    const randomNames = [
      'John',
      'Jane',
      'Michael',
      'Emily',
      'David',
      'Sarah',
      'James',
      'Jennifer',
      'Robert',
      'Linda',
    ];
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    return randomNames[randomIndex];
  };
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (value: string) => {
        return <Avatar src={value} size={50}></Avatar>;
      },
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      align: 'center',
    },
    {
      title: 'Reward',
      dataIndex: 'reward',
      key: 'reward',
      align: 'center',
    },

    {
      title: 'Employee Quantity',
      dataIndex: 'employee_quantity',
      key: 'employee_quantity',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value: string) => {
        if (value == 'PENDING') return <Tag color="red">{value}</Tag>;
        if (value == 'ACTIVE') return <Tag color="success">{value}</Tag>;
        if (value == 'INPROCESS') return <Tag color="processing">{value}</Tag>;
        if (value == 'DONE') return <Tag color="green">{value}</Tag>;
      },
      align: 'center',
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="job">
      <ManagerTemplate
        title="Job"
        isUseDrawer={false}
        isShowButton={true}
        onCloseModal={() => {
          setCurrent(0);
          setCurrentStage(0);
        }}
        columns={columns}
        isShowTable={true}
        modalContent={<></>}
        fetchData={() => myAxios.get(`/job-assign/${user.companyStaff?.id}`)}
        handleSetCurrentRecord={(callback: any, record: any) => {
          record?.recruiterStages?.forEach((item: any, index: number) => {
            if (item) {
              record[`recruiterStages[${index}].createDate`] = moment(item.createdDate);
              record[`recruiterStages[${index}].finishDate`] = moment(item.finishDate);
              record[`recruiterStages[${index}].rewardPercent`] = item.rewardPercent;
              record[`recruiterStages[${index}].personQuantity`] = item.personQuantity;
              record[`recruiterStages[${index}].recruitStageId`] = item.recruitStageId;
              record[`recruiterStages[${index}].stageId`] = item?.stageId;
            }
          });
          setSelectedImage(record.image);
          callback(record);
        }}
      />
    </div>
  );
};
export default JobStaff;
