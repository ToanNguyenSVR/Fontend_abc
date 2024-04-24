import React, { useEffect, useState } from 'react';
import { SearchOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Button, Select, Radio, Slider, Modal, Row, Divider } from 'antd';
import './index.scss';
import myAxios from '../../../axios/config';

const { Option } = Select;

interface FilterComponentProps {
  onFilter: (params: any) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilter }) => {
  const [salaryForm, setSalaryForm] = useState<number | undefined>(undefined);
  const [salaryTo, setSalaryTo] = useState<number | undefined>(undefined);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [workingModeId, setWorkingModeId] = useState<string | undefined>(undefined);
  const [cityId, setCityId] = useState<string | undefined>(undefined);
  const [levels, setLevels] = useState<string[]>([]);
  const [key, setKey] = useState<string | undefined>(undefined);
  const [workingMode, setWorkingMode] = useState<any[]>();
  const [listSkill, setListSkill] = useState<any[]>();
  const [listLanguage, setListLanguage] = useState<any[]>();
  const [city, setCity] = useState<any[]>();
  const [open, setOpen] = useState(false);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 2000]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const responseWorkingMode = await myAxios.get(`/working-mode`);
      const responseListSkill = await myAxios.get(`/skill`);
      const responseListLanguage = await myAxios.get(`/language`);
      const responseCity = await myAxios.get(`/city`);

      setWorkingMode(responseWorkingMode.data.data);
      setListSkill(responseListSkill.data.data);
      setListLanguage(responseListLanguage.data.data);
      setCity(responseCity.data.data);
    };
    fetch();
  }, []);
  const handleFilter = () => {
    const params = {
      salaryForm: salaryRange[0],
      salaryTo: salaryRange[1],
      skills: selectedSkills,
      languages: selectedLanguages,
      workingModeId,
      cityId,
      levels: selectedLevels,
      key,
    };
    console.log(params);

    onFilter(params);
    setOpen(false);
  };

  const resetFilter = () => {
    setSalaryForm(undefined);
    setSalaryTo(undefined);
    setSelectedSkills([]);
    setSelectedLanguages([]);
    setWorkingModeId(undefined);
    setCityId(undefined);
    setSelectedLevels([]);
    setKey(undefined);
    setSalaryRange([0, 2000]);
  };
  const handleModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        width={1000}
        title="Filter"
        open={open}
        onCancel={handleCancel}
        footer={[
          <Divider />,
          <div>
            <Button onClick={resetFilter}>Reset Filter</Button>
            <Button style={{ backgroundColor: '#ff5722' }} type="primary" onClick={handleFilter}>
              Apply
            </Button>
          </div>,
        ]}
      >
        <Divider />
        <Row className="row">
          <div style={{ marginBottom: 10 }}>
            <h4>Level</h4>
          </div>
          <div>
            <Radio.Group
              onChange={e => {
                const value = e.target.value;
                if (value === 'ALL') {
                  setSelectedLevels([]); // Nếu chọn "All", đặt selectedLevels thành một mảng rỗng
                } else {
                  setSelectedLevels(prevLevels => {
                    if (prevLevels.includes(value)) {
                      return prevLevels.filter(item => item !== value);
                    } else {
                      return [...prevLevels, value];
                    }
                  });
                }
              }}
              value={selectedLevels}
            >
              <Radio.Button
                className={`radio-button ${selectedLevels.length == 0 ? 'radio-button-selected' : ''}`}
                key="ALL"
                value="ALL"
              >
                ALL <PlusOutlined className="icon" />
              </Radio.Button>
              <Radio.Button
                className={`radio-button ${selectedLevels.includes('INTERN') ? 'radio-button-selected' : ''}`}
                key="INTERN"
                value="INTERN"
              >
                INTERN <PlusOutlined className="icon" />
              </Radio.Button>
              <Radio.Button
                className={`radio-button ${
                  selectedLevels.includes('FRESHER') ? 'radio-button-selected' : ''
                }`}
                key="FRESHER"
                value="FRESHER"
              >
                FRESHER <PlusOutlined className="icon" />
              </Radio.Button>
              <Radio.Button
                className={`radio-button ${selectedLevels.includes('JUNIOR') ? 'radio-button-selected' : ''}`}
                key="JUNIOR"
                value="JUNIOR"
              >
                JUNIOR <PlusOutlined className="icon" />
              </Radio.Button>
              <Radio.Button
                className={`radio-button ${selectedLevels.includes('MASTER') ? 'radio-button-selected' : ''}`}
                key="MASTER"
                value="MASTER"
              >
                MASTER <PlusOutlined className="icon" />
              </Radio.Button>
              <Radio.Button
                className={`radio-button ${
                  selectedLevels.includes('ALLLEVEL') ? 'radio-button-selected' : ''
                }`}
                key="ALLLEVEL"
                value="ALLLEVEL"
              >
                ALLLEVEL <PlusOutlined className="icon" />
              </Radio.Button>
            </Radio.Group>
          </div>
        </Row>
        <Row className="row" style={{ marginBottom: 10, marginTop: 10 }}>
          <div style={{ marginBottom: 10, marginTop: 10 }}>
            <h4>Salary</h4>
          </div>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '10%' }}> {`${salaryRange[0]}$ - ${salaryRange[1]}$`}</div>
            <div style={{ flexGrow: 1 }}>
              <Slider
                range
                min={0}
                max={10000}
                value={salaryRange}
                onChange={value => setSalaryRange(value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </Row>

        <Row className="row">
          <div style={{ marginBottom: 10, marginTop: 10 }}>
            <h4>Skill</h4>
          </div>
          <Radio.Group
            onChange={e => {
              const value = e.target.value;
              if (value === 'ALL') {
                setSelectedSkills([]); // Nếu chọn "All", đặt selectedLevels thành một mảng rỗng
              } else {
                setSelectedSkills(prevLevels => {
                  if (prevLevels.includes(value)) {
                    return prevLevels.filter(item => item !== value);
                  } else {
                    return [...prevLevels, value];
                  }
                });
              }
            }}
            value={selectedSkills}
            className="radio-group"
          >
            <Radio.Button
              className={`radio-button ${selectedSkills.length == 0 ? 'radio-button-selected' : ''}`}
              key="ALL"
              value="ALL"
            >
              ALL <PlusOutlined className="icon" />
            </Radio.Button>
            {listSkill?.map((item: any) => (
              <Radio.Button
                className={`radio-button ${selectedSkills.includes(item.id) ? 'radio-button-selected' : ''}`}
                key={item.id}
                value={item.id}
              >
                {item.skillName} <PlusOutlined className="icon" />
              </Radio.Button>
            ))}
          </Radio.Group>
        </Row>
        <Row className="row">
          <div style={{ marginBottom: 10, marginTop: 10 }}>
            <h4>Language</h4>
          </div>
          <Radio.Group
            onChange={e => {
              const value = e.target.value;
              if (value === 'ALL') {
                setSelectedLanguages([]);
              } else {
                setSelectedLanguages(prevLevels => {
                  if (prevLevels.includes(value)) {
                    return prevLevels.filter(item => item !== value);
                  } else {
                    return [...prevLevels, value];
                  }
                });
              }
            }}
            value={selectedLanguages}
            className="radio-group"
          >
            <Radio.Button
              className={`radio-button ${selectedLanguages.length == 0 ? 'radio-button-selected' : ''}`}
              key="ALL"
              value="ALL"
            >
              ALL <PlusOutlined className="icon" />
            </Radio.Button>
            {listLanguage?.map((item: any) => (
              <Radio.Button
                className={`radio-button ${
                  selectedLanguages.includes(item.id) ? 'radio-button-selected' : ''
                }`}
                key={item.id}
                value={item.id}
              >
                {item.language} <PlusOutlined className="icon" />
              </Radio.Button>
            ))}
          </Radio.Group>
        </Row>
        <Row className="row">
          <div style={{ marginBottom: 10, marginTop: 10 }}>
            <h4>Working mode</h4>
          </div>
          <Radio.Group
            className="radio-group"
            onChange={e => {
              const value = e.target.value;
              if (value === 'ALL') {
                setWorkingModeId(undefined);
              } else {
                if (workingModeId === value) {
                  setWorkingModeId(undefined); // Nếu giá trị đã được chọn, hãy bỏ chọn nó
                } else {
                  setWorkingModeId(value); // Ngược lại, hãy cập nhật giá trị mới
                }
              }
            }}
            value={workingModeId}
          >
            <Radio.Button
              className={`radio-button ${workingModeId === undefined ? 'radio-button-selected' : ''}`}
              key="ALL"
              value="ALL"
              style={{
                backgroundColor: workingModeId === undefined ? '#1890ff' : '#fff',
                color: workingModeId === undefined ? 'white' : 'black',
              }}
            >
              All <PlusOutlined className="icon" />
            </Radio.Button>
            {workingMode?.map((item: any) => (
              <Radio.Button
                className={`radio-button`}
                style={{
                  backgroundColor: workingModeId === item.id ? '#1890ff' : '#fff',
                  color: workingModeId === item.id ? 'white' : 'black',
                }}
                key={item.id}
                value={item.id}
              >
                {item.mode} <PlusOutlined className="icon" />
              </Radio.Button>
            ))}
          </Radio.Group>
        </Row>
        <Row className="row">
          <div style={{ marginBottom: 10, marginTop: 10 }}>
            <h4>Location</h4>
          </div>
          <Radio.Group
            className="radio-group"
            onChange={e => {
              const value = e.target.value;
              if (value === 'ALL') {
                setCityId(undefined);
              } else {
                if (workingModeId === value) {
                  setCityId(undefined); // Nếu giá trị đã được chọn, hãy bỏ chọn nó
                } else {
                  setCityId(value); // Ngược lại, hãy cập nhật giá trị mới
                }
              }
            }}
            value={cityId}
          >
            <Radio.Button
              className={`radio-button ${cityId === undefined ? 'radio-button-selected' : ''}`}
              key="ALL"
              value="ALL"
              style={{
                backgroundColor: cityId === undefined ? '#1890ff' : '#fff',
                color: cityId === undefined ? 'white' : 'black',
              }}
            >
              All <PlusOutlined className="icon" />
            </Radio.Button>
            {city?.map((item: any) => (
              <Radio.Button
                className="radio-button"
                style={{
                  backgroundColor: cityId === item.id ? '#1890ff' : '#fff',
                  color: cityId === item.id ? 'white' : 'black',
                }}
                key={item.id}
                value={item.id}
              >
                {item.name} <PlusOutlined className="icon" />
              </Radio.Button>
            ))}
          </Radio.Group>
        </Row>
      </Modal>
      <div className="filter">
        <Input className="input-field" placeholder="Key" value={key} onChange={e => setKey(e.target.value)} />
        <Button style={{ backgroundColor: '#ff5722' }} type="primary" onClick={handleFilter}>
          <SearchOutlined />
        </Button>
        <Button style={{ backgroundColor: '#ff5722' }} type="primary" onClick={handleModal}>
          Filter <FilterOutlined />
        </Button>
      </div>
    </>
  );
};

export default FilterComponent;
