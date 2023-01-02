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

import Container from 'components/Labels/QuestionType';

import Popover from './Popover';
import { POST_TYPE } from '../../../../utils/constants';

import expertIcon from 'images/hat-3-outline-24.svg?external';
import generalIcon from 'images/comments-outline-24.svg?external';
import tutorialIcon from 'images/tutorial.svg?external';
import documentationIcon from 'images/documentation-icon.svg?external';

import { IconLabel } from '../../../../components/Icon/IconWithSizes';
import { svgDraw } from '../../../../components/Icon/IconStyled';

const LabelItem = styled.span`
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

const Icon = styled(IconLabel)`
  ${({ isTutorial, isExpert }) =>
    svgDraw({
      color: isTutorial
        ? TUTORIAL_ICON_COLOR
        : isExpert
        ? TEXT_PRIMARY
        : 'rgba(242, 163, 159, 1)',
    })};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 7px;
  background-color: ${({ isTutorial, isExpert, isDocumentation }) =>
    isExpert
      ? 'rgba(173, 186, 255, 0.2)'
      : isTutorial
      ? 'rgba(150, 228, 169, 0.2)'
      : isDocumentation
      ? 'rgba(255, 228, 90, 0.2)'
      : 'rgba(255, 174, 188, 0.2)'};
  border-radius: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ isTutorial, isExpert, isDocumentation }) =>
    isExpert
      ? 'rgba(151, 167, 245, 0.2)'
      : isTutorial
      ? 'rgba(135, 210, 151, 0.2)'
      : isDocumentation
      ? 'rgba(245, 190, 140, 0.2)'
      : 'rgba(242, 163, 159, 0.2)'};
  font-weight: normal;
  .opacity {
    fill: none !important;
  }
  .fill {
    fill: ${({ isTutorial }) =>
      isTutorial ? TUTORIAL_ICON_COLOR : 'BORDER_DARK'};
  }
  .semitransparent {
    fill: none;
  }
`;

const types = {
  [POST_TYPE.generalPost]: {
    title: commonMessages.generalPopoverTitle.id,
    label: commonMessages.generalPopoverLabel.id,
    items: commonMessages.generalPopoverList.id,
    icon: generalIcon,
  },
  [POST_TYPE.expertPost]: {
    title: commonMessages.expertPopoverTitle.id,
    label: commonMessages.expertPopoverLabel.id,
    items: commonMessages.expertPopoverList.id,
    icon: expertIcon,
    isExpert: true,
  },
  [POST_TYPE.tutorial]: {
    title: commonMessages.tutorialPopoverTitle.id,
    label: commonMessages.tutorialPopoverLabel.id,
    items: commonMessages.tutorialPopoverList.id,
    icon: tutorialIcon,
    isTutorial: true,
  },
  [POST_TYPE.documentation]: {
    title: commonMessages.documentationPopoverTitle.id,
    label: commonMessages.documentationPopoverLabel.id,
    items: [],
    icon: documentationIcon,
    isDocumentation: true,
  },
};

const QuestionType = ({ locale, postType, className, isPromoted = false }) => {
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  const type = types[postType];

  return (
    <div className={className}>
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
            <Icon
              isExpert={type.isExpert}
              isTutorial={type.isTutorial}
              isDocumentation={type.isDocumentation}
              className="mr-2"
              icon={type.icon}
            />
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
    </div>
  );
};

QuestionType.propTypes = {
  postType: PropTypes.number,
  locale: PropTypes.string,
  isPromoted: PropTypes.bool,
  className: PropTypes.string,
};

export default memo(QuestionType);
