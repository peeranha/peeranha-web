import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { TEXT_PRIMARY, BG_PRIMARY, BORDER_SECONDARY } from 'style-constants';

import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import {
  HOW_TO_ASK_QUESTION,
  HOW_TO_FORMAT_QUESTION,
  HOW_TO_TAG_QUESTION,
  WHAT_IS_PROMOTED_QUESTION,
} from 'containers/Faq/constants';

import A from 'components/A';
import Label from 'components/FormFields/Label';

import messages from './messages';

const Li = styled.li`
  ${A} {
    color: ${TEXT_PRIMARY};
    font-size: 16px;
    line-height: 24px;
  }

  margin-bottom: 10px;
`;

const Ul = styled.ul`
  border-bottom: 1px solid ${BORDER_SECONDARY};
  padding-bottom: 30px;
  margin-bottom: 25px;

  li {
    display: flex;
    align-items: start;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 20px;

    :before {
      content: '';
      flex-basis: 5px;
      height: 5px;
      border-radius: 50%;
      background: ${BG_PRIMARY};
      margin-right: 10px;
      display: inline-flex;
      position: relative;
      top: 8px;
    }

    span {
      flex: 1;
    }
  }
`;

const messagesArray = [
  messages.putReturnsBetweenParagraphs,
  messages.addForLineBreaks,
  messages.italicAndBold,
  messages.indentCode,
  messages.backtipEscapes,
  messages.quoteByPlacing,
];

const Tips = ({ faqQuestions }) => (
  <div>
    <Label className="mb-3">
      <FormattedMessage {...messages.tips} />:
    </Label>

    <Ul>
      {messagesArray.map(x => (
        <li key={x.id}>
          <FormattedMessage {...x} />{' '}
        </li>
      ))}
    </Ul>

    {faqQuestions && (
      <ul>{faqQuestions.map(x => <Li key={x.props.children}>{x}</Li>)}</ul>
    )}
  </div>
);

Tips.propTypes = {
  className: PropTypes.string,
  faqQuestions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  faqQuestions: selectFaqQuestions([
    HOW_TO_ASK_QUESTION,
    HOW_TO_FORMAT_QUESTION,
    HOW_TO_TAG_QUESTION,
    WHAT_IS_PROMOTED_QUESTION,
  ]),
});

export { Li, Ul };

export default connect(
  mapStateToProps,
  null,
)(Tips);
