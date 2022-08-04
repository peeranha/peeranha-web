import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
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

import Popover from './Popover';
import { POST_TYPE } from '../../../../utils/constants';

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
    title: 'common.generalPopoverTitle',
    label: 'common.generalPopoverLabel',
    items: 'common.generalPopoverList',
    icon: generalIcon,
  },
  [POST_TYPE.expertPost]: {
    title: 'common.expertPopoverTitle',
    label: 'common.expertPopoverLabel',
    items: 'common.expertPopoverList',
    icon: expertIcon,
    isExpert: true,
  },
  [POST_TYPE.tutorial]: {
    title: 'common.tutorialPopoverTitle',
    label: 'common.tutorialPopoverLabel',
    items: 'common.tutorialPopoverList',
    icon: tutorialIcon,
    isTutorial: true,
  },
};

const QuestionType = ({ postType, isPromoted }) => {
  const { t } = useTranslation();
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
          <PromotedLabel>{t('common.promoted')}</PromotedLabel>
        </LabelItem>
      )}
    </LabelsWrapper>
  );
};

QuestionType.propTypes = {
  postType: PropTypes.number,
  isPromoted: PropTypes.bool,
};

export default memo(QuestionType);
