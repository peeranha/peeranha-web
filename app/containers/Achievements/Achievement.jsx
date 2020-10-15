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
        {reached && <Icon icon={achievementReached} width="80" height="74" />}
        {!reached && (
          <Icon icon={achievementNotReached} width="80" height="74" />
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
  next: PropTypes.object,
  locale: PropTypes.string,
};

export default Achievement;
