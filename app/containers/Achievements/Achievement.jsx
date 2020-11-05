import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import achievementReached from 'images/achievement_reached.svg?external';
import achievementNotReached from 'images/achievement_not_reached.svg?external';

import Icon from 'components/Icon';
import Span from 'components/Span';
import ProgressBar from './ProgressBar';

import messages from './messages';

const LevelIcon = styled(Icon)`
  .crown {
    fill: ${props => {
      if (props.level === 'bronze') return '#8b4513';
      if (props.level === 'silver') return '#c0c0c0';
      if (props.level === 'gold') return '#ffd700';
      return '#F76F60';
    }};
  }
`;

const ImageBlock = styled.div`
  margin-right: 15px;
  text-align: center;
`;

const TitleBlock = styled(Span)`
  display: block;
`;

const DescriptionBlock = styled(TitleBlock)`
  margin-top: 15px;
`;

const Bage = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Achievement = ({
  reached,
  level,
  title,
  description,
  isNext,
  lowerValue,
  currentValue,
  pointsToNext,
  groupType,
  locale,
}) => {
  const getProgress = () => (currentValue / lowerValue) * 100;

  const translations = translationMessages[locale]
    ? translationMessages[locale]
    : null;

  return (
    <Bage>
      <ImageBlock>
        {reached &&
          !level && <Icon icon={achievementReached} width="80" height="74" />}
        {reached &&
          level && (
            <LevelIcon
              icon={achievementReached}
              width="80"
              height="74"
              level={level}
            />
          )}
        {!reached && (
          <Icon icon={achievementNotReached} width="80" height="74" />
        )}
        {isNext && (
          <ProgressBar
            width="60%"
            progress={getProgress()}
            pointsToNext={pointsToNext}
            messageSingle={
              translations[(messages.progressBarPopover[groupType]?.single.id)]
            }
            messageMultiple={
              translations[
                (messages.progressBarPopover[groupType]?.multiple.id)
              ]
            }
          />
        )}
      </ImageBlock>
      <div>
        <TitleBlock>
          <strong>{title}</strong>
        </TitleBlock>
        <DescriptionBlock>{description}</DescriptionBlock>
      </div>
    </Bage>
  );
};

Achievement.propTypes = {
  reached: PropTypes.bool,
  isNext: PropTypes.bool,
  lowerValue: PropTypes.number,
  currentValue: PropTypes.number,
  pointsToNext: PropTypes.number,
  groupType: PropTypes.string,
  level: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  locale: PropTypes.string,
};

export default Achievement;
