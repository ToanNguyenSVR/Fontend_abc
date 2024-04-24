import { Avatar, Button, Tag } from 'antd';
import myAxios from '../../../axios/config';
import ManagerTemplate from '../../../components/templates/manager-template';
import { Company } from '../../../model/company';
import { useNavigate } from 'react-router-dom';

const CompanyVerify = () => {
  const navigate = useNavigate();

  function truncateAndCreateLink(value: string) {
    if (value.length > 20) {
      value = value.substring(0, 20) + '...';
    }

    return value;
  }

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Logo',
      dataIndex: 'logoUrl',
      key: 'logoUrl',
      render: (value: string) => {
        return <Avatar src={value} size={40} />;
      },
    },
    {
      title: 'Short Name',
      dataIndex: 'shortName',
      key: 'shortName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value: string) => {
        if (value === 'ACTIVE') return <Tag color="green">{value}</Tag>;
        if (value === 'IN PROCESS') return <Tag color="yellow">{value}</Tag>;
        if (value === 'SUCCESS') return <Tag color="green">{value}</Tag>;
      },
    },
    {
      title: 'Website',
      dataIndex: 'websiteUrl',
      key: 'websiteUrl',
      render: (value: string) => {
        return <a href={value}>{truncateAndCreateLink(value)}</a>;
      },
    },
    {
      title: '',
      render: (value: string, record: Company) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              navigate(`/admin/company/${record.id}`);
            }}
          >
            More Detail
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <ManagerTemplate
        isUseAction={false}
        title="City"
        columns={columns}
        modalContent={<></>}
        handleDelete={id => myAxios.delete(`city/${id}`)}
        handleUpdate={(id: number, form: any) => myAxios.put(`city/${id}`, form)}
        handleUpload={(record: any) => myAxios.get(`/confirm-pay?jobRequest=${record.id}`)}
        fetchData={() => myAxios.get('/company/active')}
        handleSetCurrentRecord={(callback: any, record: any) => {
          record.cityId = record.city?.id;
          callback(record);
        }}
      />
    </div>
  );
};
export default CompanyVerify;
