import React from 'react';
import { useTranslation } from 'react-i18next';

import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';
import { css } from '@emotion/react';

const Header = ({ content }) => {
  const { t } = useTranslation();

  return (
    <Wrapper
      className="mb-to-sm-0 mb-from-sm-3"
      css={css(`
      border-top-left-radius: 0 !important;
      border-top-right-radius: 0 !important;
    `)}
    >
      <H3>
        <span className="d-none d-md-inline-block">
          {content.map((item) => item.role)}
        </span>

        <span className="d-inline-block d-md-none">
          {t('common.moderationHeader')}
        </span>
      </H3>
    </Wrapper>
  );
};

export default Header;
