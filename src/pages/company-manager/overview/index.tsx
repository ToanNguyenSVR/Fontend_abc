import { Card, Col, Layout, Row, Select } from 'antd';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { useSelector } from 'react-redux';
import myAxios from '../../../axios/config';
import { RootState } from '../../../redux/store';
import './index.scss';
const { Option } = Select;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const { Header, Sider, Content } = Layout;

const Overview = () => {
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
        data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'red',
        tension: 0.1,
      },
      {
        label: 'Passed',
        data: [65, 55, 53, 55, 89, 99, 40, 55, 89, 99, 40],
        fill: false,
        borderColor: 'green',
        tension: 0.1,
      },
      {
        label: 'Applied',
        data: [44, 55, 32, 66, 89, 99, 55, 89, 99, 40, 55, 89],
        fill: false,
        borderColor: 'yellow',
        tension: 0.1,
      },
    ],
  });
  const currentYear = moment().year();

  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const handleChange = (value: number) => {
    setSelectedYear(value);
  };
  function getStateColor(stateName: string): string {
    const stateColors: any = {
      FAIL: '#dc3545', // Red
      PASS: '#00C49F', // Green
      IN_PROCESS: '#FFBB28', // Orange
      APPLIED: '#FF8042', // Blue
      CONFIRM: '#8884d8', // Yellow
    };

    // Convert the input state name to uppercase for case-insensitive matching
    const upperCaseStateName = stateName.toUpperCase();

    // Check if the provided state name exists in the stateColors object
    if (stateColors.hasOwnProperty(upperCaseStateName)) {
      return stateColors[upperCaseStateName];
    } else {
      // Return a default color (e.g., gray) or an error message if the state name is not found
      return '#808080'; // Gray
    }
  }

  useEffect(() => {
    if (dashboard) {
      setData({
        labels: dashboard.yearMonths,
        datasets: dashboard.candidateData?.map((item: any) => {
          item.data?.forEach((item: number) => {
            if (item > max) setMax(item);
          });

          return {
            ...item,
            borderColor: getStateColor(item.label),
            tension: 0,
          };
        }),
      });
    }
  }, [dashboard]);
  console.log(data);
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
    const response = await myAxios.get(`/dashboard-company/${user.id}?year=${selectedYear}`);
    setDashboard(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    fetch();
  }, [user, selectedYear]);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Row gutter={[12, 12]} style={{ margin: 0 }}>
          <Col span={8}>
            <Card title="Account Balance">
              <Row justify={'center'} align={'middle'}>
                <Col span={8}>
                  <img src="/salary.png" alt="" style={{ width: '100%' }} />
                </Col>
                <Col span={8} style={{ fontSize: 35, textAlign: 'center', fontWeight: 500 }}>
                  ${<CountUp start={0} end={dashboard?.balance} duration={1} />}
                  {/* {convertToCurrencyFormat(dashboard?.balance)} */}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Block Money">
              <Row justify={'center'} align={'middle'}>
                <Col span={8}>
                  <img src="/money-sack.png" alt="" style={{ width: '100%' }} />
                </Col>
                <Col span={8} style={{ fontSize: 35, textAlign: 'center', fontWeight: 500 }}>
                  ${<CountUp start={0} end={dashboard?.blockMoney} duration={1} />}
                  {/* {convertToCurrencyFormat(dashboard?.blockMoney)} */}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Money Paid">
              <Row justify={'center'} align={'middle'}>
                <Col span={8}>
                  <img src="/24-7.png" alt="" style={{ width: '100%' }} />
                </Col>
                <Col span={8} style={{ fontSize: 35, textAlign: 'center', fontWeight: 500 }}>
                  ${<CountUp start={0} end={dashboard?.moneyPaid} duration={1} />}
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
                <Card title="Total Job" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Row justify={'center'} align={'middle'}>
                    <Col span={8}>
                      <img src="/job.png" alt="" style={{ width: '100%' }} />
                    </Col>
                    <Col span={8} style={{ fontSize: 35, textAlign: 'center', fontWeight: 500, flexGrow: 1 }}>
                      {<CountUp start={0} end={dashboard?.summaryJob['Total Job']} duration={1} />}
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Job Active" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Row justify={'center'} align={'middle'}>
                    <Col span={8}>
                      <img src="/job-active.png" alt="" style={{ width: '100%' }} />
                    </Col>
                    <Col span={8} style={{ fontSize: 35, textAlign: 'center', fontWeight: 500 }}>
                      {<CountUp start={0} end={dashboard?.summaryJob?.ACTIVE} duration={1} />}
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  title="Job Pending"
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Row justify={'center'} align={'middle'}>
                    <Col span={8}>
                      <img src="/job-pending.png" alt="" style={{ width: '100%' }} />
                    </Col>
                    <Col span={8} style={{ fontSize: 35, textAlign: 'center', fontWeight: 500 }}>
                      {<CountUp start={0} end={dashboard?.summaryJob?.PENDING} duration={1} />}
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Job Done" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Row justify={'center'} align={'middle'}>
                    <Col span={8}>
                      <img src="/job-done.png" alt="" style={{ width: '100%' }} />
                    </Col>
                    <Col span={8} style={{ fontSize: 35, textAlign: 'center', fontWeight: 500 }}>
                      {<CountUp start={0} end={dashboard?.summaryJob?.DONE} duration={1} />}
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
  );
};
export default Overview;
