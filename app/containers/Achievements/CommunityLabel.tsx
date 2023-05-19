import React, { useRef } from 'react';
import { CommunityLabelType } from './types';
import { styles } from './Achievements.styled';
import { APP_MAIN_NAME, LOGO_PEERANHA_IPFS } from 'utils/constants';
import { LABEL_WIDTH } from './constants';

const CommunityLabel: React.FC<CommunityLabelType> = ({
  communityId,
  communities,
  isHover,
}): JSX.Element | null => {
  const ref = useRef<HTMLDivElement>(null);

  const community = communities.find((item) => item.id === communityId);

  return (
    <div
      css={{
        ...styles.communityLabel,
        ...(isHover &&
          ref.current && {
            '@media (min-width: 1024px)': {
              width: ref.current.offsetWidth + LABEL_WIDTH,
            },
          }),
      }}
    >
      <img
        src={
          community && community.avatar ? community.avatar : LOGO_PEERANHA_IPFS
        }
      />
      <div ref={ref}>{community ? community.name : APP_MAIN_NAME}</div>
    </div>
  );
};

export default CommunityLabel;
