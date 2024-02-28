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
    font-size: 14px;
    line-height: 20px;

    :before {
      content: '\\25E6';
      margin-right: 10px;
    }

    span {
      flex: 1;
      color: #ffffff;
    }
  }
`;

const Title = Label.extend`
  font-size: 18px;
  color: #e1e1e4;
`;

const P = styled.p`
  margin-bottom: 10px;
  color: #ffffff;
`;

const Link = styled.a`
  font-size: 14px;
  line-height: 24px;
  color: #6f4cff;

  :hover {
    color: rgba(111, 76, 255, 0.8);
  }
`;

const messagesArray = [
  'common.putReturnsBetweenParagraphs',
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

      <Ul>
        {messagesArray.map((item, index) => (
          <li key={item}>
            <span>{t(item)}</span>
          </li>
        ))}
      </Ul>
      <span
        css={css`
          font-size: 14px;
          line-height: 20px;
          color: #fff;
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
