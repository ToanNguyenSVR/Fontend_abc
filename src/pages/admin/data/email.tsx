import { Col, Form, Input, Row, Select, Tag } from 'antd';
import ManagerTemplate from '../../../components/templates/manager-template';
import myAxios from '../../../axios/config';
import TextArea from 'antd/es/input/TextArea';

const EmailTemplate = () => {
  const columns = [
    {
      title: 'Footer',
      dataIndex: 'footer',
      key: 'footer',
    },
    {
      title: 'Greeting',
      dataIndex: 'greeting',
      key: 'greeting',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (value: string) => {
        return <div style={{ maxWidth: 400 }}>{value}</div>;
      },
    },
    {
      title: 'Footer',
      dataIndex: 'footer',
      key: 'footer',
    },
    {
      title: 'EmailType',
      dataIndex: 'emailType',
      key: 'emailType',
      render: (value: string) => {
        let tagColor = '';
        switch (value) {
          case 'VERIFY_CANDIDATE':
            tagColor = 'blue';
            break;
          case 'NOTI_HEADHUNTER':
            tagColor = 'green';
            break;
          case 'NOTI_COMPANY':
            tagColor = 'orange';
            break;
          case 'NOTI_COMPANY_EXPIRED':
            tagColor = 'red';
            break;
          case 'NOTI_CANDIDATE':
            tagColor = 'purple';
            break;
          default:
            tagColor = 'gray';
            break;
        }
        return <Tag color={tagColor}>{value}</Tag>;
      },
    },
  ];
  return (
    <ManagerTemplate
      title="email tempalate"
      columns={columns}
      modalContent={
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Greeting"
              name="greeting"
              rules={[{ required: true, message: 'Please enter greeting' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Subject"
              name="subject"
              rules={[{ required: true, message: 'Please enter subject' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="EmailType"
              name="emailType"
              rules={[{ required: true, message: 'Please enter emailType' }]}
            >
              <Select
                options={[
                  {
                    label: 'Verify Canidate',
                    value: 'VERIFY_CANDIDATE',
                  },
                  {
                    label: 'Notification to headhunter',
                    value: 'NOTI_HEADHUNTER',
                  },
                  {
                    label: 'Notification to company',
                    value: 'NOTI_COMPANY',
                  },
                  {
                    label: 'Notification company about expired',
                    value: 'NOTI_COMPANY_EXPIRED',
                  },
                  {
                    label: 'Notification to candidate',
                    value: 'NOTI_CANDIDATE',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Content"
              name="content"
              rules={[{ required: true, message: 'Please enter content' }]}
            >
              <TextArea rows={7} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Footer"
              name="footer"
              rules={[{ required: true, message: 'Please enter footer' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      }
      handleUpload={(record: any) => myAxios.get(`/email-template/${record.id}`)}
      handleCreate={(form: any) => myAxios.post(`email-template`, form)}
      handleUpdate={(id: number, form: any) => myAxios.put(`/email-template/${id}`, form)}
      fetchData={() => myAxios.get('/email-template')}
      handleSetCurrentRecord={(callback: any, record: any) => {
        record.cityId = record.city?.id;
        callback(record);
      }}
    />
  );
};
export default EmailTemplate;
