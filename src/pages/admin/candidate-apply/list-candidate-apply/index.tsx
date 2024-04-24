import { useEffect, useState } from 'react';
// import myAxios from '../../../axios/config';
import { Avatar, Button, Modal, Table } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { applyResponses } from '../../../../model/job';
import myAxios from '../../../../axios/config';
import { toast } from 'react-toastify';
import TextArea from 'antd/es/input/TextArea';
interface ListCandidateApplyProps {
  apply: applyResponses[];
  setRender: () => void;
}
const ListCandidateApply: React.FC<ListCandidateApplyProps> = ({ apply, setRender }) => {
  const [listApply, setListApply] = useState<applyResponses[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [applyCode, setApplyCoden] = useState('');
  useEffect(() => {
    setListApply(apply);
  }, [apply]);

  const columns: any[] = [
    {
      title: 'Fullname',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      render: (avatarUrl: string, record: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar src={avatarUrl} />
          <span style={{ marginLeft: '10px' }}>{record.cv?.fullName}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: ['cv', 'email'],
      key: 'email',
      align: 'center',
      render: (avatarUrl: string, record: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ marginLeft: '10px' }}>{record.cv?.email}</span>
        </div>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text: string, record: any) => (
        <div>
          <Button
            style={{ marginLeft: '10px' }}
            type="primary"
            icon={<CheckCircleOutlined />} // Add the checkmark icon
            onClick={() => handleConfirm(record)}
          />
          <Button
            style={{ marginLeft: '10px' }}
            danger
            icon={<CloseCircleOutlined />} // Add the close icon
            onClick={() => handleReject(record)}
          />
        </div>
      ),
    },
  ];

  const handleConfirm = async (values: any) => {
    const dataConfirm = {
      applyCode: values.code,
      resultApply: 'ACCEPT',
    };
    try {
      const response = await myAxios.post(`confirm-cv`, dataConfirm);
      toast.success(response.data.message);
      setRender();
    } catch (e: any) {
      console.log(e);

      toast.error(e.response.data);
    }
  };
  const handleReject = (values: any) => {
    setIsModalOpen(true);
    setApplyCoden(values.code);
  };
  const handleOk = async () => {
    const dataConfirm = {
      applyCode: applyCode,
      resultApply: 'REJECT',
      note: reason,
    };
    try {
      const response = await myAxios.post(`confirm-cv`, dataConfirm);
      if (response.status == 200) {
        toast.success('Reject success!');
        setRender();
        setIsModalOpen(false);
      }
    } catch (e: any) {
      toast.error(e.response.data);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div style={{ padding: '0px 10px 0px 10px' }}>
      <Table
        columns={columns}
        pagination={false}
        // rowKey={record => record.accountId.toString()}
        dataSource={listApply}
      />
      <Modal title="Reject Candidate" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <TextArea
          placeholder="Autosize height with minimum and maximum number of lines"
          autoSize={{ minRows: 2, maxRows: 6 }}
          onChange={(e: any) => {
            setReason(e.target.value);
          }}
        />
      </Modal>
    </div>
  );
};
export default ListCandidateApply;
