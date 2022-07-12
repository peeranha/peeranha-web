import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import commonMessages from 'common-messages';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import {
  TEXT_PREMIUM,
  BORDER_RADIUS_M,
  BG_PREMIUM_LIGHT,
  PRIMARY_SPECIAL,
  BORDER_PRIMARY_DARK,
  APP_FONT,
  TEXT_DARK,
  BORDER_PRIMARY,
  ICON_TRASPARENT_BLUE,
  TEXT_PRIMARY,
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  BORDER_DARK,
  TUTORIAL_BACKLIGHT,
  TUTORIAL_ICON_COLOR,
} from 'style-constants';

import Container from 'components/Labels/QuestionType';

import Popover from './Popover';
import { POST_TYPE } from '../../../../utils/constants';

import expertIcon from 'images/hat-3-outline-24.svg?external';
import generalIcon from 'images/comments-outline-24.svg?external';
import tutorialIcon from 'images/tutorial.svg?external';

import { IconLg } from '../../../../components/Icon/IconWithSizes';
import A from '../../../../components/A';
import { BasicLink } from '../../../LeftMenu/Styles';
import { svgDraw } from '../../../../components/Icon/IconStyled';
import {
  singleCommunityColors,
  singleCommunityFonts,
  singleCommunityStyles,
} from '../../../../utils/communityManagement';

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

const opacity = ({ isExpert, isTutorial }) =>
  isExpert
    ? `.opacity {
    fill: ${TEXT_PRIMARY} !important;
  }`
    : isTutorial
      ? `.opacity {
    fill: ${TUTORIAL_BACKLIGHT} !important;
  }`
      : `.opacity {
     fill: none !important;
   }`;

// ${({ isExpert, isTutorial } ) => {
//   console.log(isTutorial)
//   return opacity({isExpert, isTutorial})
// }};

const Icon = styled(IconLg)`
  ${({ isTutorial, isExpert }) =>
    svgDraw({
      color: isTutorial
        ? TUTORIAL_ICON_COLOR
        : isExpert
          ? TEXT_PRIMARY
          : TEXT_DARK,
    })};
  background-color: ${BG_TRANSPARENT};
  border-color: ${BORDER_TRANSPARENT};
  font-weight: normal;
  .opacity {
    fill: none !important;
  }
  .fill {
    fill: ${({ isTutorial }) =>
      isTutorial ? TUTORIAL_ICON_COLOR : BORDER_DARK};
  }
  .semitransparent {
    fill: none;
  }

  @media (max-width: 576px) {
    margin-top: 40px;
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
};

const QuestionType = ({ locale, postType, isPromoted }) => {
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  const type = types[postType];

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
            <Icon
              isExpert={type.isExpert}
              isTutorial={type.isTutorial}
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
    </LabelsWrapper>
  );
};

QuestionType.propTypes = {
  postType: PropTypes.number,
  locale: PropTypes.string,
  isPromoted: PropTypes.bool,
};

export default memo(QuestionType);
