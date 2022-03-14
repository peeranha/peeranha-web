import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import { TEXT_SECONDARY } from 'style-constants';

import achievementReached from 'images/achievement_reached.svg?external';
import achievementNotReached from 'images/achievement_not_reached.svg?external';

import Icon from 'components/Icon';
import Span from 'components/Span';
import ProgressBar from './ProgressBar';

import messages from './messages';

import { uniqueRatingRelated } from './constants';
import { italicFont } from '../../global-styles';
import { getFileUrl, getIpfsHashFromBytes32, getText } from '../../utils/ipfs';
import { MediumImageStyled } from '../../components/Img/MediumImage';

const ImageBlock = styled.div`
  margin-right: 15px;
  text-align: center;
`;

const TitleBlock = styled(Span)`
  display: block;

  & > span {
    font-weight: 600;
  }
`;

const DescriptionBlock = styled(TitleBlock)`
  margin-top: 15px;
`;

const Bage = styled.div`
  display: flex;
  align-items: flex-start;
`;

const LimitPhrase = styled.p`
  margin-top: 10px;
  font-style: ${italicFont};
  color: ${TEXT_SECONDARY};
  font-size: 14px;
`;

const UniqueAchievement = ({
  reached,
  maxCount,
  factCount,
  lowerValue,
  currentValue,
  isNext,
  pointsToNext,
  name,
  description,
  locale,
  image,
}) => {
  console.log(reached);
  const availiableCount = maxCount - factCount;
  const getProgress = () => (currentValue / lowerValue) * 100;

  const translations = translationMessages[locale]
    ? translationMessages[locale]
    : null;

  return (
    <Bage>
      <ImageBlock>
        {reached && (
          <Icon
            icon={`<img src=${getFileUrl(image ?? '')} alt="Wrong Data">`}
            width="80"
            height="74"
          />
        )}
        {!reached && (
          <Icon
            icon={`<img src=${getFileUrl(image ?? '')} alt="Wrong Data">`}
            width="80"
            height="74"
          />
        )}
        {isNext && (
          <ProgressBar
            width="60%"
            progress={getProgress()}
            pointsToNext={pointsToNext}
            groupType={uniqueRatingRelated}
            messageSingle={
              translations[messages.progressBarPopover.ratingRelated.single.id]
            }
            messageMultiple={
              translations[
                messages.progressBarPopover.ratingRelated.multiple.id
              ]
            }
          />
        )}
      </ImageBlock>
      <div>
        <TitleBlock>
          <span>{name}</span>
        </TitleBlock>
        <DescriptionBlock>
          {description}
          {!reached && (
            <LimitPhrase>
              Available {availiableCount} out of {maxCount}
            </LimitPhrase>
          )}
        </DescriptionBlock>
      </div>
    </Bage>
  );
};

UniqueAchievement.propTypes = {
  reached: PropTypes.bool,
  name: PropTypes.string,
  maxCount: PropTypes.number,
  isNext: PropTypes.bool,
  lowerValue: PropTypes.number,
  currentValue: PropTypes.number,
  pointsToNext: PropTypes.number,
  factCount: PropTypes.number,
  description: PropTypes.string,
  locale: PropTypes.string,
};

export default UniqueAchievement;
