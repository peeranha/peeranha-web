import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import messages from 'common-messages';

import * as routes from 'routes-config';

import { ADefault } from 'components/A';
import Arrow from 'components/Arrow';

import peeranhaLogo from 'images/LogoBlack.svg?inline';

import { BG_SECONDARY_LIGHT, BG_LIGHT } from 'style-constants';
import { DAEMON } from 'utils/constants';
import { HOME_KEY } from 'containers/Home/constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { singleCommunityStyles, isSingleCommunityWebsite } from 'utils/communityManagement';

import reducer from 'containers/Home/reducer';
import saga from 'containers/Home/saga';
import { getLogo } from 'containers/Home/actions';

const styles = singleCommunityStyles();

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

const MobileSubHeader = ({
  profile,
  getLogoDispatch,
}) => {
  const [visible, setVisibility] = useState(false);

  useEffect(
    () => {
      getLogoDispatch();
    },
    [isSingleCommunityWebsite()],
  );

  return (
    styles.mobileSubHeader || (
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
          <Arrow className="mt-auto mb-auto" rotate={visible} />
        </button>
        {visible ? (
          <>
            {profile && (
              <ADefault href={`${process.env.APP_LOCATION}${routes.feed()}`}>
                <FormattedMessage {...messages.myFeed} />
              </ADefault>
            )}
            <ADefault href={`${process.env.APP_LOCATION}/#allquestions`}>
              <FormattedMessage {...messages.allQuestions} />
            </ADefault>
            <ADefault
              href={`${process.env.APP_LOCATION}${routes.communities()}`}
            >
              <FormattedMessage {...messages.allCommunities} />
            </ADefault>
          </>
        ) : null}
      </Base>
    )
  );
};

MobileSubHeader.propTypes = {
  profile: PropTypes.bool,
  getLogoDispatch: PropTypes.func,
};

const withConnect = connect(
  null,
  dispatch => ({
    getLogoDispatch: bindActionCreators(getLogo, dispatch),
  }),
);

export default compose(
  injectReducer({ key: HOME_KEY, reducer }),
  injectSaga({ key: HOME_KEY, saga, mode: DAEMON }),
  withConnect,
)(MobileSubHeader);
