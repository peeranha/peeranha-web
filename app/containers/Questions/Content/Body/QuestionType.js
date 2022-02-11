import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import commonMessages from 'common-messages';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import {
  TEXT_PREMIUM,
  BORDER_RADIUS_M,
  BG_PREMIUM_LIGHT,
} from 'style-constants';

import Container from 'components/Labels/QuestionType';

import ExpertPopover from './ExpertPopover';
import { POST_TYPE } from '../../../../utils/constants';

const LabelsWrapper = styled.div`
  display: inline-flex;
`;

const LabelItem = styled.span`
  margin-left: 5px;

  > div {
    position: inherit;
  }
`;

const PromotedLabel = styled.span`
  height: 20px;
  font-size: 14px;
  background: ${BG_PREMIUM_LIGHT};
  color: ${TEXT_PREMIUM};
  padding: 0 9px;
  display: inline-flex;
  align-items: center;
  border-radius: ${BORDER_RADIUS_M};
`;

const QuestionType = ({ locale, postType, isPromoted }) => {
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  return (
    <LabelsWrapper>
      {postType === POST_TYPE.expertPost && (
        <LabelItem>
          <Container
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            size="sm"
          >
            {visible && <ExpertPopover locale={locale} />}

            <FormattedMessage {...commonMessages.expert} />
          </Container>
        </LabelItem>
      )}
      {postType === POST_TYPE.tutorial && (
        <LabelItem>
          <Container
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            size="sm"
          >
            {/*TODO change popover*/}
            {visible && <ExpertPopover locale={locale} />}

            <FormattedMessage {...commonMessages.tutorial} />
          </Container>
        </LabelItem>
      )}
      {isPromoted && (
        <LabelItem>
          <PromotedLabel>
            <FormattedMessage {...commonMessages.promoted} />
          </PromotedLabel>
        </LabelItem>
      )}
    </LabelsWrapper>
  );
};

QuestionType.propTypes = {
  locale: PropTypes.string,
  isGeneral: PropTypes.bool,
  isPromoted: PropTypes.bool,
};

export default memo(QuestionType);
