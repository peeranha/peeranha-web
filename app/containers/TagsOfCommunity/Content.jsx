import { css } from '@emotion/react';
import { isSingleCommunityWebsite, singleCommunityColors } from 'utils/communityManagement';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import createdHistory from 'createdHistory';
import { Link } from 'react-router-dom';

import * as routes from 'routes-config';

import {
  getPermissions,
  hasCommunityAdminRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';

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
import InfoButton from 'components/Button/Outlined/InfoMedium';

const colors = singleCommunityColors();
const single = isSingleCommunityWebsite();

const Tag = styled.li`
  height: ${({ editTagModerator }) => (editTagModerator ? '180px' : '140px')};
  position: relative;
  margin-bottom: 15px;

  @media only screen and (max-width: 576px) {
    height: ${({ editTagModerator }) => (editTagModerator ? '150px' : '110px')};
  }
`;

const Item = styled.div`
  position: relative;
  min-height: 110px;
  max-height: 110px;
  overflow: hidden;
  transition: 0.15s;
  margin-right: ${(x) => (!x.isInputBox ? '-17px' : '0')};
  padding: ${(x) => (!x.isInputBox ? '2px 32px 2px 15px' : '2px 15px')};

  input {
    background: #FFFFFF0F;
    border: 1px solid #161426;
    color: ${colors.white || ''};
  !important;

    ::placeholder {
      color: ${colors.white || ''};
    !important;
    }
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
    z-index: 2;

    ${Item} {
      max-height: 200px;
      overflow-y: auto;
    }

    ${BlockShadow} {
      display: none;
    }
  }
`;

const EditTagBtnContainer = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 15px;
`;

const Content = ({
  tags,
  loadMoreTags,
  isLastFetch,
  existingTagsLoading,
  typeInput,
  text,
  communityId,
  setEditTagData,
  profileInfo,
}) => {
  const { t } = useTranslation();
  const showEditTagForm = (tagId) => {
    setEditTagData(tagId, communityId);
    createdHistory.push(routes.editTag(communityId, tagId));
  };

  const tagEditingAllowed =
    hasGlobalModeratorRole(getPermissions(profileInfo)) ||
    (Boolean(communityId) && hasCommunityAdminRole(getPermissions(profileInfo), communityId)) ||
    hasProtocolAdminRole(getPermissions(profileInfo));

  const existingTags = Array.isArray(tags) ? tags : tags[communityId];

  const redirectToFilterByTag = (id) => {
    const searchParams = new URLSearchParams(history?.location?.search);
    const searchParamsTags = searchParams.get('tags');
    const newSearchParamsTags = (tagsParams, tagId) => {
      const allTags = tagsParams?.split(',');
      if (!tagsParams) {
        return tagId;
      }
      if (!allTags?.includes(tagId)) {
        return `${tagsParams},${tagId}`;
      }

      return tagsParams;
    };
    searchParams.set('tags', newSearchParamsTags(searchParamsTags, id));
    return `feed?${searchParams}`;
  };

  return (
    <InfinityLoader
      loadNextPaginatedData={loadMoreTags}
      isLoading={existingTagsLoading}
      isLastFetch={isLastFetch}
    >
      <Grid xl={3} md={2} xs={1}>
        {!!existingTags?.length || text ? (
          <li className="d-sm-flex align-items-center justify-content-center">
            <Item isInputBox className="d-flex align-items-center justify-content-center p-2">
              <Input
                input={{ onChange: typeInput, value: text }}
                placeholder={t('tags.findTag')}
                isSearchable
              />
            </Item>
          </li>
        ) : null}

        {existingTags?.map((x) => (
          <Tag key={x.id} editTagModerator={tagEditingAllowed}>
            <Base>
              <Item
                onMouseLeave={(e) => {
                  e.currentTarget.scrollTop = 0;
                }}
              >
                {single ? (
                  <Link to={redirectToFilterByTag(x.id)}>
                    <TagName>{x.name}</TagName>
                    <Span fontSize="14" color={'rgba(225, 225, 228, 1)'}>
                      <span>x </span>
                      <span>{`${x.postCount}`}</span>
                    </Span>
                  </Link>
                ) : (
                  <p>
                    <TagName>{x.name}</TagName>
                    <Span fontSize="14" color={TEXT_SECONDARY}>
                      <span>x </span>
                      <span>{`${x.postCount}`}</span>
                    </Span>
                  </p>
                )}
                <P fontSize="14" lineHeight="18" color={TEXT_SECONDARY}>
                  {x.description}
                </P>
              </Item>
              {tagEditingAllowed && (
                <EditTagBtnContainer>
                  <InfoButton
                    className="ml-15"
                    onClick={() => showEditTagForm(x.id)}
                    css={{
                      backgroundColor: 'rgba(30, 28, 46, 1)',
                      border: '1px solid rgba(30, 28, 46, 1)',
                      color: 'rgba(225, 225, 228, 1)',
                      fontWeight: 600,
                      fontSize: '14px',

                      ':hover': {
                        backgroundColor: 'rgba(32, 31, 48, 1)',
                        border: '1px solid rgba(32, 31, 48, 1)',
                        color: 'rgba(255, 255, 255, 1)',
                      },
                    }}
                  >
                    {t('common.edit')}
                  </InfoButton>
                </EditTagBtnContainer>
              )}
            </Base>
          </Tag>
        ))}
      </Grid>

      {existingTagsLoading && <LoadingIndicator />}
    </InfinityLoader>
  );
};

Content.propTypes = {
  tags: PropTypes.array,
  loadMoreTags: PropTypes.func,
  isLastFetch: PropTypes.bool,
  existingTagsLoading: PropTypes.bool,
  typeInput: PropTypes.func,
  clearTextField: PropTypes.func,
  text: PropTypes.string,
  locale: PropTypes.string,
  communityId: PropTypes.number,
  setEditTagData: PropTypes.func,
  profileInfo: PropTypes.object,
};

export default React.memo(Content);
