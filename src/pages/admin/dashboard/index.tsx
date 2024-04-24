import { Card, Col, Row, Select } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { useSelector } from 'react-redux';
import myAxios from '../../../axios/config';
import { RootState } from '../../../redux/store';
const { Option } = Select;

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState<any>();
  const user = useSelector((store: RootState) => store.user);
  const labels = ['June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [max, setMax] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number | null>(moment().year()); // Set to current year
  const [data, setData] = useState<any>({
    labels: labels,
    datasets: [
      {
        label: 'Fail',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: false,
        borderColor: '#96C291',
        tension: 0.1,
      },
      {
        label: 'Passed',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: false,
        borderColor: '#96C291',
        tension: 0.1,
      },
      {
        label: 'Applied',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: false,
        borderColor: '#96C291',
        tension: 0.1,
      },
    ],
  });
  const currentYear = moment().year();

  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const handleChange = (value: number) => {
    setSelectedYear(value);
  };

  useEffect(() => {
    if (dashboard) {
      setData({
        labels: dashboard.yearMonths,
        datasets: dashboard.reports?.map((item: any) => {
          return {
            ...item,
            borderColor: '#96C291',
            tension: 0,
          };
        }),
      });
    }
  }, [dashboard]);

  useEffect(() => {
    console.log(max);
  }, [max]);

  function convertToCurrencyFormat(amount: number) {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return formattedAmount;
  }

  const fetch = async () => {
    const response = await myAxios.get(`/dashboard-admin/${user.id}?year=${selectedYear}`);
    setDashboard(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    fetch();
  }, [user, selectedYear]);
  return (
    <>
      <div>
        <div style={{ marginBottom: 20 }}>
          <Row gutter={[12, 12]} style={{ margin: 0 }}>
            <Col span={8}>
              <Card title="Total Job">
                <Row justify={'center'} align={'middle'}>
                  <Col span={8}>
                    <img src="/job.png" alt="" style={{ width: '100%' }} />
                  </Col>
                  <Col span={8} style={{ fontSize: 35, textAlign: 'center', fontWeight: 500 }}>
                    {<CountUp start={0} end={dashboard?.totalJob} duration={1} />}
                    {/* {convertToCurrencyFormat(dashboard?.balance)} */}
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Money">
                <Row justify={'center'} align={'middle'}>
                  <Col span={8}>
                    <img src="/money-sack.png" alt="" style={{ width: '100%' }} />
                  </Col>
                  <Col span={8} style={{ fontSize: 35, textAlign: 'center', fontWeight: 500 }}>
                    ${<CountUp start={0} end={dashboard?.totalMoney} duration={1} />}
                    {/* {convertToCurrencyFormat(dashboard?.blockMoney)} */}
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Revernue">
                <Row justify={'center'} align={'middle'}>
                  <Col span={8}>
                    <img src="/24-7.png" alt="" style={{ width: '100%' }} />
                  </Col>
                  <Col span={8} style={{ fontSize: 35, textAlign: 'center', fontWeight: 500 }}>
                    ${<CountUp start={0} end={dashboard?.totalRevenue} duration={1} />}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
        <div style={{ marginBottom: 20 }}>
          <Row gutter={[12, 12]} style={{ margin: 0 }}>
            <Col span={16}>
              <Card style={{ height: '100%' }}>
                <Select
                  style={{ margin: 0, float: 'right', width: '120px' }}
                  defaultValue={currentYear}
                  onChange={handleChange}
                >
                  {years.map(year => (
                    <Option key={year} value={year}>
                      {year}
                    </Option>
                  ))}
                </Select>
                <Line data={data} style={{ width: '100%', height: '100%' }} />
              </Card>
            </Col>
            <Col span={8}>
              <Row gutter={[12, 12]} style={{ height: '100%' }} className="item">
                <Col span={12}>
                  <Card title="Admin" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Row justify={'center'} align={'middle'}>
                      <Col span={8}>
                        <img src="/admin.png" alt="" style={{ width: '100%' }} />
                      </Col>
                      <Col
                        span={8}
                        style={{ fontSize: 35, textAlign: 'center', fontWeight: 500, flexGrow: 1 }}
                      >
                        {<CountUp start={0} end={dashboard?.totalAdmin} duration={1} />}
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Company" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Row justify={'center'} align={'middle'}>
                      <Col span={8}>
                        <img src="/company.png" alt="" style={{ width: '100%' }} />
                      </Col>
                      <Col span={8} style={{ fontSize: 35, textAlign: 'center', fontWeight: 500 }}>
                        {<CountUp start={0} end={dashboard?.totalCompany} duration={1} />}
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    title="Headhunter"
                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <Row justify={'center'} align={'middle'}>
                      <Col span={8}>
                        <img src="/headhunter.png" alt="" style={{ width: '100%' }} />
                      </Col>
                      <Col span={8} style={{ fontSize: 35, textAlign: 'center', fontWeight: 500 }}>
                        {<CountUp start={0} end={dashboard?.totalHeadhunter} duration={1} />}
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    title="Candidate"
                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <Row justify={'center'} align={'middle'}>
                      <Col span={8}>
                        <img src="/candidate.png" alt="" style={{ width: '100%' }} />
                      </Col>
                      <Col span={8} style={{ fontSize: 35, textAlign: 'center', fontWeight: 500 }}>
                        {<CountUp start={0} end={dashboard?.totalCandidate} duration={1} />}
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        {/* <Row gutter={16}>
        <Col span={24}>
          <Card>
            <Line data={data} />
          </Card>
        </Col>
      </Row> */}
      </div>
    </>
  );
};
export default AdminDashboard;
