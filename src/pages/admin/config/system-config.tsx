import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import { ToastContainer } from 'react-toastify';
import ManagerTemplate from '../../../components/templates/manager-template';
import { Col, Form, Input, Row, Tag } from 'antd';

const SystemConfig = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (value: string) => {
        let tagColor;
        switch (value) {
          case 'EXPIRE_CV_TIME':
            tagColor = 'blue';
            break;
          case 'PERCENT_JOB_TITLE':
            tagColor = 'green';
            break;
          case 'PERCENT_WORKING_MODE':
            tagColor = 'orange';
            break;
          case 'PERCENT_LANGUAGE':
            tagColor = 'red';
            break;
          case 'PERCENT_SKILL':
            tagColor = 'purple';
            break;
          default:
            tagColor = 'gray';
            break;
        }
        return <Tag color={tagColor}>{value}</Tag>;
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return (
    <>
      <ManagerTemplate
        title="system configuration"
        columns={columns}
        modalContent={
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'Please enter system config name' }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Value"
                name="value"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'Please enter system config value' }]}
              >
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
          </Row>
        }
        handleUpdate={(id: number, form: any) => myAxios.put(`/system-config/${id}`, form)}
        fetchData={() => myAxios.get('/system-config')}
        handleSetCurrentRecord={(callback: any, record: any) => {
          record.cityId = record.city?.id;
          callback(record);
        }}
      />
    </>
  );
};
export default SystemConfig;
