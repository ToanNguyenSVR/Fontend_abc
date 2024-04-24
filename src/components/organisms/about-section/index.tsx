import React from 'react';
import './index.scss';
import { Text } from '../../atoms/text';
import { Button } from '../../atoms/button';
export interface AboutSectionProps {}

export const AboutSection: React.FC<AboutSectionProps> = props => {
  return (
    <div className="about__section">
      <div className="about__section__content">
        <Text content="Find your dream job in one place" color="#113142" fontSize="72px" fontWeight="600" />
        <Text
          content="Web design hackathon accelerator bootstrapping branding value proposition research & development gamification. "
          color="#728689"
          fontSize="18px"
          fontWeight="500"
        />
        <div className="about__section__content__groupbtn">
          <Button title="Find Now" />
          <Button title="Talk to us" bgcolor="#fff" color="#1657ff" />
        </div>
      </div>
      <img
        className="about__section__img"
        src="https://img.freepik.com/premium-vector/vector-design-online-job-application_362714-690.jpg?w=2000"
        alt=""
      />
    </div>
  );
};
