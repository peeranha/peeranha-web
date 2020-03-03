import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';
import * as routes from 'routes-config';

import { ADefault } from 'components/A';
import peeranhaLogo from 'images/LogoBlack.svg?inline';
import arrowDownIcon from 'images/arrowDown.svg?inline';
import { BG_SECONDARY_LIGHT, BG_LIGHT } from '../../style-constants';

const Base = styled.div`
  background-color: ${({ profile }) =>
    profile ? BG_LIGHT : BG_SECONDARY_LIGHT};
  height: ${({ visible, profile }) => {
    if (visible && !profile) {
      return 130;
    }
    return visible ? 170 : 50;
  }}px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 2px 0 2px 5px;

  button {
    height: ${({ profile }) => (profile ? '100%' : '')}px;
  }

  button,
  a {
    margin-left: 3px;
    padding: 10px 0 10px 15px;
  }
`;

const Arrow = styled.div`
  transform: rotate(${x => (x.rotate ? '180deg' : '0deg')});
  transition: 0.5s;
  margin-right: 16px;
`;

const MobileSubHeader = ({ profile }) => {
  const [visible, setVisibility] = useState(false);

  return (
    <Base
      profile={profile}
      visible={visible}
      className="container d-flex flex-column"
    >
      <button
        className="d-flex justify-content-between"
        onClick={
          window.location.origin === process.env.APP_LOCATION
            ? null
            : () => setVisibility(!visible)
        }
      >
        <img
          className="align-self-start"
          id="peeranha-logo"
          src={peeranhaLogo}
          width="100px"
          alt="logo"
        />
        <Arrow className="mt-auto mb-auto" rotate={visible}>
          <img src={arrowDownIcon} width="16" alt="arrow" />
        </Arrow>
      </button>
      {visible ? (
        <>
          {profile && (
            <ADefault href={`${process.env.APP_LOCATION}${routes.feed()}`}>
              <FormattedMessage {...messages.myFeed} />
            </ADefault>
          )}
          <ADefault href={process.env.APP_LOCATION}>
            <FormattedMessage {...messages.allQuestions} />
          </ADefault>
          <ADefault href={`${process.env.APP_LOCATION}${routes.communities()}`}>
            <FormattedMessage {...messages.allCommunities} />
          </ADefault>
        </>
      ) : null}
    </Base>
  );
};

MobileSubHeader.propTypes = {
  profile: PropTypes.bool,
};

export default MobileSubHeader;
