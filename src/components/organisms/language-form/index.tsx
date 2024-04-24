import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import { Button, Checkbox, Col, Form, Input, Row, Select, Slider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { SliderMarks } from 'antd/es/slider';
const LanguageForm = () => {
  const [language, setLanguage] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const programLanguageResponse = await myAxios.get('language');
      setLanguage(
        programLanguageResponse.data.data.map((item: any) => {
          return {
            value: item.id,
            label: item.language,
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
    <Form.List name="languageRequests">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Row gutter={16} style={{ alignItems: 'center' }}>
              <Col span={10}>
                <Form.Item
                  {...restField}
                  name={[name, 'languageId']}
                  rules={[{ required: true, message: 'Missing language' }]}
                >
                  <Select
                    showSearch
                    placeholder="Select language"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={language}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  {...restField}
                  name={[name, 'ponit']}
                  rules={[{ required: true, message: 'Missing point' }]}
                  initialValue={25}
                >
                  <Slider marks={marks} />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item {...restField} name={[name, 'isBest']} labelCol={{ span: 24 }}>
                  <Checkbox defaultChecked />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item>
                  <Button danger type="primary" onClick={() => remove(name)}>
                    <MinusCircleOutlined />
                  </Button>
                </Form.Item>
              </Col>
              <Form.Item hidden {...restField} name={[name, 'languageLevelId']}>
                <Input />
              </Form.Item>
            </Row>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
export default LanguageForm;
