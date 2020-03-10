import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as routes from 'routes-config';

import {
  BG_SECONDARY_LIGHT,
  BG_LIGHT,
  BG_PRIMARY,
  SECONDARY_SPECIAL_3,
} from 'style-constants';

import Base from 'components/Base/BaseRounded';

const LeftMenu = styled.div`
  flex: 5;
  padding: 40px 50px;
  background: ${BG_LIGHT};
`;

const RightMenu = styled.div`
  flex: 4;
  padding: 40px 80px;
  background: ${SECONDARY_SPECIAL_3};
`;

const BaseStyled = Base.extend`
  display: flex;
  margin: 10px auto;
  max-width: 1200px;
  min-height: 90vh;
  padding: 0 !important;
  overflow: hidden;

  @media only screen and (max-width: 992px) {
    margin: -15px;

    ${LeftMenu} {
      flex: 7;
      padding: 40px 15px;
    }

    ${RightMenu} {
      flex: 8;
      padding: 20px 0px;
    }
  }

  @media only screen and (max-width: 576px) {
    margin: 0px auto;
    flex-direction: column;

    ${LeftMenu} {
      order: 2;
    }

    ${RightMenu} {
      order: 1;
      flex-basis: 100vh;
    }
  }
`;

const SlideIndicatorsStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 30px;

  > * {
    width: 8px;
    height: 8px;
    margin-right: 8px;
    border-radius: 50%;
    background: ${BG_SECONDARY_LIGHT};

    :nth-child(-n + ${x => x.step}) {
      background: ${BG_PRIMARY};
    }
  }
`;

const SlideIndicators = () => {
  const keys = Object.keys(routes.signup);

  const route = keys.find(
    x => routes.signup[x].name === window.location.pathname,
  );

  const currentStep = route ? routes.signup[route].step : 0;

  const maxStep = routes.signup[keys[keys.length - 1]].step;

  return (
    <SlideIndicatorsStyled step={currentStep}>
      {new Array(maxStep).fill().map(() => <div key={Math.random()} />)}
    </SlideIndicatorsStyled>
  );
};

const SignUpWrapper = ({ RightMenuChildren, LeftMenuChildren }) => (
  <div className="container container-mobile">
    <BaseStyled>
      <LeftMenu>{LeftMenuChildren}</LeftMenu>
      <RightMenu>
        <SlideIndicators />
        {RightMenuChildren}
      </RightMenu>
    </BaseStyled>
  </div>
);

SignUpWrapper.propTypes = {
  RightMenuChildren: PropTypes.any,
  LeftMenuChildren: PropTypes.any,
};

export default React.memo(SignUpWrapper);
