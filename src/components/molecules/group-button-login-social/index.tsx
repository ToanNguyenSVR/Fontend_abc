import React from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'react-bootstrap';
export interface GroupButtonLoginSocialProps {}

export const GroupButtonLoginSocial: React.FC<GroupButtonLoginSocialProps> = props => {
  return (
    <div className="group-button-social">
      <Button className="social-icon facebook">
        <FontAwesomeIcon icon={faFacebookF} />
      </Button>
      <Button className="social-icon google">
        <FontAwesomeIcon icon={faGoogle} />
      </Button>
    </div>
  );
};
