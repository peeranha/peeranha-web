import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import reducer from './reducer';
import saga from './saga';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { DAEMON } from 'utils/constants';

import { makeSelectLocation } from 'containers/App/selectors';

import Header from 'containers/Header';
import LeftMenu from 'containers/LeftMenu';
import Loader from 'components/LoadingIndicator/WidthCentered';

import { Main, WrapStyled } from './Box';
import {
  selectDocumentationMenu,
  selectDocumentationNotIncluded,
  selectIsMenuVisible,
} from './selectors';
import { showLeftMenu, hideLeftMenu, getDocumentationMenu } from './actions';
import { selectTransactionInitialised } from '../EthereumProvider/selectors';

const Box = ({
  isMenuVisible,
  hideLeftMenuDispatch,
  Comp,
  props,
  location,
  transactionInitialised,
  getDocumentationMenuDispatch,
  documentationMenu,
  documentationNotIncluded,
}) => {
  const single = isSingleCommunityWebsite();
  useEffect(() => {
    if (isMenuVisible) {
      hideLeftMenuDispatch();
    }
  }, [location]);
  useEffect(() => {
    getDocumentationMenuDispatch(single);
  }, [single]);

  const documentation = documentationMenu
    ? documentationMenu.concat(documentationNotIncluded ?? [])
    : [];

  return (
    <>
      <Header documentationMenu={documentation} />

      <Main
        isMenuVisible={isMenuVisible}
        transactionInitialised={transactionInitialised}
      >
        <div className={isMenuVisible ? '' : 'container container-mobile'}>
          <div className="d-flex">
            <LeftMenu {...props} documentationMenu={documentation} />

            <WrapStyled className={isMenuVisible ? 'd-none' : ''}>
              <React.Suspense fallback={<Loader />}>
                <Comp {...props} />
              </React.Suspense>
            </WrapStyled>
          </div>
        </div>
      </Main>
    </>
  );
};

Box.propTypes = {
  Comp: PropTypes.any,
  props: PropTypes.object,
  location: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  showLeftMenuDispatch: PropTypes.func,
  hideLeftMenuDispatch: PropTypes.func,
};

const WrapperConnection = compose(
  injectReducer({ key: 'appWrapper', reducer }),
  injectSaga({ key: 'appWrapper', saga, mode: DAEMON }),
  connect(
    createStructuredSelector({
      isMenuVisible: selectIsMenuVisible(),
      location: makeSelectLocation(),
      transactionInitialised: selectTransactionInitialised(),
      documentationMenu: selectDocumentationMenu(),
      documentationNotIncluded: selectDocumentationNotIncluded(),
    }),
    (dispatch) => ({
      showLeftMenuDispatch: bindActionCreators(showLeftMenu, dispatch),
      getDocumentationMenuDispatch: bindActionCreators(
        getDocumentationMenu,
        dispatch,
      ),
      hideLeftMenuDispatch: bindActionCreators(hideLeftMenu, dispatch),
    }),
  ),
)(Box);

export default (Comp, props) => <WrapperConnection Comp={Comp} props={props} />;
