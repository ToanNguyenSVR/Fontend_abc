import { Avatar, Button, Card, Col, Modal, Rate, Row } from 'antd';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import myAxios from '../../../axios/config';
import { User } from '../../../model/user';
import CVPreview from '../CV-preview';
import { FileAddOutlined } from '@ant-design/icons';
import './index.scss';
interface HeadhunterProps {
  headhunter: User;
  cvs: any[];
}
const { Meta } = Card;

const HeadhunterCard: FC<HeadhunterProps> = ({ headhunter, cvs }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  function truncateAndCreateLink(value: any) {
    if (value.length > 100) {
      value = value.substring(0, 100) + '...';
    }

    return value;
  }

  return (
    <Card
      style={{ marginBottom: '10px' }}
      // className="headhunter-card"
      actions={[
        <FileAddOutlined
          onClick={() => {
            setShowModal(true);
          }}
        />,
      ]}
    >
      <Meta
        avatar={<Avatar size={100} src={headhunter.avatar} />}
        title={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {headhunter.fullName}
            <Rate allowHalf defaultValue={headhunter.avg_star} disabled />
          </div>
        }
        description={
          <p style={{ marginTop: 10, textAlign: 'justify', height: '50px', overflow: 'auto', minHeight: 90 }}>
            {truncateAndCreateLink(headhunter.description)}
          </p>
        }
      />

      <Modal
        okText={`Submit CV to headhunter ${headhunter.fullName}`}
        open={showModal}
        width={1000}
        onCancel={() => {
          setShowModal(false);
          setSelectedCV(null);
        }}
        title="Choose CV"
        onOk={async () => {
          if (selectedCV == null) {
            toast.error('Please select CV!');
            return;
          }

          try {
            const response = await myAxios.put('candidate/shareCv', {
              cvId: selectedCV,
              headhunterId: headhunter?.id,
            });

            toast.success(response.data.message);
            setShowModal(false);
            setSelectedCV(null);
          } catch (e: any) {
            toast.error(e.response.data);
          }
        }}
      >
        <Row gutter={[16, 16]} style={{ maxHeight: 500, overflow: 'auto' }}>
          {cvs.map(item => {
            return (
              <Col
                xl={8}
                lg={8}
                md={12}
                sm={24}
                onClick={() => {
                  setSelectedCV(item.id);
                }}
              >
                <CVPreview data={item} active={selectedCV === item.id} />
              </Col>
            );
          })}
        </Row>
      </Modal>
      {/* <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div></div>
        <Button
          type="primary"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Apply CV
        </Button>
      </Row> */}
    </Card>
  );
};
export default HeadhunterCard;
