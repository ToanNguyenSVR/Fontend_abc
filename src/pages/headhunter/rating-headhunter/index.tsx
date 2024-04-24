import { Avatar, Button, Card, Col, Divider, List, Rate, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import myAxios from '../../../axios/config';
import { RootState } from '../../../redux/store';

interface RatingProps {
  headhunterId: string | undefined;
  useCard?: boolean;
}

const Rating: React.FC<RatingProps> = ({ headhunterId, useCard }) => {
  const [ratingHistory, setRatingHistory] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await myAxios.get(`/rating/${headhunterId}`);
        setRatingHistory(response.data.data);
        setLoading(false);
      } catch (e: any) {}
    };
    fetchData();
  }, [headhunterId]);

  return (
    <>
      {ratingHistory &&
        (useCard ? (
          <Card title="Rating History" loading={loading}>
            {loading ? (
              <>
                <Spin />
              </>
            ) : (
              <>
                <Row justify={'center'}>
                  <Col
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                    span={5}
                  >
                    {' '}
                    <span>{ratingHistory?.totalStar} Star</span>
                    <Rate allowHalf disabled defaultValue={ratingHistory?.totalStar} />
                  </Col>
                  <Col span={2}>
                    <Divider style={{ height: '100%', color: '#000' }} type="vertical" />
                  </Col>
                  <Col span={5}>
                    <Button
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                        border: 'none',
                      }}
                    >
                      {' '}
                      <Rate disabled defaultValue={1} /> ( {ratingHistory?.mapStarPercent[1]} )
                    </Button>
                    <Button
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                        border: 'none',
                      }}
                    >
                      <Rate disabled defaultValue={2} /> ( {ratingHistory?.mapStarPercent[2]} )
                    </Button>
                    <Button
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                        border: 'none',
                      }}
                    >
                      <Rate disabled defaultValue={3} /> ( {ratingHistory?.mapStarPercent[3]} )
                    </Button>
                    <Button
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                        border: 'none',
                      }}
                    >
                      <Rate disabled defaultValue={4} /> ( {ratingHistory?.mapStarPercent[4]} )
                    </Button>
                    <Button
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                        border: 'none',
                      }}
                    >
                      <Rate disabled defaultValue={5} /> ( {ratingHistory?.mapStarPercent[5]} )
                    </Button>
                  </Col>
                </Row>
                <Divider />
                <List
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 3,
                  }}
                  itemLayout="vertical"
                  size="default"
                  dataSource={ratingHistory?.ratingResponses}
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item.companyAvatar} />}
                        title={`Review for ${item.candidateName} from ${item.companyName}`}
                        description={item.comment}
                      />
                      <div>
                        <Rate disabled defaultValue={item.star} />
                      </div>
                      {/* <Comment content={item.comment} /> */}
                    </List.Item>
                  )}
                />
              </>
            )}
          </Card>
        ) : loading ? (
          <Row
            style={{
              height: '82vh',
            }}
            justify={'center'}
            align={'middle'}
          >
            <Spin />
          </Row>
        ) : (
          <>
            <Row justify={'center'}>
              <Col
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
                span={5}
              >
                {' '}
                <span>{ratingHistory?.totalStar} Star</span>
                <Rate allowHalf disabled defaultValue={ratingHistory?.totalStar} />
              </Col>
              <Col span={2}>
                <Divider style={{ height: '100%', color: '#000' }} type="vertical" />
              </Col>
              <Col span={5}>
                <Button
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                    border: 'none',
                  }}
                >
                  {' '}
                  <Rate disabled defaultValue={1} /> ( {ratingHistory?.mapStarPercent[1]} )
                </Button>
                <Button
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                    border: 'none',
                  }}
                >
                  <Rate disabled defaultValue={2} /> ( {ratingHistory?.mapStarPercent[2]} )
                </Button>
                <Button
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                    border: 'none',
                  }}
                >
                  <Rate disabled defaultValue={3} /> ( {ratingHistory?.mapStarPercent[3]} )
                </Button>
                <Button
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                    border: 'none',
                  }}
                >
                  <Rate disabled defaultValue={4} /> ( {ratingHistory?.mapStarPercent[4]} )
                </Button>
                <Button
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                    border: 'none',
                  }}
                >
                  <Rate disabled defaultValue={5} /> ( {ratingHistory?.mapStarPercent[5]} )
                </Button>
              </Col>
            </Row>
            <Divider />
            <List
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              itemLayout="vertical"
              size="default"
              dataSource={ratingHistory?.ratingResponses}
              renderItem={(item: any) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.companyAvatar} />}
                    title={`Review for ${item.candidateName} from ${item.companyName}`}
                    description={item.comment}
                  />
                  <div>
                    <Rate disabled defaultValue={item.star} />
                  </div>
                  {/* <Comment content={item.comment} /> */}
                </List.Item>
              )}
            />
          </>
        ))}
    </>
  );
};
export default Rating;
