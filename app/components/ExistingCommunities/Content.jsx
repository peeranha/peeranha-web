import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import orderBy from 'lodash/orderBy';

import * as routes from 'routes-config';
import { BORDER_SECONDARY, TEXT_PRIMARY } from 'style-constants';

import { getFormattedNum2 } from 'utils/numbers';
import { getDifferenceInMonths } from 'utils/datetime';

import commonMessages from 'common-messages';

import P from 'components/P';
import A from 'components/A';
import Span from 'components/Span';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import BaseTransparent from 'components/Base/BaseTransparent';
import FollowCommunityButton from 'containers/FollowCommunityButton/StyledButton';
import { MediumImageStyled } from 'components/Img/MediumImage';

const Base = BaseRoundedNoPadding.extend`
  margin-bottom: 15px;

  ${MediumImageStyled} {
    margin-top: 10px;
  }

  > :not(:last-child) {
    border-bottom: 1px solid ${BORDER_SECONDARY};
  }

  @media only screen and (max-width: 576px) {
    ${MediumImageStyled} {
      margin-right: 10px;
      margin-top: 0px;
    }

    button {
      min-width: 125px;
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;

  p:nth-child(1) {
    margin-bottom: 5px;
    font-weight: 600;
  }

  @media only screen and (max-width: 576px) {
    &:not(:last-child) {
      margin-right: 5px;
      margin-bottom: 10px;
    }
  }
`;

const Content = ({ communities, sorting, locale, language }) => {
  if (!communities || !communities.length) return null;

  return (
    <Base>
      {orderBy(communities, y => y[sorting.sortBy], [sorting.order])
        .filter(x => (language.sortBy ? x.language === language.sortBy : true))
        .map(x => (
          <BaseTransparent key={x.value}>
            <div className="row align-items-center">
              <div className="col-12 col-md-4 d-flex mb-to-md-2">
                <MediumImageStyled src={x.avatar} alt={x.name} />
                <div>
                  <P className="mb-1" fontSize="24" mobileFS="18" bold>
                    {x.name}
                  </P>
                  <P
                    className="d-none d-md-block text-capitalize"
                    fontSize="14"
                  >
                    {x.language}
                  </P>
                  <P fontSize="14">{x.description}</P>
                </div>
              </div>

              <div className="col-12 col-md-8 d-flex align-items-center justify-content-between flex-wrap">
                <Info>
                  <P>{getFormattedNum2(x.users_subscribed)}</P>
                  <P fontSize="14">
                    <FormattedMessage {...commonMessages.usersShort} />
                  </P>
                </Info>

                <Info>
                  <P>{getFormattedNum2(x.questions_asked)}</P>
                  <A to={routes.questions(x.id)}>
                    <Span color={TEXT_PRIMARY} fontSize="14">
                      <FormattedMessage {...commonMessages.questions} />
                    </Span>
                  </A>
                </Info>

                <Info>
                  <P>{getFormattedNum2(x.answers_given)}</P>
                  <P fontSize="14">
                    <FormattedMessage {...commonMessages.answers} />
                  </P>
                </Info>

                <Info>
                  <P>{getFormattedNum2(x.tags.length)}</P>
                  <A to={routes.communityTags(x.id)}>
                    <Span color={TEXT_PRIMARY} fontSize="14">
                      <FormattedMessage {...commonMessages.tags} />
                    </Span>
                  </A>
                </Info>

                <Info>
                  <P>{getDifferenceInMonths(x.creation_time, locale)}</P>
                  <P fontSize="14">
                    <FormattedMessage {...commonMessages.age} />
                  </P>
                </Info>

                <FollowCommunityButton communityIdFilter={x.id} />
              </div>
            </div>
          </BaseTransparent>
        ))}
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
