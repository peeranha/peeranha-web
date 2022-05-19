import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import commonMessages from 'common-messages';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import {
  TEXT_PREMIUM,
  BORDER_RADIUS_M,
  BG_PREMIUM_LIGHT,
  TEXT_DARK,
  TEXT_PRIMARY,
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  BORDER_DARK,
  TUTORIAL_ICON_COLOR,
} from 'style-constants';

import Container from 'components/Labels/QuestionType';

import expertIcon from 'images/hat-3-outline-24.svg?external';
import generalIcon from 'images/comments-outline-24.svg?external';
import tutorialIcon from 'images/tutorial.svg?external';
import { POST_TYPE } from '../../../../utils/constants';
import Popover from './Popover';

import { IconLg } from '../../../../components/Icon/IconWithSizes';
import { svgDraw } from '../../../../components/Icon/IconStyled';

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

// const opacity = ({ isExpert, isTutorial }) =>
//   isExpert
//     ? `.opacity {
//     fill: ${TEXT_PRIMARY} !important;
//   }`
//     : isTutorial
//       ? `.opacity {
//     fill: ${TUTORIAL_BACKLIGHT} !important;
//   }`
//       : `.opacity {
//      fill: none !important;
//    }`;

// ${({ isExpert, isTutorial } ) => {
//   console.log(isTutorial)
//   return opacity({isExpert, isTutorial})
// }};

const Icon = styled(IconLg)`
  ${({ isTutorial, isExpert }) => {
    svgDraw({
      color: () => {
        if (isTutorial) {
          return TUTORIAL_ICON_COLOR;
        }
        if (isExpert) {
          return TEXT_PRIMARY;
        }
        return TEXT_DARK;
      },
    });
  }};
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
`;

const QuestionType = ({ locale, postType, isPromoted }) => {
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  return (
    <LabelsWrapper>
      {postType === POST_TYPE.generalPost && (
        <LabelItem>
          <Container
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            size="sm"
          >
            {visible && (
              <Popover
                locale={locale}
                title={commonMessages.generalPopoverTitle.id}
                label={commonMessages.generalPopoverLabel.id}
                items={commonMessages.generalPopoverList.id}
              />
            )}
            <Icon className="mr-2" icon={generalIcon} />
          </Container>
        </LabelItem>
      )}
      {postType === POST_TYPE.expertPost && (
        <LabelItem>
          <Container
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            size="sm"
          >
            {visible && (
              <Popover
                locale={locale}
                title={commonMessages.expertPopoverTitle.id}
                label={commonMessages.expertPopoverLabel.id}
                items={commonMessages.expertPopoverList.id}
              />
            )}
            <Icon isExpert className="mr-2" icon={expertIcon} />
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
            {visible && (
              <Popover
                locale={locale}
                title={commonMessages.tutorialPopoverTitle.id}
                label={commonMessages.tutorialPopoverLabel.id}
                items={commonMessages.tutorialPopoverList.id}
              />
            )}
            <Icon isTutorial className="mr-2" icon={tutorialIcon} />
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
