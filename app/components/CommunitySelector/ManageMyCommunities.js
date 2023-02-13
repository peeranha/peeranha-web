import React from 'react';
import * as routes from 'routes-config';
import { TEXT_PRIMARY } from 'style-constants';
import { useTranslation } from 'react-i18next';

import arrowRightIcon from 'images/arrowRight.svg?inline';

import Span from 'components/Span';
import A from 'components/A';

const ManageMyCommunities = () => {
  const { t } = useTranslation();

  return (
    <A to={routes.communities()}>
      <Span color={TEXT_PRIMARY}>
        <img className="mr-2" src={arrowRightIcon} alt="icon" />
        {t('common.manageMyComm')}
      </Span>
    </A>
  );
};

export default ManageMyCommunities;
