import TransactionsList from 'containers/TransactionsList';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { isSingleCommunityWebsite, hasFrozenComunity } from 'utils/communityManagement';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
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
import Footer from 'containers/Footer';
import LeftMenu from 'containers/LeftMenu';
import Loader from 'components/LoadingIndicator/WidthCentered';

import { Main, WrapStyled } from './Box';
import { selectDocumentationMenu, selectIsMenuVisible } from './selectors';
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
  communities,
}) => {
  const single = isSingleCommunityWebsite();
  const isHasFrozenSingleComunity = hasFrozenComunity(communities, single);
  useEffect(() => {
    if (isMenuVisible) {
      hideLeftMenuDispatch();
    }
  }, [location]);
  useEffect(() => {
    getDocumentationMenuDispatch(single);
  }, [single]);

  const isUiAssistant = single && location.pathname === '/';

  return (
    <>
      <Header />
      <TransactionsList />

      <Main isMenuVisible={isMenuVisible} frozenSingleCommunity={isHasFrozenSingleComunity}>
        <div className={isMenuVisible ? '' : 'container container-mobile'}>
          <div className="d-flex">
            <LeftMenu {...props} documentationMenu={documentationMenu} />

            <WrapStyled className={isMenuVisible ? 'd-none' : ''}>
              <React.Suspense fallback={<Loader />}>
                <Comp {...props} />
              </React.Suspense>
            </WrapStyled>
          </div>
        </div>
      </Main>
      <div
        css={{
          display: isUiAssistant ? 'none' : 'block',
          '@media (max-width: 991px)': {
            display: 'none',
          },
        }}
      >
        <Footer />
      </div>
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
  getDocumentationMenuDispatch: PropTypes.func,
  communities: PropTypes.array,
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
      communities: selectCommunities(),
    }),
    (dispatch) => ({
      showLeftMenuDispatch: bindActionCreators(showLeftMenu, dispatch),
      getDocumentationMenuDispatch: bindActionCreators(getDocumentationMenu, dispatch),
      hideLeftMenuDispatch: bindActionCreators(hideLeftMenu, dispatch),
    }),
  ),
)(Box);

export default (Comp, props) => <WrapperConnection Comp={Comp} props={props} />;
