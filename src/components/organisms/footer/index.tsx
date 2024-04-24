import React from 'react';
import './index.scss';
import { Text } from '../../atoms/text';
import { TextLink } from '../../atoms/text-link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
export interface FooterProps {}

export const Footer: React.FC<FooterProps> = props => {
  return (
    <div className="footer">
      <div className="footer__description">
        <Text
          content="Venture customer niche market adopters monetization."
          color="#FFFFFF"
          fontSize="18px"
          fontWeight="400"
          textAlign="center"
          margin="0"
        />
      </div>
      <div className="footer__link">
        <ul>
          <li>
            <TextLink title="Home" color="#FFFFFF" />
          </li>
          <li>
            <TextLink title="About" color="#FFFFFF" />
          </li>
          <li>
            <TextLink title="Blog" color="#FFFFFF" />
          </li>
          <li>
            <TextLink title="Pages" color="#FFFFFF" />
          </li>
          <li>
            <TextLink title="Contact" color="#FFFFFF" />
          </li>
        </ul>
      </div>
      <div className="footer__socical">
        <h4>Follow Us</h4>
        <ul>
          <li>
            <a href="#">
              <FaFacebook />
            </a>
          </li>

          <li>
            <a href="#">
              <FaInstagram />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer_subscribe"></div>
    </div>
  );
};
