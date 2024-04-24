import React from 'react';
import './index.scss';
import { Text } from '../../atoms/text';
import { Button } from '../../atoms/button';
export interface ItemCategoryProps {
  companyName?: string;
  type?: string;
  title?: string;
  description?: string;
  salary?: string;
  imgUrl?: string;
}

export const ItemCategory: React.FC<ItemCategoryProps> = ({
  imgUrl,
  companyName,
  type,
  title,
  description,
  salary,
}) => {
  return (
    <div className="item-category">
      <div className="item-category__top">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            {' '}
            <img className="item-category__top__img" src={imgUrl} alt="" />
          </div>
          <div className="item-category__top__name">
            <Text content={companyName} color="#113142" fontSize="22px" fontWeight="600" margin="22px" />
          </div>
        </div>
        <div className="item-category__top__type">
          <Text content={type} color="#728689" fontSize="18px" fontWeight="400" margin="18px" />
        </div>
      </div>
      <div className="item-category__name">
        <Text content={title} color="#113142" fontSize="24px" fontWeight="600" margin="24px" />
      </div>
      <div className="item-category__description">
        <Text content={description} color="#728689" fontSize="18px" fontWeight="400" margin="18px" />
      </div>
      <div className="item-category__bottom">
        <div className="item-category__bottom__salary">
          <Text content={salary} color="#113142" fontSize="26px" fontWeight="700" />
          <Text content="/month" color="#728689" fontSize="14px" fontWeight="400" />
        </div>
        <div className="item-category__bottom__btn">
          <Button title="Apply now" bgcolor="#fff" color="#1657ff" />
        </div>
      </div>
    </div>
  );
};
