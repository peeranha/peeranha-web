import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import achievementNotReached from 'images/achievement_not_reached.svg?external';
import achievementReached from 'images/achievement_reached.svg?external';

import Span from 'components/Span';
import Icon from 'components/Icon';

const BageIcon = styled(Icon)`
  margin-right: 15px;
`;

const LevelIcon = styled(BageIcon)`
  .crown {
    fill: ${props => {
      if (props.level === 'bronze') return '#8b4513';
      if (props.level === 'silver') return '#c0c0c0';
      if (props.level === 'gold') return '#ffd700';
      return '#F76F60';
    }};
  }
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

const LevelAchievement = ({
  reached,
  value,
  levels,
  title,
  description,
  bronzeTitle,
  bronzeDescription,
  silverTitle,
  silverDescription,
  goldTitle,
  goldDescription,
}) => {
  const bronze = value >= levels.bronze && value < levels.silver;
  const silver = value >= levels.silver && value < levels.gold;
  const gold = value >= levels.gold;

  const zeroLevel = value < levels.bronze;

  // const nextLevel = () => {
  //   if (value < levels.bronze)
  //     return { nextLevel: 'bronze', remained: levels.bronze - value };
  //   if (value >= levels.bronze && value < levels.silver)
  //     return { nextLevel: 'silver', remained: levels.silver - value };
  //   if (value >= levels.silver && value < levels.gold)
  //     return { nextLevel: 'gold', remained: levels.gold - value };
  //   return null;
  // };

  return (
    <Bage>
      {(!reached || zeroLevel) && (
        <BageIcon icon={achievementNotReached} width="80" height="74" />
      )}
      {bronze && (
        <LevelIcon
          icon={achievementReached}
          width="80"
          height="74"
          level="bronze"
        />
      )}
      {silver && (
        <LevelIcon
          icon={achievementReached}
          width="80"
          height="74"
          level="silver"
        />
      )}
      {gold && (
        <LevelIcon
          icon={achievementReached}
          width="80"
          height="74"
          level="gold"
        />
      )}
      <div>
        <TitleBlock>
          {(!reached || zeroLevel) && <strong>{title}</strong>}
          {bronze && <strong>{bronzeTitle}</strong>}
          {silver && <strong>{silverTitle}</strong>}
          {gold && <strong>{goldTitle}</strong>}
        </TitleBlock>
        {(!reached || zeroLevel) && (
          <DescriptionBlock>{description}</DescriptionBlock>
        )}
        {bronze && <DescriptionBlock>{bronzeDescription}</DescriptionBlock>}
        {silver && <DescriptionBlock>{silverDescription}</DescriptionBlock>}
        {gold && <DescriptionBlock>{goldDescription}</DescriptionBlock>}
        {/* {nextLevel() && (
          <p
            style={{ fontStyle: 'italic', marginTop: '10px', color: 'skyblue' }}
          >
            {nextLevel().remained} points to next level left
          </p>
        )} */}
      </div>
    </Bage>
  );
};

LevelAchievement.propTypes = {
  value: PropTypes.number,
  reached: PropTypes.bool,
  levels: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  bronzeTitle: PropTypes.string,
  bronzeDescription: PropTypes.string,
  silverTitle: PropTypes.string,
  silverDescription: PropTypes.string,
  goldTitle: PropTypes.string,
  goldDescription: PropTypes.string,
};

export default LevelAchievement;
