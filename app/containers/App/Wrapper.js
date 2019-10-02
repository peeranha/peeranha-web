import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import $ from 'jquery';

import Header from 'containers/Header';
import LeftMenu from 'containers/LeftMenu';
import Loader from 'components/LoadingIndicator/WidthCentered';

import {
  HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from 'containers/Header/constants';

import { LEFT_MENU_WIDTH } from './constants';

const Main = styled.div`
  background: rgb(234, 236, 244);
  min-height: 100vh;
  padding-top: ${x => (!x.isMenuVisible ? HEADER_HEIGHT : 0)}px;
  padding-bottom: ${x => (!x.isMenuVisible ? 75 : 0)}px;

  @media only screen and (max-width: 576px) {
    padding-top: ${x => (!x.isMenuVisible ? MOBILE_HEADER_HEIGHT : 0)}px;
    padding-bottom: 0px;
  }
`;

const WrapStyled = styled.main`
  margin-top: 10px;
  width: calc(100% - ${LEFT_MENU_WIDTH}px);
  overflow-y: -webkit-paged-y;

  @media only screen and (max-width: 992px) {
    width: 100%;
  }

  @media only screen and (max-width: 576px) {
    margin-top: 0px;
  }
`;

export class Box extends React.PureComponent {
  state = {
    isMenuVisible: false,
  };

  // set default state if window resizing is happening
  componentDidMount() {
    $(window).resize(() => {
      clearTimeout(window.resizedFinished);
      window.resizedFinished = setTimeout(() => {
        this.setState({
          isMenuVisible: false,
        });
      }, 250);
    });
  }

  // set default state if links changing is happening
  componentWillReceiveProps(prevProps) {
    if (
      prevProps.props.location.pathname + prevProps.props.location.hash !==
        this.props.props.location.pathname + this.props.props.location.hash &&
      this.state.isMenuVisible
    ) {
      this.setState({
        isMenuVisible: false,
      });
    }
  }

  showMenu = () => {
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
  };

  render() {
    const { isMenuVisible } = this.state;
    const { Comp, props } = this.props;

    return (
      <React.Fragment>
        {!isMenuVisible && (
          <Header
            expandLeftMenuNavigation={this.expandLeftMenuNavigation}
            showMenu={this.showMenu}
          />
        )}

        <Main isMenuVisible={isMenuVisible}>
          <div className={isMenuVisible ? '' : 'container container-mobile'}>
            <div className="d-flex">
              <LeftMenu
                showMenu={this.showMenu}
                isMenuVisible={isMenuVisible}
                {...props}
              />

              <WrapStyled className={`${isMenuVisible ? 'd-none' : ''}`}>
                <React.Suspense fallback={<Loader />}>
                  <Comp {...props} />
                </React.Suspense>
              </WrapStyled>
            </div>
          </div>
        </Main>
      </React.Fragment>
    );
  }
}

Box.propTypes = {
  Comp: PropTypes.any,
  props: PropTypes.object,
};

const Wrapper = (comp, props) => <Box Comp={comp} props={props} />;

export default Wrapper;
