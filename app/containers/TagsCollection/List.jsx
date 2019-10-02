import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

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

import SeeAllButton from 'components/Button/Outlined/InfoLarge';

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

  ${BaseTransparent} {
    border: 1px solid ${BORDER_TRANSPARENT};
    border-bottom-color: ${BORDER_SECONDARY};

    :last-child {
      border-bottom-color: ${BORDER_TRANSPARENT};
    }

    ${SeeAllButton} {
      display: none;
    }

    :hover {
      border-color: ${BORDER_PRIMARY};

      ${SeeAllButton} {
        @media only screen and (min-width: 576px) {
          display: inline-flex !important;
        }
      }
    }
  }

  ${Box} {
    display: -webkit-inline-box;
    overflow: hidden;

    @media only screen and (max-width: 576px) {
      display: flex;
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
      {_.orderBy(communities, y => y.popularity, 'desc').map(x => (
        <BaseTransparent key={x.value}>
          <A to={routes.communityTags(x.id)}>
            <div className="row align-items-center">
              <div className="col-12 col-sm-4 col-md-3 d-flex">
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
                    color={TEXT_SECONDARY}
                  >
                    <span>{`${x.tags.length} `}</span>
                    <FormattedMessage {...commonMessages.tags} />
                  </P>
                </div>
              </div>

              <div className="col-12 col-sm-8 col-md-9 d-flex align-items-center justify-content-end">
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
