import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import createdHistory from 'createdHistory';

import commonMessages from 'common-messages';
import * as routes from 'routes-config';

import { communityAdminCreateTagPermission } from 'utils/properties';
import { MODERATOR_KEY } from 'utils/constants';

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

import messages from './messages';

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

const EditTagBtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
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
  communityId,
  setEditTagData,
  profileInfo,
}) => {
  const showEditTagForm = tagId => {
    setEditTagData(tagId, communityId);
    createdHistory.push(routes.editTag(communityId, tagId));
  };

  const isGlobalModerator = useMemo(
    () =>
      !!profileInfo?.['integer_properties']?.find(x => x.key === MODERATOR_KEY),
    [profileInfo?.['integer_properties']],
  );

  const createTagPermission = useMemo(
    () =>
      communityAdminCreateTagPermission(profileInfo?.permissions, communityId),
    [profileInfo?.permissions, communityId],
  );

  const editTagModerator = isGlobalModerator || createTagPermission;

  return (
    <InfinityLoader
      loadNextPaginatedData={loadMoreTags}
      isLoading={existingTagsLoading}
      isLastFetch={isLastFetch}
    >
      <Grid xl={3} md={2} xs={1}>
        {!!tags.length || text ? (
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
        ) : null}

        {tags.map(x => (
          <Tag key={x.id} editTagModerator={editTagModerator}>
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
                    <span>{`${x.questionsAsked}`}</span>
                  </Span>
                </p>

                <P fontSize="14" lineHeight="18" color={TEXT_SECONDARY}>
                  {x.description}
                </P>

                <BlockShadow />
              </Item>
              {editTagModerator && (
                <EditTagBtnContainer>
                  <InfoButton
                    className="ml-15"
                    onClick={() => showEditTagForm(x.id)}
                  >
                    <FormattedMessage {...commonMessages.edit} />
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
