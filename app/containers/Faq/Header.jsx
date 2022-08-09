import React from 'react';
import * as routes from 'routes-config';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';
import cn from 'classnames';
import { css } from '@emotion/react';

import { BG_PRIMARY_SPECIAL_2, TEXT_PRIMARY } from 'style-constants';
import QuestionIcon from 'icons/Question';
import InformationIcon from 'icons/Information';

import H3 from 'components/H3';
import Span from 'components/Span';
import A from 'components/A';
import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';

import messages from './messages';

const Header = () => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <div
        className={cn('mr16 brc df aic jcc')}
        css={css`
          background: ${BG_PRIMARY_SPECIAL_2};
          border: 1px solid #c2c6d8;
          width: 43px;
          height: 43px;
        `}
      >
        <QuestionIcon fill="#FFF" size={[24, 24]} stroke="#576FED" />
      </div>

      <span className="d-none d-md-inline-block">
        <FormattedMessage {...messages.faq} />
      </span>

      <span className="d-inline-block d-md-none text-uppercase">
        <FormattedMessage {...commonMessages.faq} />
      </span>
    </H3>

    <WrapperRightPanel className="right-panel">
      <A to={routes.support()}>
        <button>
          <InformationIcon className="mr-1" stroke="#576FED" fill="#576FED" />
          <Span color={TEXT_PRIMARY} className="button-label">
            <FormattedMessage {...commonMessages.support} />
          </Span>
        </button>
      </A>
    </WrapperRightPanel>
  </Wrapper>
);

export default React.memo(Header);
