import React from 'react';
import './index.scss';
import { Text } from '../../atoms/text';
import { TextLink } from '../../atoms/text-link';
export interface ContendLoginProps {}

export const ContendLogin: React.FC<ContendLoginProps> = props => {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <div style={{ width: '100%' }}>
          <Text content="Sign in to" color="#000" fontSize="72px" fontWeight="600" />
        </div>
        <Text content="Referity" color="#1657FF" fontSize="35px" fontWeight="500" lineHeight="60px" />
        <Text content="If you don’t have an account register" color="#000" fontSize="16px" fontWeight="400" />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text content="You can" color="#000" fontSize="16px" fontWeight="400" />
          <TextLink title="Register here !" color="#1657FF" />
        </div>
      </div>

      <img
        className="img_login_content"
        src="https://s3-alpha-sig.figma.com/img/feb1/4138/168afcca4345533683f89bb42220b2ef?Expires=1683504000&Signature=dVioObEM~Or2IsG1E9PHMEiXIVhAYtRJEGo2Avl2SM0sMXat0IyTUsavuoz~dgd1VEhPPJEYtQaNV35PZGcJwCRYeTubV2VM~cMDjRUKcTOUNUUHsQaM6SYhND17UgxvZWSENAL4ne-oes6oO-~53pNjSWIwadmS-mjYEvayTBkN-AxKVyvobCxyWUdwR39yG9qENxE5MYgEPDGF~BRglVnDDkbPpZGcZQwH7aTGl6W4NByAc5Oj6Jld4zD2VF4UvqxpmH4O1QX2wnciDe8hTtcoGif28v3n4ms3gu04mx3FVYVUqgDvFfH4LB7buKFLV8MRCGnTdPS2IAZ0SKiNBg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        alt=""
      />
    </div>
  );
};
