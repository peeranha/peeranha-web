import React, { memo } from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { intlShape } from 'react-intl';

import { TEXT_PRIMARY } from 'style-constants';

import Icon from 'components/Icon';
import { IconMd } from 'components/Icon/IconWithSizes';
import { MediumIconStyled } from 'components/Icon/MediumIcon';

import closeIcon from 'images/closeCircle.svg?external';
import questionIcon from 'images/question.svg?external';

import A from '../A';
import Span from '../Span';

import Wrapper from '../Header/Simple';
import H3 from '../H3';

const Header = ({ formTitle, questionId, intl }) => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <MediumIconStyled>
        <Icon icon={questionIcon} width="43" />
      </MediumIconStyled>
      <span>{formTitle}</span>
    </H3>

    {questionId && (
      <div className="right-panel">
        <A to={routes.questionView(questionId)}>
          <button>
            <IconMd
              className="mr-1"
              icon={closeIcon}
              fill={TEXT_PRIMARY}
              isColorImportant={true}
            />
            <Span color={TEXT_PRIMARY} className="button-label">
              {intl.formatMessage(commonMessages.close)}
            </Span>
          </button>
        </A>
      </div>
    )}
  </Wrapper>
);

Header.propTypes = {
  formTitle: PropTypes.string,
  intl: intlShape.isRequired,
  questionId: PropTypes.string,
};

export default memo(Header);
