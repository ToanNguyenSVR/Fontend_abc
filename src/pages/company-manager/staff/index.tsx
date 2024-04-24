import { useState } from 'react';
import ManagerTemplate from '../../../components/templates/manager-template';
import { Avatar, Col, Form, Input, Modal, Row, Upload } from 'antd';
import myAxios from '../../../axios/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { StorageReference, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase/config';
import { v4 } from 'uuid';
import { LoadingOutlined, PlusOutlined, TeamOutlined } from '@ant-design/icons';

const Staff = () => {
  const user = useSelector((store: RootState) => store.user);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const labelColConfig = { span: 24 };
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      render: (value: string) => {
        return (
          <Avatar
            src={value}
            size={100}
            style={{
              backgroundColor: '#fde3cf',
              color: '#f56a00',
              marginRight: 8,
            }}
          ></Avatar>
        );
      },
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
    },
    {
      title: 'Staff Name',
      dataIndex: 'nameStaff',
      key: 'nameStaff',
      align: 'center',
    },
  ];

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

  return (
    <div>
      <ManagerTemplate
        title="Staff"
        columns={columns}
        modalContent={
          <>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="avatar" labelCol={labelColConfig}>
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
              <Col span={12}>
                <Form.Item name="email" label="Email" labelCol={labelColConfig}>
                  <Input type="email" placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="fullname" label="Fullname" labelCol={labelColConfig}>
                  <Input placeholder="Fullname" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="phone" label="Phone" labelCol={labelColConfig}>
                  <Input placeholder="Phone" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  labelCol={labelColConfig}
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
          </>
        }
        handleDelete={id => myAxios.delete(`staff/${user.company?.id}`)}
        handleUpload={(record: any) => myAxios.get(`/confirm-pay?jobRequest=${record.id}`)}
        handleCreate={(form: any) => {
          const data = {
            registerRequest: {
              password: form.password,
              email: form.email,
              avatar: selectedImage,
              fullName: form.fullname,
              phone: form.phone,
              accountType: 'STAFF',
            },
            nameStaff: form.fullname,
            companyId: user.company?.id,
          };
          return myAxios.post(`staff/`, data);
        }}
        handleUpdate={(id: number, form: any) => {
          const data = {
            registerRequest: {
              password: form.password,
              email: form.email,
              avatar: selectedImage,
              fullName: form.fullname,
              phone: form.phone,
              accountType: 'STAFF',
            },
            nameStaff: form.fullname,
            companyId: user.company?.id,
          };

          return myAxios.put(`staff/${id}`, data);
        }}
        fetchData={() => myAxios.get(`/staff/${user.company?.id}`)}
        handleSetCurrentRecord={(callback: any, record: any) => {
          console.log(record);

          callback(record);
        }}
      />
    </div>
  );
};
export default Staff;
