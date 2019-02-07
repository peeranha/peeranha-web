import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import $ from 'jquery';

import Header from 'containers/Header';
import LeftMenu from 'containers/LeftMenu';

import { HEADER_HEIGHT } from 'containers/Header/constants';

const Main = styled.div`
  background: rgb(234, 236, 244);
  min-height: 100vh;
  padding-top: ${HEADER_HEIGHT}px;
`;

const WrapStyled = styled.div`
  margin-top: 10px;
  flex: 1;
`;

class Box extends React.PureComponent {
  state = {
    isMenuVisible: false,
    isNavigationExpanded: false,
  };

  // set default state if window resizing is happening
  componentDidMount() {
    $(window).resize(() => {
      clearTimeout(window.resizedFinished);
      window.resizedFinished = setTimeout(() => {
        this.setState({
          isMenuVisible: false,
          isNavigationExpanded: false,
        });
      }, 250);
    });
  }

  // set default state if links changing is happening
  componentWillReceiveProps(prevProps) {
    if (
      prevProps.props.location.pathname !==
        this.props.props.location.pathname &&
      this.state.isMenuVisible
    ) {
      this.setState({
        isMenuVisible: false,
        isNavigationExpanded: false,
      });
    }
  }

  showMenu = () => {
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
  };

  expandLeftMenuNavigation = () => {
    this.setState({ isNavigationExpanded: !this.state.isNavigationExpanded });
  };

  render() {
    const { isMenuVisible, isNavigationExpanded } = this.state;
    const { Comp, props } = this.props;

    return [
      <Header
        expandLeftMenuNavigation={this.expandLeftMenuNavigation}
        isMenuVisible={isMenuVisible}
        showMenu={this.showMenu}
        key="header"
      />,
      <Main key="main">
        <div className="container">
          <div className="d-flex">
            <LeftMenu
              showMenu={this.showMenu}
              isNavigationExpanded={isNavigationExpanded}
              isMenuVisible={isMenuVisible}
              {...props}
            />

            <WrapStyled className={`${isMenuVisible ? 'd-none' : ''}`}>
              <Comp {...props} />
            </WrapStyled>
          </div>
        </div>
      </Main>,
    ];
  }
}

Box.propTypes = {
  Comp: PropTypes.object,
  props: PropTypes.object,
};

const Wrapper = (comp, props) => <Box Comp={comp} props={props} />;

export default Wrapper;
