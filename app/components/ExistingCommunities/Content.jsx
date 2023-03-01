import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import styled from 'styled-components';
import orderBy from 'lodash/orderBy';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';
import { TEXT_PRIMARY, TEXT_SECONDARY } from 'style-constants';

import {
  getPermissions,
  hasCommunityAdminRole,
  hasCommunityModeratorRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';
import { getFormattedNum2 } from 'utils/numbers';
import { getDifferenceInDate } from 'utils/datetime';

import InfoButton from 'components/Button/Outlined/InfoMedium';
import P from 'components/P';
import A, { ADefault } from 'components/A';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import { BaseSpecial } from 'components/Base/BaseTransparent';
import FollowCommunityButton from 'containers/FollowCommunityButton/StyledButton';
import { MediumImageStyled } from 'components/Img/MediumImage';
import { hasCommunitySingleWebsite } from '../../utils/communityManagement';
import OfficialSiteLink from './OfficialSiteLink';
import SingleCommunityIcon from './SingleCommunityIcon';

import img from 'images/image-communityPage.svg?inline';

export const Base = BaseRoundedNoPadding.extend`
  margin-bottom: 15px;
`;

export const DescriptionBlock = styled.div`
  display: flex;
  align-items: start;
  flex-shrink: 0;
  width: 300px;
  margin-right: 15px;

  @media (max-width: 1050px) {
    width: 250px;
  }

  @media (max-width: 991px) {
    width: 300px;
  }

  ${MediumImageStyled} {
    margin-top: 6px;
  }
`;

export const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-top: 6px;

  button {
    min-width: 105px;
    margin-top: 6px;
  }
`;

const SpanCenter = P.extend`
  width: 100%;
  text-align: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0 7px;

  p:nth-child(1) {
    font-size: 16px;
    line-height: 25px;
    font-weight: 600;
  }

  p:nth-child(2) {
    color: ${TEXT_SECONDARY};
  }

  a:nth-child(2) {
    color: ${TEXT_PRIMARY};
  }

  p:nth-child(2),
  a:nth-child(2) {
    font-size: 13px;
    line-height: 18px;
  }
`;

const DescriptionText = P.extend`
  @media (max-width: 320px) {
    width: 85%;
    padding-right: 5px;
  }
`;

const Content = ({ communities, sorting, locale, profile }) => {
  const { t } = useTranslation();

  const communityEditingAllowed =
    hasGlobalModeratorRole(getPermissions(profile)) ||
    hasProtocolAdminRole(getPermissions(profile));

  if (!communities || !communities.length) return null;

  return (
    <>
      <Base>
        {orderBy(communities, (y) => y[sorting.sortBy], [sorting.order]).map(
          (
            { avatar, name, id, description, website, tagsCount, ...x },
            index,
            arr,
          ) => {
            const value = id;
            const origin = hasCommunitySingleWebsite(id);

            return (
              <BaseSpecial
                last={arr.length - 1 === index}
                first={!index}
                className="d-flex align-items-start flex-column flex-md-row align-items-stretch align-items-md-start"
                key={value}
              >
                <DescriptionBlock>
                  <MediumImageStyled
                    className="bg-transparent"
                    src={avatar}
                    alt={name}
                  />

                  <div>
                    <P fontSize="24" lineHeight="31" bold>
                      <ADefault
                        href={origin || routes.questions(id)}
                        css={{ position: 'relative' }}
                      >
                        {name}
                        {origin && (
                          <SingleCommunityIcon locale={locale} id={id} />
                        )}
                      </ADefault>
                    </P>
                    <DescriptionText fontSize="14" lineHeight="18">
                      {description}
                    </DescriptionText>
                    {website && <OfficialSiteLink website={website} />}
                  </div>
                </DescriptionBlock>

                <InfoBlock className="flex-wrap flex-sm-nowrap">
                  {(communityEditingAllowed ||
                    hasCommunityModeratorRole(getPermissions(profile), value) ||
                    hasCommunityAdminRole(getPermissions(profile), value)) && (
                    <Info>
                      <SpanCenter>
                        {getFormattedNum2(x.followingUsers)}
                      </SpanCenter>
                      <P>
                        <span className="no-wrap">
                          {t('common.subscribers')}
                        </span>
                      </P>
                    </Info>
                  )}

                  <Info>
                    <SpanCenter>{getFormattedNum2(x.postCount)}</SpanCenter>
                    <P>
                      <span className="no-wrap">{t('common.posts')}</span>
                    </P>
                  </Info>

                  <Info>
                    <SpanCenter>{getFormattedNum2(x.replyCount)}</SpanCenter>
                    <P>
                      <span className="no-wrap">{t('common.answers')}</span>
                    </P>
                  </Info>

                  <Info>
                    <SpanCenter>{getFormattedNum2(tagsCount)}</SpanCenter>
                    <A to={routes.communityTags(id)}>
                      <span className="no-wrap">{t('common.tags')}</span>
                    </A>
                  </Info>

                  <Info>
                    <SpanCenter className="no-wrap">
                      {getDifferenceInDate(x.creationTime, locale)}
                    </SpanCenter>
                    <SpanCenter>
                      <span className="no-wrap">{t('common.age')}</span>
                    </SpanCenter>
                  </Info>

                  <Info>
                    {(communityEditingAllowed ||
                      hasCommunityAdminRole(
                        getPermissions(profile),
                        value,
                      )) && (
                      <InfoButton
                        onClick={() =>
                          createdHistory.push(routes.communitiesEdit(id))
                        }
                      >
                        {t('common.edit')}
                      </InfoButton>
                    )}
                    <FollowCommunityButton communityIdFilter={id} />
                  </Info>
                </InfoBlock>
              </BaseSpecial>
            );
          },
        )}
      </Base>
      <Base>
        <div
          className="df aic fdc jcc"
          css={css`
            @media (min-width: 576px) {
              flex-direction: row;
              justify-content: flex-start;
            }
          `}
        >
          <img src={img} alt="img" />
          <div
            className="p12"
            css={css`
              @media (min-width: 576px) {
                align-items: flex-start;
              }
            `}
          >
            <div
              css={css`
                max-width: 600px;
                line-height: 1.5;
              `}
            >
              {t('createCommunity.suggestCommunityBlock_1')}
              {t('createCommunity.suggestCommunityBlock_2')}
              {t('createCommunity.suggestCommunityBlock_3')}
              {t('createCommunity.suggestCommunityBlock_4')}
              <a href="mailto:hello@peeranha.io">hello@peeranha.io.</a>
            </div>
          </div>
        </div>
      </Base>
    </>
  );
};

Content.propTypes = {
  communities: PropTypes.array,
  sorting: PropTypes.object,
  locale: PropTypes.string,
  profile: PropTypes.object,
};

export default React.memo(Content);
