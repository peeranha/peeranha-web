import React from 'react';
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
  }
`;

const List = ({ communities }) => (
  <Base>
    {_.orderBy(communities, y => y.popularity, 'desc').map(x => (
      <BaseTransparent key={x.value}>
        <A to={routes.communityTags(x.id)}>
          <div className="row align-items-center">
            <div className="col-6 col-sm-4 col-md-3 d-flex">
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

            <div className="col-6 col-sm-8 col-md-9 d-flex align-items-center justify-content-end">
              <div className="d-none d-sm-flex overflow-hidden position-relative flex-grow-1">
                <TagList
                  communities={communities}
                  communityId={x.id}
                  showPopularity
                />
                <BlockShadow toSide="right" />
              </div>

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

List.propTypes = {
  communities: PropTypes.array,
};

export default React.memo(List);
