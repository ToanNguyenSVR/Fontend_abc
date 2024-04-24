import React, { useState } from 'react';
import './index.scss';

import { Layout, Menu, Card, Row, Col, Tag, Avatar } from 'antd';
import { DesktopOutlined, FileOutlined, UserOutlined } from '@ant-design/icons';
import { ManageCandidateForm } from '../../organisms/manage-candidate-form';
import PageTemplate from '../page-template';

const { Content, Sider } = Layout;

export interface HeadhunterPageProps {}

export const HeadhunterPage: React.FC<HeadhunterPageProps> = props => {
  return <ManageCandidateForm />;
};
