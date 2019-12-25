import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import { makeSelectLocation } from 'containers/App/selectors';

import Header from 'containers/Header';
import LeftMenu from 'containers/LeftMenu';
import Loader from 'components/LoadingIndicator/WidthCentered';

import { Main, WrapStyled } from './Box';
import { selectIsMenuVisible } from './selectors';
import { showLeftMenu, hideLeftMenu } from './actions';

const Box = ({
  isMenuVisible,
  hideLeftMenuDispatch,
  Comp,
  props,
  location,
}) => {
  useEffect(
    () => {
      if (isMenuVisible) {
        hideLeftMenuDispatch();
      }
    },
    [location],
  );

  return (
    <React.Fragment>
      <Header />

      <Main isMenuVisible={isMenuVisible}>
        <div className={isMenuVisible ? '' : 'container container-mobile'}>
          <div className="d-flex">
            <LeftMenu {...props} />

            <WrapStyled className={isMenuVisible ? 'd-none' : ''}>
              <React.Suspense fallback={<Loader />}>
                <Comp {...props} />
              </React.Suspense>
            </WrapStyled>
          </div>
        </div>
      </Main>
    </React.Fragment>
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

const mapStateToProps = createStructuredSelector({
  isMenuVisible: selectIsMenuVisible(),
  location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    showLeftMenuDispatch: bindActionCreators(showLeftMenu, dispatch),
    hideLeftMenuDispatch: bindActionCreators(hideLeftMenu, dispatch),
  };
}

const WrapperConnection = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Box);

export default (Comp, props) => <WrapperConnection Comp={Comp} props={props} />;
