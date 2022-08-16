import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import communitiesHeader from 'images/communitiesHeader.svg?inline';

import H3 from 'components/H3';
import { MediumImageStyled } from 'components/Img/MediumImage';
import SubHeaderWrapper from 'components/Header/Complex';

const SubHeader = () => {
  const { t } = useTranslation();

  return (
    <SubHeaderWrapper position="bottom">
      <H3>
        <MediumImageStyled
          src={communitiesHeader}
          alt="communities-voting-header"
        />
        {t('common.votingForNewComm')}
      </H3>

      <div className="right-panel" />
    </SubHeaderWrapper>
  );
};

export default SubHeader;
