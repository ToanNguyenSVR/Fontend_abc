import { useNavigate, useParams } from 'react-router-dom';
import './index.scss';
import { FC, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Candidate } from '../../../model/candidate';
import myAxios from '../../../axios/config';
import { Button, Descriptions, List, Progress, Skeleton, Tag } from 'antd';
import DocumentPreview from '../document-preview';
import { FacebookOutlined, LinkedinOutlined, GithubOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { toast } from 'react-toastify';
import obfuscateInput from '../../../utils/hide';

interface CVDetailProps {
  cvId: number;
  sharedID?: number;
  clearCurrentCVId?: () => void;
  isShow?: boolean;
}

const CVDetail: FC<CVDetailProps> = ({ isShow = true, cvId, sharedID, clearCurrentCVId }) => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const user = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();
  const fetch = async () => {
    const response = await myAxios.get(`/cv-detail/${cvId}`);
    console.log(response.data.data);
    setCandidate(response.data.data);
  };

  const handleConfirm = async () => {
    const response = await myAxios.put(
      `accept-cv?headhunterId=${user.headhunter?.id}&&cvSharedId=${sharedID}`
    );
    toast.success('Succsessfully!');
    clearCurrentCVId && clearCurrentCVId();
  };
  useEffect(() => {
    setCandidate(null);
    fetch();
  }, [cvId]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()} ${date.toLocaleString('default', {
      month: 'long',
    })} ${date.getFullYear()}`;
    return formattedDate;
  };
  return (
    <div className="cv-detail">
      <div className={`cv-detail__file ${!isShow && 'hide'}`}>
        <DocumentPreview width={400} url={candidate?.cvUrl!} />
      </div>
      <div className="cv-detail__information">
        <div>
          {candidate && (
            <Descriptions title={candidate?.fullName + ' - ' + candidate?.jobTitle} column={2} bordered>
              <Descriptions.Item label="Summary" span={2}>
                {candidate.summary}
              </Descriptions.Item>

              <Descriptions.Item label="Email" span={1}>
                {!isShow ? obfuscateInput(candidate.email) : candidate.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone" span={1}>
                {!isShow ? obfuscateInput(candidate.phone) : candidate.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Status" span={1}>
                <Tag color="#52c41a"> {candidate.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={1}>
                <Skeleton loading={!isShow}>
                  {candidate.facebookLink && (
                    <div>
                      <a href={candidate.facebookLink} target="_blank" rel="noopener noreferrer">
                        <Tag icon={<FacebookOutlined />} color="#3b5999">
                          Facebook
                        </Tag>
                      </a>
                    </div>
                  )}
                  {candidate.linkedInLink && (
                    <div>
                      <a href={candidate.linkedInLink} target="_blank" rel="noopener noreferrer">
                        <Tag icon={<LinkedinOutlined />} color="#55acee">
                          LinkedIn
                        </Tag>
                      </a>
                    </div>
                  )}
                  {candidate.githubLink && (
                    <div>
                      <a href={candidate.githubLink} target="_blank" rel="noopener noreferrer">
                        <Tag icon={<GithubOutlined />} color="#333">
                          Github
                        </Tag>
                      </a>
                    </div>
                  )}
                </Skeleton>
              </Descriptions.Item>
              <Descriptions.Item label="Education" span={2}>
                {candidate.education}
              </Descriptions.Item>
              <Descriptions.Item label="Working mode" span={2}>
                {candidate.workingMode}
              </Descriptions.Item>
              <Descriptions.Item label="Skills" span={2}>
                <List
                  dataSource={candidate.skillLevels}
                  renderItem={skillLevel => (
                    <List.Item>
                      <div style={{ width: '100%' }}>
                        <h3>{skillLevel.skill.skillName}</h3>
                        <Progress
                          percent={(skillLevel.point / 100) * 100}
                          showInfo={false}
                          // strokeWidth={15}
                          size={'small'}
                        />
                      </div>
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Language" span={2}>
                <List
                  dataSource={candidate.languageLevels}
                  renderItem={languageLevel => (
                    <List.Item>
                      <div style={{ width: '100%' }}>
                        <h3>{languageLevel.programLanguage.language}</h3>
                        <Progress
                          percent={(languageLevel.ponit / 100) * 100}
                          showInfo={false}
                          // strokeWidth={15}
                          size={'small'}
                        />
                      </div>
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Certifications" span={3}>
                <List
                  dataSource={candidate.certifications}
                  renderItem={certification => (
                    <List.Item>
                      <div style={{ width: '100%' }}>
                        <h3>{certification.certificationName}</h3>
                        <h4>{certification.organization}</h4>
                        <h5>
                          {formatDate(certification.dateFrom)}-{formatDate(certification.dateTo)}
                        </h5>
                        <a href={certification.certificationUrl} target="_blank" rel="noopener noreferrer">
                          {certification.certificationUrl}
                        </a>
                      </div>
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Experiences" span={3}>
                <List
                  dataSource={candidate.experiences}
                  renderItem={experience => (
                    <List.Item>
                      <div style={{ width: '100%' }}>
                        <h3>
                          {experience.company} - {experience.jobTitle}
                        </h3>
                        <h4>
                          {formatDate(experience.dateFrom)}-{formatDate(experience.dateTo)}
                        </h4>
                        <h5>{experience.jobDescription}</h5>
                      </div>
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
            </Descriptions>
          )}
          {user.accountType == 'HEADHUNTER' ? (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Button type="primary" onClick={handleConfirm}>
                Submit
              </Button>
              <Button style={{ marginLeft: '10px' }}>Cancel</Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default CVDetail;
