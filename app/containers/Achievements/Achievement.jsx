import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import achievementReached from 'images/achievement_reached.svg?inline';
import achievementNotReached from 'images/achievement_not_reached.svg?inline';

import Span from 'components/Span';

import { badgesWithValuesIds } from './constants';

const Img = styled('img')`
  margin-right: 15px;
`;

const TitleBlock = styled(Span)`
  display: block;
`;

const DescriptionBlock = styled(TitleBlock)`
  margin-top: 15px;
`;

const Bage = styled.div`
  display: flex;
`;

const ValueSpan = styled.span`
  font-size: 18px;
  margin-right: 4px;
`;

const Achievement = ({
  reached,
  title,
  multipleTitle,
  description,
  value,
  id,
}) => (
  <Bage>
    {reached && <Img src={achievementReached} alt="reached achievement" />}
    {!reached && (
      <Img src={achievementNotReached} alt="not reached achievement" />
    )}
    <div>
      <TitleBlock>
        <strong>
          <ValueSpan>{badgesWithValuesIds.includes(id) && value}</ValueSpan>
          {badgesWithValuesIds.includes(id) && value > 1
            ? multipleTitle
            : title}
        </strong>
      </TitleBlock>
      <DescriptionBlock>{description}</DescriptionBlock>
    </div>
  </Bage>
);

Achievement.propTypes = {
  reached: PropTypes.bool,
  title: PropTypes.string,
  multipleTitle: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.number,
  id: PropTypes.number,
};

export default Achievement;
