import React, { useRef } from 'react';
import { CommunityType } from './types';

const LOGO_PEERANHA =
  'https://ipfs-cdn.peeranha.io/QmbEjRVUPyBffw1r5EGW7rAQHxd4NhoNtADy68bEV5YQT4';

const CommunityLabel: React.FC<{
  communityId: string;
  communities: Array<CommunityType>;
  isHover: boolean;
}> = ({ communityId, communities, isHover }): JSX.Element | null => {
  const ref = useRef<HTMLDivElement>(null);

  const community = communities.find((item) => item.id === communityId);

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
        src={community && community.avatar ? community.avatar : LOGO_PEERANHA}
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
        {community ? community.name : 'Peeranha'}
      </div>
    </div>
  );
};

export default CommunityLabel;
