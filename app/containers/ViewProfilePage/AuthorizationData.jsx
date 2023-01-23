import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';

import H3 from 'components/H3';
import { BaseStyled } from './SettingsOfUser';
import TransactionHandler from './TransactionHandler';

import commonMessages from 'common-messages';

const AuthorizationData = ({ className }) => {
  return (
    <>
      <BaseStyled className={className} position="bottom">
        <H3>
          <FormattedMessage id={commonMessages.settings.id} />
        </H3>
      </BaseStyled>
      <BaseStyled position="top" notRoundedStyle className={className}>
        <TransactionHandler />
      </BaseStyled>
    </>
  );
};

AuthorizationData.propTypes = {
  className: PropTypes.string,
  locale: PropTypes.string,
  ownerKey: PropTypes.string,
  activeKey: PropTypes.string,
  loginData: PropTypes.object,
  isAvailable: PropTypes.bool,
  writeToBuffer: PropTypes.func,
  tgData: PropTypes.object,
  profile: PropTypes.object,
};

export default AuthorizationData;
