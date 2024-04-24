import React from 'react';
import './index.scss';

import { AboutSection } from '../../../components/organisms/about-section';
import { GroupItemCate } from '../../../components/organisms/group-item-cate';
import { Footer } from '../../../components/organisms/footer';
export interface LandingPageProps {}

export const Landing: React.FC<LandingPageProps> = props => {
  return (
    <div className="landing">
      <AboutSection />
      <GroupItemCate />
      <Footer />
    </div>
  );
};
