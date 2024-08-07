import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { TEXT_PRIMARY, BG_PRIMARY, BORDER_SECONDARY, LINK_COLOR } from 'style-constants';

import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import {
  HOW_TO_ASK_QUESTION,
  HOW_TO_FORMAT_QUESTION,
  HOW_TO_TAG_QUESTION,
  WHAT_IS_PROMOTED_QUESTION,
} from 'containers/Faq/constants';

import A from 'components/A';
import Label from 'components/FormFields/Label';

import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import { getLinks } from 'media-links';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

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
    font-size: ${graphCommunity ? '14px' : '16px'};
    line-height: 20px;

    :before {
      content: ${graphCommunity ? '\\25E6' : '""'};
      flex-basis: ${graphCommunity ? '' : '5px'};
      height: ${graphCommunity ? '' : '5px'};
      border-radius: ${graphCommunity ? '' : '50%'};
      background: ${graphCommunity ? '' : colors.textColor || BG_PRIMARY};
      margin-right: 10px;
      display: ${graphCommunity ? '' : 'inline-flex'};
      position: ${graphCommunity ? '' : 'relative'};
      top: ${graphCommunity ? '' : '8px'};
    }

    span {
      flex: 1;
      color: ${graphCommunity ? '#e1e1e4' : ''};
    }
  }
`;

const Title = Label.extend`
  font-size: 18px;
  color: ${graphCommunity ? '#e1e1e4' : ''};
`;

const P = styled.p`
  margin-bottom: 10px;
  color: ${graphCommunity ? '#e1e1e4' : ''};
`;

const Link = styled.a`
  font-size: ${graphCommunity ? '14px' : ''};
  line-height: 24px;
  color: ${graphCommunity ? '#6f4cff' : colors.linkColor || LINK_COLOR};

  :hover {
    color: ${graphCommunity ? 'rgba(111, 76, 255, 0.8)' : colors.linkColor || LINK_COLOR};
  }
`;

const messagesArray = [
  // 'common.putReturnsBetweenParagraphs',
  'common.addForLineBreaks',
  'common.italicAndBold',
  'common.indentCode',
  'common.backtipEscapes',
  'common.quoteByPlacing',
];

const Tips = ({ faqQuestions }) => {
  const { t } = useTranslation();

  return (
    <div
      css={css`
        background: ${colors.backgroundSpecial || ''};
      `}
    >
      <Title className="mb-3">{t('common.tips')}:</Title>
      <P>{t('common.markdownIsSupported')}</P>
      <Ul>
        {messagesArray.map((item, index) => (
          <li key={item}>
            <span>{t(item)}</span>
          </li>
        ))}
      </Ul>
      <span
        css={css`
          font-size: ${graphCommunity ? '14px' : ''};
          line-height: 20px;
          color: ${graphCommunity ? '#e1e1e4' : ''};
        `}
      >
        {t('common.forMoreSyntax')}
        <Link href={getLinks().markdownCheatSheet} target="_blank">
          {t('common.markdownCheatSheet')}
        </Link>
      </span>
    </div>
  );
};

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
