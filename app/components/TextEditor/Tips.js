import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  TEXT_PRIMARY,
  BG_PRIMARY,
  BORDER_SECONDARY,
  LINK_COLOR,
} from 'style-constants';

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
import { singleCommunityColors } from 'utils/communityManagement';
import { getLinks } from 'media-links';

const colors = singleCommunityColors();

const Li = styled.li`
  ${A} {
    color: ${TEXT_PRIMARY};
    font-size: 16px;
    line-height: 24px;
  }

  margin-bottom: 10px;
`;

const Ul = styled.ul`
  //border-bottom: 1px solid ${BORDER_SECONDARY};
  padding-bottom: 6px;

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
      background: ${colors.textColor || BG_PRIMARY};
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

const Title = Label.extend`
  font-size: 18px;
`;

const P = styled.p`
  margin-bottom: 10px;
`;

const Link = styled.a`
  line-height: 24px;
  span {
    color: ${colors.linkColor || LINK_COLOR};
  }
`;

const Italic = styled.span`
  width: max-content;
  font-style: italic;
  margin-right: 6px;
`;

const Bold = styled.span`
  width: max-content;
  font-weight: 600;
  margin-left: 6px;
`;

const messagesArray = [
  messages.addForLineBreaks,
  messages.italicAndBold,
  messages.indentCode,
  messages.backtipEscapes,
  messages.quoteByPlacing,
];

const Tips = ({ faqQuestions }) => (
  <div>
    <Title className="mb-3">
      <FormattedMessage id={messages.tips.id} />:
    </Title>
    <P>
      <FormattedMessage id={messages.markdownIsSupported.id} />
    </P>
    <Ul>
      {messagesArray.map((x, i) => {
        return i === 1 ? (
          <li key={x.id}>
            <p>
              <Italic>
                <FormattedMessage id={messages.italic.id} />
              </Italic>
              <FormattedMessage id={messages.or.id} />
              <Bold>
                <FormattedMessage id={messages.bold.id} />
              </Bold>
            </p>
          </li>
        ) : (
          <li key={x.id}>
            <FormattedMessage {...x} />{' '}
          </li>
        );
      })}
    </Ul>
    {/* TODO: PEER-285 Hide FAQ Questions
    {faqQuestions && (
      <ul>{faqQuestions.map(x => <Li key={x.props.children}>{x}</Li>)}</ul>
    )}*/}
    <span
      css={css`
        line-height: 20px;
      `}
    >
      <FormattedMessage id={messages.forMoreSyntax.id} />
      <Link href={getLinks().markdownCheatSheet} target="_blank">
        <FormattedMessage id={messages.markdownCheatSheet.id} />
      </Link>
    </span>
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

export default connect(mapStateToProps, null)(Tips);
