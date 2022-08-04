import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import P from 'components/P';
import H4 from 'components/H4';

const Box = styled.header`
  h4 {
    padding-bottom: 35px;
    text-align: center;
  }

  p {
    padding-bottom: 15px;
  }

  @media only screen and (max-width: 576px) {
    h4 {
      padding-bottom: 15px;
    }
  }
`;

const BoxComponent = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <H4>{t('common.login')}</H4>

      <P>{t('login.authUserHasMore')}</P>
    </Box>
  );
};

export default BoxComponent;
