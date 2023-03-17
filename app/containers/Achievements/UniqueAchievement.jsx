import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { TEXT_SECONDARY } from 'style-constants';

import achievementNotReached from 'images/achievement_not_reached.svg?external';

import Icon from 'components/Icon';
import Span from 'components/Span';
import ProgressBar from './ProgressBar';

import { uniqueRatingRelated } from './constants';
import { italicFont } from '../../global-styles';
import { getNFTUrl } from '../../utils/ipfs';
import { LIMITED_EDITION_NFT_TYPE } from '../../utils/constants';
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

  @media only screen and (max-width: 330px) {
    flex-direction: column;
  }
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
  name,
  description,
  locale,
  image,
  id,
  achievementURI,
  achievementsType,
  currentUser,
}) => {
  const { t } = useTranslation();
  const availiableCount = maxCount - factCount;
  const pointsToNext = lowerValue - (currentValue || 0);
  const getProgress = () => (currentValue / lowerValue) * 100;

  const [visible, changeVisibility] = useState(false);
  const contractAddress = process.env.PEERANHA_NFT;
  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  return (
    <>
      {(reached || achievementsType == LIMITED_EDITION_NFT_TYPE) && (
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
            {!reached && <Icon icon={achievementNotReached} width="160" height="148" />}
            {currentUser && !reached && (
              <ProgressBar
                achievementId={id}
                width="60%"
                progress={getProgress()}
                pointsToNext={pointsToNext}
                groupType={uniqueRatingRelated}
                messageSingle={t('achievements.progressBarPopover.ratingRelated.single')}
                messageMultiple={t('achievements.progressBarPopover.ratingRelated.multiple')}
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
      )}
    </>
  );
};

UniqueAchievement.propTypes = {
  reached: PropTypes.bool,
  name: PropTypes.string,
  maxCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isNext: PropTypes.bool,
  lowerValue: PropTypes.number,
  currentValue: PropTypes.number,
  factCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  locale: PropTypes.string,
  achievementURI: PropTypes.string,
  achievementsType: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default UniqueAchievement;
