import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import orderBy from 'lodash/orderBy';

import {
  BORDER_SECONDARY,
  BORDER_TRANSPARENT,
  BORDER_PRIMARY,
  TEXT_SECONDARY,
} from 'style-constants';

import commonMessages from 'common-messages';
import * as routes from 'routes-config';

import A from 'components/A';
import P from 'components/P';
import BlockShadow from 'components/BlockShadow';
import TagList, { Box } from 'components/TagsList';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import BaseTransparent from 'components/Base/BaseTransparent';
import { MediumImageStyled } from 'components/Img/MediumImage';

import SeeAllButton from 'components/Button/Outlined/InfoMedium';

const TagListBox = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;

  @media only screen and (max-width: 576px) {
    margin-top: 15px;
  }
`;

const Base = BaseRoundedNoPadding.extend`
  margin-bottom: 15px;
  word-break: break-all;

  ${BaseTransparent} {
    border: 1px solid ${BORDER_TRANSPARENT};
    border-bottom-color: ${BORDER_SECONDARY};

    :last-child {
      border-bottom-color: ${BORDER_TRANSPARENT};
    }

    ${A} {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      > *:nth-child(1) {
        flex: 0 0 300px;
        max-width: 300px;
      }

      > *:nth-child(2) {
        flex: 0 0 calc(100% - 300px);
        max-width: calc(100% - 300px);
      }

      @media only screen and (max-width: 576px) {
        > * {
          flex: 0 0 100% !important;
          max-width: 100% !important;
        }
      }
    }

    ${SeeAllButton} {
      display: none;
    }

    :hover {
      border-color: ${BORDER_PRIMARY};
      ${SeeAllButton} {
        display: inline-flex;
      }
    }
  }

  ${Box} {
    flex-wrap: nowrap !important;
    overflow: hidden;

    > * {
      margin-right: 22px;
    }

    @media only screen and (max-width: 576px) {
      flex-wrap: wrap !important;
      > * {
        margin-right: 0px;
      }
    }
  }
`;

const List = ({ communities }) => {
  if (!communities || !communities.length) return null;

  const communitiesWithLimitedTagNumber = communities.map(z => ({
    ...z,
    tags: z.tags.slice(0, 8),
  }));

  return (
    <Base>
      {orderBy(communities, y => y.popularity, 'desc').map(x => (
        <BaseTransparent key={x.value}>
          <A to={routes.communityTags(x.id)}>
            <div className="d-flex">
              <MediumImageStyled
                className="mt-1"
                src={x.avatar}
                alt="communityAvatar"
              />
              <div>
                <P fontSize="24" bold>
                  {x.label}
                </P>
                <P
                  className="text-lowercase"
                  fontSize="14"
                  lineHeight="18"
                  color={TEXT_SECONDARY}
                >
                  <span>{`${x.tags.length} `}</span>
                  <FormattedMessage {...commonMessages.tags} />
                </P>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-end">
              <TagListBox>
                <TagList
                  communities={communitiesWithLimitedTagNumber}
                  communityId={x.id}
                  showPopularity
                />
                <BlockShadow className="d-none d-sm-block" toSide="right" />
              </TagListBox>

              <SeeAllButton>
                <FormattedMessage {...commonMessages.seeAll} />
              </SeeAllButton>
            </div>
          </A>
        </BaseTransparent>
      ))}
    </Base>
  );
};

List.propTypes = {
  communities: PropTypes.array,
};

export default React.memo(List);
