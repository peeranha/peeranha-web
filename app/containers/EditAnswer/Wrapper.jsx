import React from 'react';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { FormattedMessage } from 'react-intl';
import { TEXT_PRIMARY } from 'style-constants';

import myFeedIcon from 'images/myFeedHeader.svg?inline';
import closeIcon from 'images/closeCircle.svg?inline';

import TipsBase from 'components/Base/TipsBase';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import { MediumImageStyled } from 'components/Img/MediumImage';
import Header from 'components/Header/Simple';
import Tips from 'components/TextEditor/Tips';
import Span from 'components/Span';
import H3 from 'components/H3';
import A from 'components/A';

import messages from './messages';

const Wrapper = ({ children, questionid, answerid }) => (
  <div>
    <Header className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <MediumImageStyled src={myFeedIcon} alt="edit-answer-icon" />
        <FormattedMessage {...messages.editAnswer} />
      </H3>

      <div className="right-panel">
        <A to={routes.questionView(questionid, answerid)}>
          <button>
            <img className="mr-1" src={closeIcon} alt="x" />
            <Span color={TEXT_PRIMARY}>
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
  answerid: PropTypes.number,
};

export default React.memo(Wrapper);
