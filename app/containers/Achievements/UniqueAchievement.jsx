import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { TEXT_SECONDARY } from 'style-constants';
import { isMeshServiceConfig } from 'communities-config';

import achievementNotReached from 'images/achievement_not_reached.svg?external';
import { isSuiBlockchain } from 'utils/constants';

import Icon from 'components/Icon';
import Span from 'components/Span';
import ProgressBar from './ProgressBar';

import { uniqueRatingRelated } from './constants';
import { italicFont } from '../../global-styles';
import { getNFTUrl } from '../../utils/ipfs';
import NFTInformation from './NFTInformation';

const isMeshService = isMeshServiceConfig();

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
  currentUser,
  isMinted,
  canMintAchievement,
  mintAchievement,
}) => {
  const { t } = useTranslation();
  const availiableCount = maxCount - factCount;
  const pointsToNext = lowerValue - (currentValue || 0);
  const getProgress = () => (currentValue / lowerValue) * 100;

  const [visible, changeVisibility] = useState(false);
  const contractAddress = process.env.PEERANHA_NFT;
  const isAchievementVisible = isMeshService ? isMinted : reached;
  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  return (
    <>
      {reached && (
        <Bage>
          <ImageBlock>
            {isAchievementVisible ? (
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
            ) : (
              <Icon icon={achievementNotReached} width="160" height="148" />
            )}
            {currentUser && !isAchievementVisible && !isSuiBlockchain && (
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
              {!isAchievementVisible && !isSuiBlockchain && (
                <LimitPhrase>
                  Available {availiableCount} out of {maxCount}
                </LimitPhrase>
              )}
            </DescriptionBlock>
            {isSuiBlockchain && !isMinted && currentUser && (
              <button
                css={{
                  width: '96px',
                  height: '40px',
                  backgroundColor: canMintAchievement ? '#4BA3FF' : '#FFF',
                  color: canMintAchievement ? '#fff' : '#95A3B0',
                  border: `1px solid ${canMintAchievement ? '#4BA3FF' : '#95A3B0'}`,
                  cursor: canMintAchievement ? 'pointer' : 'not-allowed',
                  borderRadius: '3px',
                  marginTop: '16px',
                }}
                disabled={!canMintAchievement}
                onClick={() => mintAchievement(id.split('-')[1])}
              >
                {t('achievements.claim')}
              </button>
            )}
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
  isMinted: PropTypes.bool,
  canMintAchievement: PropTypes.bool,
  mintAchievement: PropTypes.func,
};

export default UniqueAchievement;
