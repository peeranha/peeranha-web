import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

import { useTranslation } from 'react-i18next';

import H3 from 'components/H3';
import TransactionHandler from './TransactionHandler';
import { BaseStyled } from './SettingsOfUser';

const AuthorizationData = ({ className }) => {
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
        <TransactionHandler />
      </BaseStyled>
    </>
  );
};

AuthorizationData.propTypes = {
  className: PropTypes.string,
};

export default AuthorizationData;
