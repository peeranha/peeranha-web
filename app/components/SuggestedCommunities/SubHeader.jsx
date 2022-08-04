import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import cn from 'classnames';
import { css } from '@emotion/react';
import CommunitiesIcon from 'icons/Communities';

import H3 from 'components/H3';
import SubHeaderWrapper from 'components/Header/Complex';

import messages from './messages';
import { BG_PRIMARY_SPECIAL_2 } from '../../style-constants';

const SubHeader = () => (
  <SubHeaderWrapper position="bottom">
    <H3>
      <div
        className={cn('mr16 brc df aic jcc')}
        css={css`
          display: flex;
          background: ${BG_PRIMARY_SPECIAL_2};
          border: 1px solid #c2c6d8;
          width: 43px;
          height: 43px;
        `}
      >
        <CommunitiesIcon stroke="#576FED" size={[30, 30]} />
      </div>
    </H3>

    <div className="right-panel" />
  </SubHeaderWrapper>
);

SubHeader.propTypes = {
  setLang: PropTypes.func,
  language: PropTypes.object,
  languages: PropTypes.object,
};

export default React.memo(SubHeader);
