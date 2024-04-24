import React, { useEffect, useState } from 'react';
import { Button, Drawer, Table, Tag } from 'antd'; // Imp
import myAxios from '../../../axios/config';
import CVDetail from '../../../components/organisms/CV-detail';

// Helper function to get the color for the status Tag
const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'green';
    case 'VERIFY':
      return 'blue';
    case 'add-information':
      return 'orange';
    case 'banned':
      return 'red';
    default:
      return 'gray';
  }
};

const AdminCandidateApprove = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState<number | null>();
  const fetch = async () => {
    const response = await myAxios.get('candidate');
    setData(response.data.data);
    setLoading(false);
  };

  const columns: any[] = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Position',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },
    {
      title: 'CV', // Add a new column for the status
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (value: number) => {
        return (
          <Button
            onClick={() => {
              setCurrentId(value);
            }}
          >
            Show CV
          </Button>
        );
      },
    },
    {
      title: 'Status', // Add a new column for the status
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag> // Use Ant Design's Tag component for status display
      ),
    },
  ];

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 7,
        }}
      />
      <Drawer
        open={Boolean(currentId)}
        onClose={() => {
          setCurrentId(null);
        }}
      >
        <CVDetail cvId={currentId!} />
      </Drawer>
    </div>
  );
};
export default AdminCandidateApprove;
