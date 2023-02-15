import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useMediaQuery from 'hooks/useMediaQuery';
import LimitedLabel from './LimitedLabel';
import ProgressBar from './ProgressBar';
import { getNFTUrl } from '../../utils/ipfs';
import { uniqueRatingRelated } from './constants';

const LIMITED = 0;

const getProgress = (currentValue, lowerValue) =>
  (currentValue / lowerValue) * 100;

const NFTCard = ({
  item,
  hasNFT,
  isCurrentUser,
  currentValue,
}): JSX.Element => {
  const { t } = useTranslation();
  const [isHover, setHover] = useState<boolean>(false);
  const refCard = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const availiableCount = item.maxCount - item.factCount;
  const pointsToNext = (item?.lowerValue || 0) - (currentValue || 0);

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

          ...(hasNFT && {
            background: 'var(--color-white)',
            boxShadow: '0px 2px 4px rgba(7, 16, 64, 0.1)',
          }),

          '@media (min-width: 1024px)': {
            padding: 16,
          },
        }}
        onMouseEnter={isDesktop ? onHover : undefined}
        onMouseLeave={isDesktop ? onBlur : undefined}
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
                height: ref.current?.offsetWidth,
              }}
            />
            <div
              className="pa"
              css={{
                width: 24,
                height: 24,
                top: 4,
                left: 4,
                background: 'var(--color-white)',
                borderRadius: '20px',

                '@media (min-width: 1024px)': {
                  top: 8,
                  left: 8,
                  width: 32,
                  height: 32,
                },
              }}
            >
              <img
                src="https://images.peeranha.io/communities/peeranha/favicon-32x32.png"
                css={{
                  width: 24,
                  height: 24,

                  '@media (min-width: 1024px)': {
                    width: 32,
                    height: 32,
                  },
                }}
              />
            </div>
            {item.achievementsType === LIMITED && <LimitedLabel />}
            {isCurrentUser && !hasNFT && item?.lowerValue && (
              <div
                className="pa full-width df jcc"
                css={{
                  bottom: 8,
                }}
              >
                <ProgressBar
                  achievementId={item.id}
                  progress={getProgress(
                    currentValue || 0,
                    item?.lowerValue || 0,
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
              className="ovh semi-bold fz12"
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
              className="ovh mt4"
              css={{
                ...(!isHover && {
                  display: '-webkit-box',
                  '-webkit-box-orient': 'vertical',
                  '-webkit-line-clamp': '1',
                }),

                fontSize: 10,
                lineHeight: '13px',

                '@media (min-width: 1024px)': {
                  marginTop: 8,
                  fontSize: 14,
                  lineHeight: '18px',
                },
              }}
            >
              {hasNFT && item.description}
              {!hasNFT &&
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
              <div
                css={{
                  wordBreak: 'break-all',
                }}
              >
                <span>Contract: </span>
                <span css={{ color: 'var(--color-link)' }}>
                  {process.env.PEERANHA_NFT}
                </span>
              </div>
              <div
                css={{
                  wordBreak: 'break-all',
                }}
              >
                <span>IPFS: </span>
                <span css={{ color: 'var(--color-link)' }}>
                  {item.achievementURI}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
