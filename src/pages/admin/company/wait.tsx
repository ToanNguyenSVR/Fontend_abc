import { Avatar, Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myAxios from '../../../axios/config';
import { Company } from '../../../model/company';

const CompanyWait = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  function truncateAndCreateLink(value: string) {
    if (value.length > 20) {
      value = value.substring(0, 20) + '...';
    }

    return value;
  }

  const [companies, setCompanies] = useState<Company[]>([]);
  const columns: any[] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
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
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Short Name',
      dataIndex: 'shortName',
      key: 'shortName',
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

  const fetch = async () => {
    const response = await myAxios.get(`/company/verify`);
    console.log(response.data.data);

    setCompanies(response.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <Table loading={isLoading} columns={columns} dataSource={companies} />
    </div>
  );
};
export default CompanyWait;
