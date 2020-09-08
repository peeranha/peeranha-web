import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import achievementReached from 'images/achievement_reached.svg?inline';
import achievementNotReached from 'images/achievement_not_reached.svg?inline';

import Span from 'components/Span';

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

const Achievement = ({ reached, title, description }) => (
  <Bage>
    {reached && <Img src={achievementReached} alt="reached achievement" />}
    {!reached && (
      <Img src={achievementNotReached} alt="not reached achievement" />
    )}
    <div>
      <TitleBlock>
        <strong>{title}</strong>
      </TitleBlock>
      <DescriptionBlock>{description}</DescriptionBlock>
    </div>
  </Bage>
);

Achievement.propTypes = {
  reached: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Achievement;
