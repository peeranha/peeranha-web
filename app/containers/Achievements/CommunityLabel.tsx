import React, { useRef } from 'react';
import { CommunityType } from './types';

const CommunityLabel: React.FC<{
  communityId: string;
  communities: Array<CommunityType>;
  isHover: boolean;
}> = ({ communityId, communities, isHover }): JSX.Element | null => {
  const ref = useRef<HTMLDivElement>(null);

  const community = communities.find((item) => item.id === communityId);

  if (!community) {
    return null;
  }

  return (
    <div
      className="pa df aic no-wrap ovh"
      css={{
        height: 24,
        width: 24,
        top: 4,
        left: 4,
        background: 'var(--color-white)',
        borderRadius: '20px',

        '@media (min-width: 1024px)': {
          top: 8,
          left: 8,
          height: 32,
          width: 32,
          transition: 'width .3s ease-out',

          ...(isHover &&
            ref.current && {
              width: ref.current.offsetWidth + 32,
            }),
        },
      }}
    >
      <img
        src={`https://images.peeranha.io/nft/community-icons/${community.name
          .toLowerCase()
          .replace(' ', '-')}.png`}
        css={{
          width: 24,
          height: 24,

          '@media (min-width: 1024px)': {
            width: 32,
            height: 32,
          },
        }}
      />
      <div
        className="fz14 bold pl8 pr12"
        css={{
          lineHeight: '18px',
        }}
        ref={ref}
      >
        {community.name}
      </div>
    </div>
  );
};

export default CommunityLabel;
