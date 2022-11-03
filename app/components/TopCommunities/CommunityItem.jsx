import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as routes from '../../routes-config';
import BaseRoundedNoPadding from '../Base/BaseRoundedNoPadding';
import MediumImage from '../Img/MediumImage';
import P from '../P';
import Span from '../Span';
import { getFormattedNum2 } from '../../utils/numbers';
import { TEXT_SECONDARY } from '../../style-constants';
import messages from '../../common-messages';
import FollowCommunityButton from '../../containers/FollowCommunityButton/StyledButton';
import AStyled from './AStyled';
import ADefaultStyled from './ADefaultStyled';
import FrontSide from './FrontSide';
import BackSide from './BackSide';

const CommunityItem = ({
  single,
  id,
  followingUsers,
  avatar,
  name,
  postCount,
  description,
}) => {
  const [route, setRoute] = useState(() => routes.questions(id));
  const Link = single && id !== single ? ADefaultStyled : AStyled;

  useEffect(
    () => {
      if (single && id !== single) {
        setRoute(`${process.env.APP_LOCATION}${route}`);
      }

      if (single && id === single) {
        setRoute(routes.questions());
      }
    },
    [single, id],
  );
  return (
    <BaseRoundedNoPadding>
      <Link href={route} to={route}>
        <FrontSide>
          <div>
            <MediumImage src={avatar} alt="comm_img" />
            <P fontSize="16" bold>
              {name}
            </P>
          </div>

          <div>
            <div className="d-flex mb-3">
              {/* PEER-605: Hide users on the card in top communities
              <div className="d-flex flex-column flex-grow-1">
                <Span fontSize="16" bold>
                  {getFormattedNum2(followingUsers)}
                </Span>
                <Span className="mt-1" fontSize="14" color={TEXT_SECONDARY}>
                  <FormattedMessage id={messages.users.id} />
                </Span>
              </div> */}
              <div className="d-flex flex-column flex-grow-1">
                <Span fontSize="16" bold>
                  {getFormattedNum2(postCount)}
                </Span>
                <Span className="mt-1" fontSize="14" color={TEXT_SECONDARY}>
                  <FormattedMessage id={messages.posts.id} />
                </Span>
              </div>
            </div>

            <FollowCommunityButton communityIdFilter={id} />
          </div>
        </FrontSide>

        <BackSide>
          <div className="d-flex flex-column justify-content-between">
            <div>
              <P fontSize="16" bold>
                {name}
              </P>
              <P>{description}</P>
            </div>
            <div className="pt-2">
              <FollowCommunityButton communityIdFilter={id} />
            </div>
          </div>
        </BackSide>
      </Link>
    </BaseRoundedNoPadding>
  );
};

CommunityItem.propTypes = {
  single: PropTypes.bool,
  id: PropTypes.number,
  followingUsers: PropTypes.number,
  avatar: PropTypes.string,
  name: PropTypes.string,
  postCount: PropTypes.number,
  description: PropTypes.string,
};

export default React.memo(CommunityItem);
