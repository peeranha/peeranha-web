import React from 'react';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { FormattedMessage } from 'react-intl';
import { TEXT_PRIMARY } from 'style-constants';

import myFeedIcon from 'images/myFeed.svg';
import closeIcon from 'images/closeCircle.svg';

import { MediumImageStyled } from 'components/Img/MediumImage';
import BaseRounded from 'components/Base/BaseRounded';
import Tips from 'components/TextEditor/Tips';
import Span from 'components/Span';
import H3 from 'components/H3';
import A from 'components/A';

import messages from './messages';

const Wrapper = /* istanbul ignore next */ ({
  children,
  questionid,
  answerid,
}) => (
  <div>
    <BaseRounded className="d-flex align-items-center justify-content-between mb-3">
      <H3 className="d-flex align-items-end">
        <MediumImageStyled src={myFeedIcon} alt="edit-answer-icon" />
        <FormattedMessage {...messages.editAnswer} />
      </H3>

      <A
        to={routes.questionView(questionid, answerid)}
        href={routes.questionView(questionid, answerid)}
        className="d-inline-flex align-items-center"
      >
        <img className="mr-1" src={closeIcon} alt="x" />
        <Span color={TEXT_PRIMARY}>
          <FormattedMessage {...commonMessages.close} />
        </Span>
      </A>
    </BaseRounded>

    <BaseRounded className="p-0">
      <div className="d-flex">
        <div className="col-12 col-xl-9 p-0">
          <BaseRounded>{children}</BaseRounded>
        </div>

        <Tips className="d-none d-xl-block col-xl-3 p-0" />
      </div>
    </BaseRounded>
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.any,
  questionid: PropTypes.string,
  answerid: PropTypes.string,
};

export default React.memo(Wrapper);
