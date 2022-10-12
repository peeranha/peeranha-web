import React from 'react';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { FormattedMessage } from 'react-intl';
import { TEXT_PRIMARY } from 'style-constants';

import FeedIcon from 'icons/Feed';
import CloseRoundedIcon from 'icons/CloseRounded';

import TipsBase from 'components/Base/TipsBase';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import Header from 'components/Header/Simple';
import Tips from 'components/TextEditor/Tips';
import Span from 'components/Span';
import H3 from 'components/H3';
import A from 'components/A';
import { MediumIconStyled } from 'components/Icon/MediumIcon';

import messages from './messages';

const Wrapper = ({ children, questionid, answerid }) => (
  <div>
    <Header className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <MediumIconStyled>
          <FeedIcon size={[30, 30]} stroke={TEXT_PRIMARY} />
        </MediumIconStyled>
        <FormattedMessage {...messages.editAnswer} />
      </H3>

      <div className="right-panel">
        <A to={routes.questionView(questionid, answerid)}>
          <button>
            <CloseRoundedIcon fill={TEXT_PRIMARY} className="mr-1" />
            <Span color={TEXT_PRIMARY} className="button-label">
              <FormattedMessage {...commonMessages.close} />
            </Span>
          </button>
        </A>
      </div>
    </Header>

    <TipsBase className="overflow-hidden">
      <BaseSpecialOne>{children}</BaseSpecialOne>
      <Tips />
    </TipsBase>
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.any,
  questionid: PropTypes.string,
  answerid: PropTypes.string,
};

export default React.memo(Wrapper);
