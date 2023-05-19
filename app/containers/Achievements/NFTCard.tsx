import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useMediaQuery from 'hooks/useMediaQuery';
import LimitedLabel from './LimitedLabel';
import ProgressBar from './ProgressBar';
import CommunityLabel from './CommunityLabel';
import LinkInfo from './LinkInfo';
import { getNFTUrl } from 'utils/ipfs';
import {
  uniqueRatingRelated,
  LIMITED_PEERANHA_NFT,
  CLOSED_NFT_IMG,
  COEFFICIENT_LOWER_VALUE,
} from './constants';
import { NFTCardType } from './types';
import { styles } from './Achievements.styled';

const NFTCard: React.FC<NFTCardType> = ({
  item,
  hasNFT,
  isCurrentUser,
  currentValue,
  communities,
}): JSX.Element => {
  const { t } = useTranslation();
  const [isHover, setHover] = useState<boolean>(false);
  const refCard = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const availiableCount = Number(item.maxCount) - Number(item.factCount);
  const pointsToNext = Number(item.lowerValue) - (currentValue || 0);

  const onHover = (): void => {
    setHover(() => {
      if (refCard.current) {
        refCard.current.style.height = `${refCard.current?.offsetHeight}px`;
      }
      return true;
    });
  };

  const onBlur = (): void => {
    setHover(() => {
      if (refCard.current) {
        refCard.current.style.height = '';
      }

      return false;
    });
  };

  const getProgress = (value: number, lowerValue: number) => {
    const result = (value / lowerValue) * COEFFICIENT_LOWER_VALUE;
    return result > COEFFICIENT_LOWER_VALUE ? COEFFICIENT_LOWER_VALUE : result;
  };

  const getNftImage = (): void =>
    hasNFT ? getNFTUrl(item.image?.slice(7)) : CLOSED_NFT_IMG;

  return (
    <div>
      <div
        css={{ ...styles.nft, ...(hasNFT && styles.nftBG) }}
        onMouseEnter={hasNFT && isDesktop ? onHover : undefined}
        onMouseLeave={hasNFT && isDesktop ? onBlur : undefined}
      >
        <div css={isHover && isDesktop && hasNFT && styles.nftCard}>
          <div
            ref={ref}
            css={{
              ...styles.nftContainer,
              ...{ height: ref.current?.offsetWidth },
              ...(!hasNFT && styles.nftContainerBG),
            }}
          >
            <img
              src={getNftImage()}
              alt={`NFT ${item.name}`}
              css={styles.nftImg}
            />
            <CommunityLabel
              communityId={item.communityId}
              communities={communities}
              isHover={isHover}
            />
            {item.achievementsType === LIMITED_PEERANHA_NFT && <LimitedLabel />}
            {isCurrentUser &&
              !hasNFT &&
              item.achievementsType === LIMITED_PEERANHA_NFT && (
                <div css={styles.achievementCard}>
                  <ProgressBar
                    achievementId={item.id}
                    progress={getProgress(
                      currentValue || 0,
                      Number(item.lowerValue),
                    )}
                    pointsToNext={pointsToNext}
                    groupType={uniqueRatingRelated}
                    messageSingle={t(
                      'achievements.progressBarPopover.ratingRelated.single',
                    )}
                    messageMultiple={t(
                      'achievements.progressBarPopover.ratingRelated.multiple',
                    )}
                  />
                </div>
              )}
          </div>
          <div css={styles.achievementContainer}>
            <div
              css={{
                ...styles.achievementTitle,
                ...(!isHover && styles.achievementTitleHover),
              }}
            >
              {item.name}
            </div>
            <div
              css={{ ...styles.achievementCount, ...(isHover && styles.db) }}
            >
              {(hasNFT || item.achievementsType !== LIMITED_PEERANHA_NFT) &&
                item.description}
              {!hasNFT &&
                item.achievementsType === LIMITED_PEERANHA_NFT &&
                t('achievements.available', {
                  count: availiableCount,
                  maxCount: Number(item.maxCount),
                })}
            </div>
          </div>
          {isHover && hasNFT && (
            <div css={styles.link}>
              <div>ID: {item.id}</div>
              <LinkInfo
                href={
                  (process.env.BLOCKCHAIN_EXPLORERE_URL as string) +
                  process.env.PEERANHA_NFT
                }
                title={t('achievements.contract')}
                titleLink={process.env.PEERANHA_NFT as string}
              />
              <LinkInfo
                href={`
                    ${
                      process.env.IPFS_NFT_URL as string
                    }${item.achievementURI.replace('ipfs://', '')}`}
                title={t('common.ipfsHashValue')}
                titleLink={item.achievementURI}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
