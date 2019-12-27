import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { translationMessages } from 'i18n';
import { TEXT_SECONDARY } from 'style-constants';

import InfinityLoader from 'components/InfinityLoader';
import { Tag as TagName } from 'components/TagsList';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import BaseRounded from 'components/Base/BaseRounded';
import Input from 'components/Input';
import BlockShadow from 'components/BlockShadow';
import Span from 'components/Span';
import P from 'components/P';
import Grid from 'components/Grid';

import messages from './messages';

const Tag = styled.li`
  height: 140px;
  position: relative;
  margin-bottom: 15px;

  @media only screen and (max-width: 576px) {
    height: 110px;
  }
`;

const Item = styled.div`
  position: relative;
  min-height: 110px;
  max-height: 110px;
  overflow: hidden;
  transition: 0.15s;
  margin-right: ${x => (!x.isInputBox ? '-17px' : '0')};
  padding: ${x => (!x.isInputBox ? '2px 32px 2px 15px' : '2px 15px')};

  input {
    background: none;
  }

  p:first-child {
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 576px) {
    min-height: 80px;
    max-height: 80px;
  }
`;

const Base = BaseRounded.extend`
  padding: 15px 0 !important;
  min-width: 100%;
  overflow: hidden;

  :hover {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;

    ${Item} {
      max-height: 200px;
      overflow-y: auto;
    }

    ${BlockShadow} {
      display: none;
    }
  }
`;

const Content = ({
  tags,
  loadMoreTags,
  isLastFetch,
  existingTagsLoading,
  typeInput,
  text,
  clearTextField,
  locale,
}) => (
  <InfinityLoader
    loadNextPaginatedData={loadMoreTags}
    isLoading={existingTagsLoading}
    isLastFetch={isLastFetch}
  >
    <Grid xl={3} md={2} xs={1}>
      <li className="d-sm-flex align-items-center justify-content-center">
        <Item
          isInputBox
          className="d-flex align-items-center justify-content-center p-2"
        >
          <Input
            input={{ onChange: typeInput, value: text }}
            placeholder={translationMessages[locale][messages.findTag.id]}
            isSearchable
            onClick={clearTextField}
          />
        </Item>
      </li>

      {tags.map(x => (
        <Tag key={x.id}>
          <Base>
            <Item
              onMouseLeave={e => {
                e.currentTarget.scrollTop = 0;
              }}
            >
              <p>
                <TagName>{x.name}</TagName>
                <Span fontSize="14" color={TEXT_SECONDARY}>
                  <span>x </span>
                  <span>{`${x.questions_asked}`}</span>
                </Span>
              </p>

              <P fontSize="14" lineHeight="18" color={TEXT_SECONDARY}>
                {x.description}
              </P>

              <BlockShadow />
            </Item>
          </Base>
        </Tag>
      ))}
    </Grid>

    {existingTagsLoading && <LoadingIndicator />}
  </InfinityLoader>
);

Content.propTypes = {
  tags: PropTypes.array,
  loadMoreTags: PropTypes.func,
  isLastFetch: PropTypes.bool,
  existingTagsLoading: PropTypes.bool,
  typeInput: PropTypes.func,
  clearTextField: PropTypes.func,
  text: PropTypes.string,
  locale: PropTypes.string,
};

export default React.memo(Content);
