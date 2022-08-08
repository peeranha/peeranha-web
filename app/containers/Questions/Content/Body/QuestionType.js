import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import commonMessages from 'common-messages';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import {
  TEXT_PREMIUM,
  BORDER_RADIUS_M,
  BG_PREMIUM_LIGHT,
  TEXT_PRIMARY,
  TUTORIAL_ICON_COLOR,
} from 'style-constants';

import TutorialIcon from 'icons/Tutorial';
import HatIcon from 'icons/Hat';
import DiscussionsIcon from 'icons/Discussions';

import Container from 'components/Labels/QuestionType';

import Popover from './Popover';
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

const types = {
  [POST_TYPE.generalPost]: {
    title: commonMessages.generalPopoverTitle.id,
    label: commonMessages.generalPopoverLabel.id,
    items: commonMessages.generalPopoverList.id,
  },
  [POST_TYPE.expertPost]: {
    title: commonMessages.expertPopoverTitle.id,
    label: commonMessages.expertPopoverLabel.id,
    items: commonMessages.expertPopoverList.id,
    isExpert: true,
  },
  [POST_TYPE.tutorial]: {
    title: commonMessages.tutorialPopoverTitle.id,
    label: commonMessages.tutorialPopoverLabel.id,
    items: commonMessages.tutorialPopoverList.id,
    isTutorial: true,
  },
};

const QuestionType = ({ locale, postType, isPromoted }) => {
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  const type = types[postType];

  const typeIcon = iconType => {
    if (iconType.isTutorial) {
      return <TutorialIcon stroke={TUTORIAL_ICON_COLOR} className="mr-2" />;
    }
    if (iconType.isExpert) {
      return <HatIcon stroke={TEXT_PRIMARY} className="mr-2" />;
    }
    return <DiscussionsIcon className="mr-2" />;
  };

  return (
    <LabelsWrapper>
      {type && (
        <LabelItem>
          <Container
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            size="sm"
          >
            {visible && (
              <Popover
                locale={locale}
                title={type.title}
                label={type.label}
                items={type.items}
              />
            )}
            {typeIcon(type)}
          </Container>
        </LabelItem>
      )}

      {isPromoted && (
        <LabelItem>
          <PromotedLabel>
            <FormattedMessage id={commonMessages.promoted.id} />
          </PromotedLabel>
        </LabelItem>
      )}
    </LabelsWrapper>
  );
};

QuestionType.propTypes = {
  postType: PropTypes.number,
  locale: PropTypes.string,
  isPromoted: PropTypes.bool,
};

export default memo(QuestionType);
