import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import orderBy from 'lodash/orderBy';
import { TEXT_SECONDARY } from 'style-constants';
import commonMessages from 'common-messages';
import * as routes from 'routes-config';
import A from 'components/A';
import P from 'components/P';
import BlockShadow from 'components/BlockShadow';
import TagList from 'components/TagsList';
import { BaseSpecial } from 'components/Base/BaseTransparent';
import { MediumImageStyled } from 'components/Img/MediumImage';
import SeeAllButton from 'components/Button/Outlined/InfoMedium';
import { DescriptionBlock, Base } from 'components/ExistingCommunities/Content';

const TagListBox = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;

  ul {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  ul li {
    margin-right: 30px;
  }
`;

const TagsBlock = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 calc(100% - 300px - 15px);
  max-width: calc(100% - 300px - 15px);
  margin-top: 6px;

  @media only screen and (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-top: 16px;

    ul li {
      margin-right: 6px;
    }

    ${SeeAllButton} {
      display: none !important;
    }
  }

  :hover {
    ${SeeAllButton} {
      display: block;
    }
  }

  ${SeeAllButton} {
    display: none;
  }
`;

export const NameHolder = P.extend`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;

  @media only screen and (max-width: 767px) {
    max-width: 70vw;
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
      {orderBy(communities, y => y.popularity, 'desc').map(x => {
        return (
          <BaseSpecial key={x.id}>
            <A
              className="d-flex align-items-start flex-column flex-md-row align-items-stretch align-items-md-start"
              to={routes.communityTags(x.id)}
            >
              <DescriptionBlock>
                <MediumImageStyled
                  className="bg-transparent"
                  src={x.avatar}
                  alt={x.name}
                />
                <div>
                  <NameHolder fontSize="24" lineHeight="31" bold title={x.name}>
                    {x.name}
                  </NameHolder>
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
              </DescriptionBlock>

              <TagsBlock>
                <TagListBox>
                  <TagList
                    communities={communitiesWithLimitedTagNumber}
                    communityId={x.id}
                    showPopularity
                  />
                  <BlockShadow toSide="right" />
                </TagListBox>

                <SeeAllButton>
                  <FormattedMessage {...commonMessages.seeAll} />
                </SeeAllButton>
              </TagsBlock>
            </A>
          </BaseSpecial>
        );
      })}
    </Base>
  );
};
List.propTypes = {
  communities: PropTypes.array,
};
export default React.memo(List);
