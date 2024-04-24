import { Col, Form, Input, Row } from 'antd';
import ManagerTemplate from '../../../components/templates/manager-template';
import myAxios from '../../../axios/config';

const RecruiterStage = () => {
  const columns = [
    {
      title: 'No Of Stage',
      dataIndex: 'noOfStage',
      key: 'noOfStage',
      align: 'center',
    },
    {
      title: 'Name Process',
      dataIndex: 'nameProcess',
      key: 'nameProcess',
    },
    {
      title: 'Min Reward Present',
      dataIndex: 'baseStageRewardPresent',
      key: 'baseStageRewardPresent',
      align: 'center',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <>
      <ManagerTemplate
        title="Recruiter Stage"
        columns={columns}
        modalContent={
          <>
            <Row gutter={12}>
              <Col span="8">
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Name of process"
                  name="nameProcess"
                  rules={[{ required: true, message: 'Please enter name of process' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="8">
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Min Reward Persent"
                  name="baseStageRewardPresent"
                  rules={[{ required: true, message: 'Please enter min reward persent' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="8">
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="No Of Stage"
                  name="noOfStage"
                  rules={[{ required: true, message: 'Please enter no of stage' }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Please enter description' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </>
        }
        handleDelete={id => myAxios.delete(`recruit-stage/${id}`)}
        handleUpload={(record: any) => myAxios.get(`/confirm-pay?jobRequest=${record.id}`)}
        handleCreate={(form: any) => myAxios.post(`recruit-stage`, form)}
        handleUpdate={(id: number, form: any) => myAxios.put(`recruit-stage/${id}`, form)}
        fetchData={() => myAxios.get('recruit-stage')}
        handleSetCurrentRecord={(callback: any, record: any) => {
          record.cityId = record.city?.id;
          callback(record);
        }}
      />
    </>
  );
};
export default RecruiterStage;
