import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useMediaQuery from 'hooks/useMediaQuery';
import LimitedLabel from './LimitedLabel';
import ProgressBar from './ProgressBar';
import CommunityLabel from './CommunityLabel';
import LinkInfo from './LinkInfo';
import { getNFTUrl } from '../../utils/ipfs';
import { uniqueRatingRelated } from './constants';
import { NFTType, CommunityType } from './types';

const LIMITED_PEERANHA_NFT = 0;

const getProgress = (currentValue: number, lowerValue: number) => {
  const result = (currentValue / lowerValue) * 100;

  return result > 100 ? 100 : result;
};

type NFTCardType = {
  item: NFTType;
  hasNFT: boolean;
  isCurrentUser: boolean;
  currentValue: number;
  communities: Array<CommunityType>;
};

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

  return (
    <div>
      <div
        className="pr p12"
        css={{
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '5px',
          minWidth: 148,

          ...(hasNFT && {
            background: 'var(--color-white)',
            boxShadow: '0px 2px 4px rgba(7, 16, 64, 0.1)',
          }),

          '@media (min-width: 1024px)': {
            padding: 16,
            minWidth: 256,
          },
        }}
        onMouseEnter={hasNFT && isDesktop ? onHover : undefined}
        onMouseLeave={hasNFT && isDesktop ? onBlur : undefined}
      >
        <div
          css={{
            ...(isHover &&
              isDesktop &&
              hasNFT && {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                padding: 13,
                border: '3px solid #A5BCFF',
                boxShadow: '0px 10px 20px rgba(24, 39, 79, 0.1)',
                borderRadius: '5px',
                background: 'var(--color-white)',
              }),
          }}
        >
          <div
            ref={ref}
            className="pr df jcc"
            css={{
              margin: 'auto',
              width: '100%',
              height: ref.current?.offsetWidth,
              background: 'var(--color-gray-special)',
              borderRadius: '5px',

              ...(!hasNFT && {
                background: 'rgba(249, 249, 249, 0.5)',
              }),
            }}
          >
            <img
              src={
                hasNFT
                  ? getNFTUrl(item.image?.slice(7))
                  : 'https://images.peeranha.io/nft/closed-new.png'
              }
              alt={`NFT ${item.name}`}
              css={{
                width: '100%',
                height: 'auto',
              }}
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
                <div
                  className="pa full-width df jcc"
                  css={{
                    bottom: 8,

                    '@media (min-width: 992px)': {
                      bottom: 16,
                    },
                  }}
                >
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
          <div
            className="pt12"
            css={{
              color: 'var(--color-black)',

              '@media (min-width: 1024px)': {
                paddingTop: 16,
              },
            }}
          >
            <div
              className="semi-bold fz12 ovh"
              css={{
                ...(!isHover && {
                  display: '-webkit-box',
                  '-webkit-box-orient': 'vertical',
                  '-webkit-line-clamp': '1',
                }),
                lineHeight: '15px',

                '@media (min-width: 1024px)': {
                  fontSize: 16,
                  lineHeight: '20px',
                },
              }}
            >
              {item.name}
            </div>
            <div
              className="mt4 ovh"
              css={{
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
                '-webkit-line-clamp': '1',
                fontSize: 10,
                lineHeight: '13px',

                ...(isHover && {
                  display: 'block',
                }),

                '@media (min-width: 1024px)': {
                  marginTop: 8,
                  fontSize: 14,
                  lineHeight: '18px',
                },
              }}
            >
              {(hasNFT || item.achievementsType !== LIMITED_PEERANHA_NFT) &&
                item.description}
              {!hasNFT &&
                item.achievementsType === LIMITED_PEERANHA_NFT &&
                `Available ${availiableCount} out of ${item.maxCount}`}
            </div>
          </div>
          {isHover && hasNFT && (
            <div
              className="mt8 fz14"
              css={{
                lineHeight: '18px',
                color: '#7B7B7B',
                fontStyle: 'italic',
              }}
            >
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
                title="IPFS"
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
