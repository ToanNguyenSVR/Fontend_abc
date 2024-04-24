import React, { FC, useEffect, useState } from 'react';
import PageTemplate from '../../../components/templates/page-template';
import JobList from '../../../components/organisms/manage-job';
import myAxios from '../../../axios/config';

const Job: FC = () => {
  return <JobList />;
};

export default Job;
