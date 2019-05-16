import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TEXT_SECONDARY } from 'style-constants';

import InfinityLoader from 'components/InfinityLoader';
import { Tag as TagName } from 'components/TagsList';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import BaseRounded from 'components/Base/BaseRounded';
import Input from 'components/Input';
import BlockShadow from 'components/BlockShadow';
import Span from 'components/Span';
import P from 'components/P';

const Tag = styled.div`
  min-height: 140px;
  position: relative;
`;

const Item = styled.div`
  height: 110px;
  padding: 2px 0;
  overflow: hidden;
  word-break: break-word;
`;

const Base = BaseRounded.extend`
  padding: 15px;
  min-width: 100%;

  :hover {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;

    ${Item} {
      min-height: 110px;
      height: auto;
    }

    ${BlockShadow} {
      display: none;
    }
  }
`;

const Content = /* istanbul ignore next */ ({
  tags,
  loadMoreTags,
  isLastFetch,
  existingTagsLoading,
  typeInput,
  text,
}) => (
  <InfinityLoader
    loadNextPaginatedData={loadMoreTags}
    isLoading={existingTagsLoading}
    isLastFetch={isLastFetch}
  >
    <ul className="row">
      <li className="col-xl-4">
        <Item className="d-flex align-items-center justify-content-center p-2">
          <Input
            input={{ onChange: typeInput, value: text }}
            placeholder="Find tag"
            isSearchable
          />
        </Item>
      </li>

      {tags.map(x => (
        <li key={x.name} className="col-xl-4 mb-3">
          <Tag>
            <Base>
              <Item>
                <p className="mb-3">
                  <TagName>{x.name}</TagName>
                  <Span fontSize="14" color={TEXT_SECONDARY}>
                    <span>x </span>
                    <span>{x.popularity}</span>
                  </Span>
                </p>

                <P fontSize="14" color={TEXT_SECONDARY}>
                  {x.description}
                </P>

                <BlockShadow />
              </Item>
            </Base>
          </Tag>
        </li>
      ))}
    </ul>

    {existingTagsLoading && <LoadingIndicator />}
  </InfinityLoader>
);

Content.propTypes = {
  tags: PropTypes.array,
  loadMoreTags: PropTypes.func,
  isLastFetch: PropTypes.bool,
  existingTagsLoading: PropTypes.bool,
  typeInput: PropTypes.func,
  text: PropTypes.string,
};

export default React.memo(Content);
