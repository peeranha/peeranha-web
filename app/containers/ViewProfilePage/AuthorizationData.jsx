import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { TYPE_OF_TRANSACTIONS } from 'utils/constants';
import { graphCommunityColors } from 'utils/communityManagement';
import { getCookie } from 'utils/cookie';

import H3 from 'components/H3';

import TransactionHandler from './TransactionHandler';
import { BaseStyled } from './SettingsOfUser';

const graphCommunity = graphCommunityColors();

const AuthorizationData = ({ className }) => {
  const dataFromCookies = getCookie(TYPE_OF_TRANSACTIONS);
  const [transaction, setTransaction] = useState(dataFromCookies);
  const { t } = useTranslation();
  return (
    <>
      <BaseStyled
        className={className}
        position="bottom"
        css={css`
          border-top-left-radius: 0;
        !important;
          border-top-right-radius: 0;
        !important;
          border: ${graphCommunity ? 'none' : ''};
          background: ${graphCommunity ? 'none' : ''};
        `}
      >
        <H3>{t('common.settings')}</H3>
      </BaseStyled>
      <BaseStyled position="top" className={className}>
        <TransactionHandler transaction={transaction} setTransaction={setTransaction} settings />
      </BaseStyled>
    </>
  );
};

AuthorizationData.propTypes = {
  className: PropTypes.string,
};

export default AuthorizationData;
