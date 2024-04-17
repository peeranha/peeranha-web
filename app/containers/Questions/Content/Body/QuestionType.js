/* eslint-disable no-nested-ternary */
import React, { memo, useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import {
  TEXT_PREMIUM,
  BORDER_RADIUS_M,
  BG_PREMIUM_LIGHT,
  TEXT_PRIMARY,
  TUTORIAL_ICON_COLOR,
  BORDER_DARK,
} from 'style-constants';
import expertIcon from 'images/hat-3-outline-24.svg?external';
import generalIcon from 'images/comments-outline-24.svg?external';
import tutorialIcon from 'images/tutorial.svg?external';
import documentationIcon from 'images/documentation-icon.svg?external';
import discordIcon from 'images/discordLogo.svg?external';
// import telegramIcon from 'images/telegramLogo.svg?external';
// import slackIcon from 'images/slackLogo.svg?external';

import { POST_TYPE } from 'utils/constants';
import { graphCommunityColors } from 'utils/communityManagement';

import Container from 'components/Labels/QuestionType';
import { IconLabel } from 'components/Icon/IconWithSizes';
import { svgDraw } from 'components/Icon/IconStyled';
import {
  PlayCircleGraph,
  ChatsCircleGraph,
  GraduationCapGraph,
  DocumentationGraph,
  DiscordLogo,
  // TelegramLogo,
  // SlackLogo,
} from 'components/icons';

import Popover from './Popover';

const graphCommunity = graphCommunityColors();

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

const GraphLabel = styled.span`
  background-color: ${({ isTutorial, isExpert, isDocumentation, isDiscord }) =>
    isExpert
      ? 'rgba(255, 174, 188, 0.2)'
      : isTutorial
      ? 'rgba(150, 228, 169, 0.2)'
      : isDocumentation
      ? 'rgba(255, 228, 90, 0.2)'
      : isDiscord
      ? 'rgba(88, 101, 242, 0.15)'
      : 'rgba(173, 186, 255, 0.2)'};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ isTutorial, isExpert, isDocumentation, isDiscord }) =>
    isExpert
      ? 'rgba(237, 74, 109, 0.2)'
      : isTutorial
      ? 'rgba(75, 202, 129, 0.2)'
      : isDocumentation
      ? 'rgba(245, 190, 140, 0.2)'
      : isDiscord
      ? 'rgba(88, 101, 242, 0.15)'
      : 'rgba(76, 105, 255, 0.2)'};
  padding: 1px 7px 1px 7px;
  gap: 10px;
  border-radius: 20px;
`;

const Icon = styled(IconLabel)`
  ${({ isTutorial, isExpert }) =>
    svgDraw({
      color: isTutorial ? TUTORIAL_ICON_COLOR : isExpert ? TEXT_PRIMARY : 'rgba(242, 163, 159, 1)',
    })};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 7px;
  background-color: ${({ isTutorial, isExpert, isDocumentation, isDiscord }) =>
    isExpert
      ? 'rgba(173, 186, 255, 0.2)'
      : isTutorial
      ? 'rgba(150, 228, 169, 0.2)'
      : isDocumentation
      ? 'rgba(255, 228, 90, 0.2)'
      : isDiscord
      ? 'rgba(88, 101, 242, 0.15)'
      : 'rgba(255, 174, 188, 0.2)'};
  border-radius: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ isTutorial, isExpert, isDocumentation, isDiscord }) =>
    isExpert
      ? 'rgba(151, 167, 245, 0.2)'
      : isTutorial
      ? 'rgba(135, 210, 151, 0.2)'
      : isDocumentation
      ? 'rgba(245, 190, 140, 0.2)'
      : isDiscord
      ? 'rgba(88, 101, 242, 0.15)'
      : 'rgba(242, 163, 159, 0.2)'};
  font-weight: normal;
  .opacity {
    fill: none !important;
  }
  .fill {
    fill: ${({ isTutorial }) => (isTutorial ? TUTORIAL_ICON_COLOR : BORDER_DARK)};
  }
  svg {
    fill: none !important;
  }
  .semitransparent {
    fill: none;
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
  [POST_TYPE.documentation]: {
    title: 'common.documentationPopoverTitle',
    label: 'common.documentationPopoverLabel',
    items: [],
    icon: documentationIcon,
    isDocumentation: true,
  },
  [POST_TYPE.autoscraped]: {
    title: 'common.discordPopoverTitle',
    label: 'common.discordPopoverLabel',
    items: 'common.discordPopoverList',
    icon: discordIcon,
    isDiscord: true,
  },
  // To do: telegram and slack
  // [POST_TYPE.telegram]: {
  //   title: 'common.telegramPopoverTitle',
  //   label: 'common.telegramPopoverLabel',
  //   items: 'common.telegramPopoverList',
  //   icon: documentationIcon,
  //   isTelegram: true,
  // },
  // [POST_TYPE.slack]: {
  //   title: 'common.slackPopoverTitle',
  //   label: 'common.slackPopoverLabel',
  //   items: 'common.slackPopoverList',
  //   icon: documentationIcon,
  //   isSlack: true,
  // },
};

const QuestionType = ({ postType, className, isPromoted = false, isSearch = false }) => {
  const { t } = useTranslation();
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  const graphIcon = useMemo(() => {
    if (postType === 0) {
      return <ChatsCircleGraph size={[24, 24]} fill="#ED4A6D" />;
    }
    if (postType === 1) {
      return <GraduationCapGraph size={[24, 24]} fill="#4C69FF" />;
    }
    if (postType === 2) {
      return <PlayCircleGraph size={[24, 24]} fill="#4BCA81" />;
    }
    if (postType === 3) {
      return (
        <DiscordLogo size={[24, 24]} stroke="rgba(88, 101, 242, 0.8)" css={{ fill: 'none' }} />
      );
    }
    // To do: telegram and slack
    // if (postType === 4) {
    //   return (
    //     <TelegramLogo size={[24, 24]} stroke="rgba(88, 101, 242, 0.8)" css={{ fill: 'none' }} />
    //   );
    // }
    // if (postType === 5) {
    //   return <SlackLogo size={[24, 24]} stroke="rgba(88, 101, 242, 0.8)" css={{ fill: 'none' }} />;
    // }
    return <DocumentationGraph size={[24, 24]} fill="#FFA801" />;
  }, [postType]);

  const type = types[postType];

  return (
    <div className={className}>
      {type && (
        <LabelItem>
          <Container onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} size="sm">
            {visible && (
              <Popover
                title={type.title}
                label={type.label}
                items={type.items}
                isSearch={isSearch}
                width={290}
              />
            )}
            {graphCommunity ? (
              <GraphLabel
                isExpert={type.isExpert}
                isTutorial={type.isTutorial}
                isDocumentation={type.isDocumentation}
                isDiscord={type.isDiscord}
                // isTelegram={type.isTelegram}
                // isSlack={type.isSlack}
                className={`mr-2 ${!isSearch && 'ml4'}`}
              >
                {graphIcon}
              </GraphLabel>
            ) : (
              <Icon
                isExpert={type.isExpert}
                isTutorial={type.isTutorial}
                isDocumentation={type.isDocumentation}
                isDiscord={type.isDiscord}
                // isTelegram={type.isTelegram}
                // isSlack={type.isSlack}
                className={`mr-2 ${!isSearch && 'ml4'}`}
                icon={type.icon}
              />
            )}
          </Container>
        </LabelItem>
      )}
    </div>
  );
};

QuestionType.propTypes = {
  postType: PropTypes.number,
  isPromoted: PropTypes.bool,
  className: PropTypes.string,
};

export default memo(QuestionType);
