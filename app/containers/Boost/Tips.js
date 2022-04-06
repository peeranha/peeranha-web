import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { TEXT_PRIMARY, BORDER_SECONDARY } from 'style-constants';
import {
  WHAT_IS_BOOST,
  HOW_TO_MAKE_A_STAKE,
  HOW_TO_MAKE_A_STAKE_AUTOMATICALLY,
  WHY_ARE_MY_TOKENS_LOCKED,
  WHEN_I_CAN_GET_MY_REWARD,
} from 'containers/Faq/constants';

import boostImage from 'images/boost-lg.svg?inline';

import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import A from 'components/A';

const Li = styled.li`
  ${A} {
    color: ${TEXT_PRIMARY};
    font-size: 16px;
    line-height: 24px;
  }

  margin-bottom: 10px;
`;

const ImgWrapper = styled.div`
  // border-bottom: 1px solid ${BORDER_SECONDARY}; Hided border-bottom from Boost page for demo version
  padding-bottom: 50px;
  margin-bottom: 30px;
`;

const Tips = ({ faqQuestions }) => (
  <div>
    <ImgWrapper>
      <img src={boostImage} alt="boost" />
    </ImgWrapper>


    {/* Hided FAQ Questions from Boost page for demo version */}
    {/* {faqQuestions && (
      <ul>{faqQuestions.map(x => <Li key={x.props.children}>{x}</Li>)}</ul>
    )} */}
  </div>
);

Tips.propTypes = {
  className: PropTypes.string,
  faqQuestions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  faqQuestions: selectFaqQuestions([
    WHAT_IS_BOOST,
    HOW_TO_MAKE_A_STAKE,
    HOW_TO_MAKE_A_STAKE_AUTOMATICALLY,
    WHY_ARE_MY_TOKENS_LOCKED,
    WHEN_I_CAN_GET_MY_REWARD,
  ]),
});

export { Li };

export default connect(
  mapStateToProps,
  null,
)(Tips);
