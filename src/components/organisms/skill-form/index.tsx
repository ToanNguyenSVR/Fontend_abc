import { Button, Col, Form, Input, Row, Select, Slider } from 'antd';
import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { SliderMarks } from 'antd/es/slider';

const SkillForm = () => {
  const [skill, setSkill] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const programSkill = await myAxios.get('skill');
      setSkill(
        programSkill.data.data.map((item: any) => {
          return {
            value: item.id,
            label: item.skillName,
          };
        })
      );
    };
    fetch();
  }, []);

  const marks: SliderMarks = {
    25: 'Know',
    50: 'Experience',
    100: 'Expert',
  };

  return (
    <Form.List name="skillList">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Row gutter={16} style={{ alignItems: 'center' }}>
              <Col span={11}>
                <Form.Item
                  {...restField}
                  name={[name, 'id']}
                  rules={[{ required: true, message: 'Missing skill' }]}
                >
                  <Select
                    showSearch
                    placeholder="Select skill"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={skill}
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  {...restField}
                  name={[name, 'point']}
                  rules={[{ required: true, message: 'Missing point' }]}
                  initialValue={25}
                >
                  <Slider marks={marks} />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item>
                  <Button danger type="primary" onClick={() => remove(name)}>
                    <MinusCircleOutlined />
                  </Button>
                </Form.Item>
              </Col>
              <Form.Item hidden {...restField} name={[name, 'skillLevelId']}>
                <Input />
              </Form.Item>
            </Row>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add Skill
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
export default SkillForm;
