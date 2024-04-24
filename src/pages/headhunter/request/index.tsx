import { Col, Form, Input, Row, Select, Tag } from 'antd';
import ManagerTemplate from '../../../components/templates/manager-template';
import myAxios from '../../../axios/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import TextArea from 'antd/es/input/TextArea';
import { formatDistanceToNow } from 'date-fns';

const Request = () => {
  const user = useSelector((store: RootState) => store.user);
  const columns = [
    {
      title: 'To',
      dataIndex: 'emailTo',
      key: 'emailTo',
      align: 'center',
    },
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
      title: 'Time',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'center',
      render: (value: string) => {
        return <>{formatDistanceToNow(new Date(value), { addSuffix: true })}</>;
      },
    },
  ];
  return (
    <div>
      <ManagerTemplate
        isUseAction={false}
        title="Recruiter Stage"
        columns={columns}
        modalContent={
          <>
            <Row gutter={12}>
              <Col span="12">
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Title"
                  name="requestTitle"
                  rules={[{ required: true, message: 'Please enter title' }]}
                >
                  <Input placeholder="Title" />
                </Form.Item>
              </Col>
              <Col span="12">
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Type"
                  name="requestType"
                  rules={[{ required: true, message: 'Please select type' }]}
                >
                  <Select placeholder="Select type" options={[{ value: 'ADD_CV', label: 'Add new CV' }]} />
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
              <Col span="24">
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="To Candidate (or list candidate)"
                  name="emailTo"
                  rules={[{ required: true, message: 'Please enter content' }]}
                >
                  <TextArea placeholder="candidate1@gmail.com, candidate2@gmail.com, ..." />
                </Form.Item>
              </Col>
            </Row>
          </>
        }
        handleUpload={(record: any) => myAxios.get(`/confirm-pay?jobRequest=${record.id}`)}
        handleDelete={id => myAxios.delete(`recruit-stage/${id}`)}
        handleCreate={(form: any) => {
          const listEmail = form.emailTo.split(',');

          form.emailTo = listEmail.map((item: string) => item.trim());

          return myAxios.post(`headhunter/${user.headhunter?.id}/request`, form);
        }}
        handleUpdate={(id: number, form: any) => myAxios.put(`recruit-stage/${id}`, form)}
        fetchData={() => myAxios.get(`headhunter/${user.headhunter?.id}/request`)}
        handleSetCurrentRecord={(callback: any, record: any) => {
          record.cityId = record.city?.id;
          callback(record);
        }}
      />
    </div>
  );
};
export default Request;
