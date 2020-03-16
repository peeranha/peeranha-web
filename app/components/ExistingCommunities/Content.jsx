/* eslint no-unused-vars: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import orderBy from 'lodash/orderBy';

import * as routes from 'routes-config';
import {
  BORDER_SECONDARY,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from 'style-constants';

import { getFormattedNum2 } from 'utils/numbers';
import { getDifferenceInMonths } from 'utils/datetime';

import commonMessages from 'common-messages';

import P from 'components/P';
import A, { ADefault } from 'components/A';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import { BaseSpecial } from 'components/Base/BaseTransparent';
import FollowCommunityButton from 'containers/FollowCommunityButton/StyledButton';
import { MediumImageStyled } from 'components/Img/MediumImage';
import { hasCommunitySingleWebsite } from '../../utils/communityManagement';

export const Base = BaseRoundedNoPadding.extend`
  margin-bottom: 15px;
`;

export const DescriptionBlock = styled.div`
  display: flex;
  align-items: start;
  flex-shrink: 0;
  width: 300px;
  margin-right: 15px;

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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0 10px;

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

const Content = ({ communities, sorting, locale, language }) => {
  if (!communities || !communities.length) return null;

  return (
    <Base>
      {orderBy(communities, y => y[sorting.sortBy], [sorting.order])
        .filter(x => (language.sortBy ? x.language === language.sortBy : true))
        .map(
          (
            { value, avatar, name, id, description, tags, ...x },
            index,
            arr,
          ) => {
            const origin = hasCommunitySingleWebsite(id);
            return (
              <BaseSpecial
                origin={origin}
                overOrigin={
                  index !== arr.length - 1 &&
                  hasCommunitySingleWebsite(arr[index + 1].id)
                }
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
                      <ADefault href={origin || routes.questions(id)}>
                        {name}
                      </ADefault>
                    </P>
                    {/* <P className="d-none d-md-block" fontSize="14" lineHeight="18">
                  <FormattedMessage {...commonMessages[x.language]} />
                </P> */}
                    <P fontSize="14" lineHeight="18">
                      {description}
                    </P>
                    <ADefault
                      style={{ fontSize: '14px', color: TEXT_PRIMARY }}
                      href={origin}
                    >
                      {origin ? origin.replace('https://', '') : ''}
                    </ADefault>
                  </div>
                </DescriptionBlock>

                <InfoBlock className="flex-wrap flex-sm-nowrap">
                  <Info>
                    <P>{getFormattedNum2(x.users_subscribed)}</P>
                    <P>
                      <FormattedMessage {...commonMessages.usersShort} />
                    </P>
                  </Info>

                  <Info>
                    <P>{getFormattedNum2(x.questions_asked)}</P>
                    <ADefault href={routes.questions(id)}>
                      <FormattedMessage {...commonMessages.questions} />
                    </ADefault>
                  </Info>

                  <Info>
                    <P>{getFormattedNum2(x.answers_given)}</P>
                    <P>
                      <FormattedMessage {...commonMessages.answers} />
                    </P>
                  </Info>

                  <Info>
                    <P>{getFormattedNum2(tags.length)}</P>
                    <A to={routes.communityTags(id)}>
                      <FormattedMessage {...commonMessages.tags} />
                    </A>
                  </Info>

                  <Info>
                    <P>{getDifferenceInMonths(x.creation_time, locale)}</P>
                    <P>
                      <FormattedMessage {...commonMessages.age} />
                    </P>
                  </Info>

                  <FollowCommunityButton communityIdFilter={id} />
                </InfoBlock>
              </BaseSpecial>
            );
          },
        )}
    </Base>
  );
};

Content.propTypes = {
  communities: PropTypes.array,
  sorting: PropTypes.object,
  locale: PropTypes.string,
  language: PropTypes.object,
};

export default React.memo(Content);
