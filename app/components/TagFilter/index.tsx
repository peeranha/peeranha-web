import {
  PEER_PRIMARY_COLOR,
  BORDER_RADIUS_L,
  TEXT_LIGHT,
} from 'style-constants';
import { Tag } from 'components/TagsList';
import ScrollContainer from 'components/ScrollContainer';

import { singleCommunityColors } from 'utils/communityManagement';
import { getSearchParams } from 'utils/url';

import FailedTransactionIcon from 'icons/FailedTransaction';

import React from 'react';
import createdHistory from 'createdHistory';
import { css } from '@emotion/react';
import { styles } from './index.styled';

const colors = singleCommunityColors();

const TagFilter: React.FC<{
  tags: string[];
  tagsNames: any;
  communityId: string | number;
}> = ({ tags, tagsNames, communityId }) => {
  const removeTagFilter = (removedTag: string) => {
    const searchParams = new URLSearchParams(createdHistory.location.search);
    const searchParamsTags = getSearchParams(createdHistory.location.search);
    const result = searchParamsTags?.filter((item) => item !== removedTag);
    if (result?.length) {
      searchParams.set('tags', result.join(','));
    } else {
      searchParams.delete('tags');
    }
    createdHistory.push(`${createdHistory.location.pathname}?${searchParams}`);
  };

  if (!communityId || !tags?.length) return null;

  return (
    <div css={css(styles.container)}>
      <ScrollContainer>
        <div className="df mt-md-3 mt-sm-0">
          {tags.map((tag) => (
            <Tag
              key={tag}
              css={css(styles.TagFilter)}
              style={{
                ['--text-light' as any]: TEXT_LIGHT,
                ['--color-borderColor' as any]:
                  colors?.linkColor || PEER_PRIMARY_COLOR,
                ['--border-radius' as any]: BORDER_RADIUS_L,
                ['--background-style' as any]:
                  colors?.linkColor || PEER_PRIMARY_COLOR,
              }}
            >
              {tagsNames[tag]}
              <button
                type="button"
                css={css(styles.RemoveTagIcon)}
                onClick={() => removeTagFilter(tag)}
              >
                <FailedTransactionIcon
                  stroke={TEXT_LIGHT}
                  size={[16, 16]}
                  strokeOpacity={1}
                  fillOpacity={0.2}
                  fill={TEXT_LIGHT}
                ></FailedTransactionIcon>
              </button>
            </Tag>
          ))}
        </div>
      </ScrollContainer>
    </div>
  );
};

export default TagFilter;
