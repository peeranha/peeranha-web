import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

import { useTranslation } from 'react-i18next';
import { getCookie } from 'utils/cookie';
import H3 from 'components/H3';
import TransactionHandler from './TransactionHandler';
import { BaseStyled } from './SettingsOfUser';
import { TYPE_OF_TRANSACTIONS } from 'utils/constants';

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
      border-top-left-radius: 0; !important;
      border-top-right-radius: 0; !important;
    `}
      >
        <H3>{t('common.settings')}</H3>
      </BaseStyled>
      <BaseStyled position="top" notRoundedStyle className={className}>
        <TransactionHandler transaction={transaction} setTransaction={setTransaction} settings />
      </BaseStyled>
    </>
  );
};

AuthorizationData.propTypes = {
  className: PropTypes.string,
};

export default AuthorizationData;
