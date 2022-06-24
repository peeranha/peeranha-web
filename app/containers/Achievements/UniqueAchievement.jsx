import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import { TEXT_SECONDARY } from 'style-constants';

import achievementNotReached from 'images/achievement_not_reached.svg?external';

import Icon from 'components/Icon';
import Span from 'components/Span';
import ProgressBar from './ProgressBar';

import messages from './messages';

import { uniqueRatingRelated } from './constants';
import { italicFont } from '../../global-styles';
import { getNFTUrl } from '../../utils/ipfs';
import NFTInformation from './NFTInformation';

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
  align-items: center;
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
  id,
  achievementURI,
}) => {
  const availiableCount = maxCount - factCount;
  const getProgress = () => (currentValue / lowerValue) * 100;

  const translations = translationMessages[locale]
    ? translationMessages[locale]
    : null;

  const [visible, changeVisibility] = useState(false);
  const contractAddress = process.env.PEERANHA_NFT;
  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  return (
    <Bage>
      <ImageBlock>
        {reached && (
          <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="position-relative"
          >
            {visible && (
              <NFTInformation
                id={id}
                locale={locale}
                contractAddress={contractAddress}
                ipfsHash={achievementURI}
              />
            )}
            <img
              src={getNFTUrl(image?.slice(7))}
              style={{ width: '160px', height: '148px' }}
              alt={'image'}
            />
          </div>
        )}
        {!reached && (
          <Icon icon={achievementNotReached} width="160" height="148" />
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
  maxCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isNext: PropTypes.bool,
  lowerValue: PropTypes.number,
  currentValue: PropTypes.number,
  pointsToNext: PropTypes.number,
  factCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  locale: PropTypes.string,
  achievementURI: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default UniqueAchievement;
