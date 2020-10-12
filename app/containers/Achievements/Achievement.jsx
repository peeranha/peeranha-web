import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import achievementReached from 'images/achievement_reached.svg?inline';
import achievementNotReached from 'images/achievement_not_reached.svg?inline';

import Span from 'components/Span';
import ProgressBar from './ProgressBar';

import messages from './messages';

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

const Achievement = ({ reached, title, description, next, locale }) => {
  const getProgress = () => {
    const { minRating, userRating } = next;
    return (userRating / minRating) * 100;
  };

  const translations = translationMessages[locale]
    ? translationMessages[locale]
    : null;

  return (
    <Bage>
      <ImageBlock>
        {reached && <img src={achievementReached} alt="reached achievement" />}
        {!reached && (
          <img src={achievementNotReached} alt="not reached achievement" />
        )}
        {next && (
          <ProgressBar
            width="60%"
            progress={getProgress()}
            message={`${next.pointsToNext} ${
              translations[messages.progressBar.nextByRating.id]
            }`}
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
  title: PropTypes.string,
  description: PropTypes.string,
  next: PropTypes.bool,
  locale: PropTypes.string,
};

export default Achievement;
