import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import _ from 'lodash';

import * as routes from 'routes-config';
import { gray } from 'style-constants';

import { getFormattedNum2 } from 'utils/numbers';
import { getDifferenceInMonths } from 'utils/datetime';

import commonMessages from 'common-messages';

import P from 'components/P';
import A from 'components/A';
import Span from 'components/Span';
import BaseRounded from 'components/Base/BaseRounded';
import BaseTransparent from 'components/Base/BaseTransparent';
import FollowCommunityButton from 'containers/FollowCommunityButton/StyledButton';
import { MediumImageStyled } from 'components/Img/MediumImage';

const Base = BaseRounded.extend`
  padding: 0;
  word-break: break-word;

  ${BaseTransparent} {
    border-bottom: 1px solid ${gray};
    border-radius: 0;

    :last-child {
      border: none;
    }
  }
`;

const Description = `
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50px;
`;

const Num = Span.extend`
  margin-bottom: 0.25rem;
  text-align: center;
  font-weight: 600;
  text-transform: lowercase;
`;

const Name = Span.extend`
  text-align: center;
  font-size: 14px;
`;

const LinkDescription = styled(A)`
  ${Description};
`;

const TextDescription = styled.p`
  ${Description};
`;

// TODO: change hardcoded numbers when it will be ready for backend
const Content = /* istanbul ignore next */ ({
  communities,
  sorting,
  locale,
}) => (
  <Base>
    {_.orderBy(communities, y => y[sorting.sortBy], [sorting.order]).map(x => (
      <BaseTransparent key={x.value}>
        <div className="row align-items-center">
          <div className="col-xl-4 d-flex">
            <MediumImageStyled
              className="mt-2"
              src={x.avatar}
              alt="communityAvatar"
            />
            <div>
              <P className="mb-1" fontSize="24" bold>
                {x.label}
              </P>
              <P fontSize="14">{x.description}</P>
            </div>
          </div>

          <div className="col-xl-8 d-flex align-items-center justify-content-between">
            <TextDescription>
              <Num>{getFormattedNum2('7777')}</Num>
              <Name>Users</Name>
            </TextDescription>

            <LinkDescription
              to={routes.questions(x.id)}
              href={routes.questions(x.id)}
            >
              <Num>{getFormattedNum2('1111')}</Num>
              <Name color="blue">
                <FormattedMessage {...commonMessages.questions} />
              </Name>
            </LinkDescription>

            <TextDescription>
              <Num>{getFormattedNum2('2222')}</Num>
              <Name>
                <FormattedMessage {...commonMessages.answers} />
              </Name>
            </TextDescription>

            <LinkDescription
              to={routes.communityTags(x.id)}
              href={routes.communityTags(x.id)}
            >
              <Num>{getFormattedNum2(x.tags.length)}</Num>
              <Name color="blue">
                <FormattedMessage {...commonMessages.tags} />
              </Name>
            </LinkDescription>

            <TextDescription>
              <Num>{getDifferenceInMonths(1554877697000, locale)}</Num>
              <Name>
                <FormattedMessage {...commonMessages.age} />
              </Name>
            </TextDescription>

            <FollowCommunityButton communityIdFilter={x.id} />
          </div>
        </div>
      </BaseTransparent>
    ))}
  </Base>
);

Content.propTypes = {
  communities: PropTypes.array,
  sorting: PropTypes.object,
  locale: PropTypes.string,
};

export default React.memo(Content);
