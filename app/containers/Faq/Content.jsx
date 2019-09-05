import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import textBlockStyles from 'text-block-styles';
import commonMessages from 'common-messages';

import { scrollToSection } from 'utils/animation';
import { getSectionCode, getQuestionCode } from 'utils/faqManagement';

import plusIcon from 'images/Plus.png';
import minusIcon from 'images/Minus.png';
import arrowIcon from 'images/arrowDown.svg?inline';

import H4 from 'components/H4';
import Span from 'components/Span';
import Base from 'components/Base';
import BaseRounded from 'components/Base/BaseRounded';
import Button from 'components/Button/Outlined/PrimaryLarge';

const ContentStyled = styled.div`
  h4,
  h5 {
    cursor: pointer;
  }
`;

export const TextBlock = styled.div`
  display: ${x => (x.isOpened ? 'block' : 'none')};
  margin-top: ${x => (x.isOpened ? '15px' : '0px')};
  ${textBlockStyles};
`;

const Ul = styled.ul`
  > li:not(:last-child) {
    margin-bottom: 15px;
  }
`;

/* eslint react/jsx-no-bind: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

const Question = ({ h3, content, questionCode, sectionCode }) => {
  const { hash } = window.location;

  const [isOpened, collapse] = useState(false);

  const collapseQuestion = () => {
    createdHistory.push(routes.appFaq());
    collapse(!isOpened);
  };

  const questionId = getQuestionCode(sectionCode, questionCode);

  if (hash.match(questionId) && !isOpened) {
    collapse(true);
  }

  return (
    <li className="d-flex" id={questionId}>
      <div>
        <img
          style={{ transform: `rotate(${isOpened ? '180deg' : '0deg'})` }}
          className="px-2 mr-3"
          src={arrowIcon}
          alt="icon"
        />
      </div>

      <div>
        <h5 className="d-flex align-items-center" onClick={collapseQuestion}>
          <Span fontSize="18">{h3}</Span>
        </h5>

        <TextBlock
          isOpened={isOpened}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </li>
  );
};

const DEFAULT_QST_NUM = 5;

const Section = ({ h2, blocks, sectionCode }) => {
  const { hash } = window.location;

  const [isOpened, collapse] = useState(false);
  const [isExtendedSection, extendSection] = useState(false);

  const questionsNumber = isExtendedSection ? blocks.length : DEFAULT_QST_NUM;
  const Header = isOpened ? Base : BaseRounded;

  const collapseSection = () => {
    createdHistory.push(routes.appFaq());
    collapse(!isOpened);
  };

  const sectionId = getSectionCode(sectionCode);

  if (hash.match(sectionId) && !isOpened) {
    collapse(true);

    if (!isExtendedSection) {
      extendSection(true);
    }
  }

  return (
    <div className="mb-3" id={sectionId}>
      <Header position="top">
        <H4 className="d-flex align-items-center" onClick={collapseSection}>
          <img
            className="mr-4"
            src={isOpened ? minusIcon : plusIcon}
            alt="icon"
          />
          <span>{h2}</span>
        </H4>
      </Header>

      <Base className={isOpened ? 'd-block' : 'd-none'} position="bottom">
        <Ul>
          {blocks
            .slice(0, questionsNumber)
            .map(x => <Question {...x} key={x.h3} sectionCode={sectionCode} />)}
        </Ul>

        {blocks.length > DEFAULT_QST_NUM && (
          <Button
            className="ml-5 mt-3"
            onClick={extendSection.bind(null, !isExtendedSection)}
          >
            <FormattedMessage {...commonMessages.seeAll} />
            <span className="ml-1">{`${questionsNumber}/${
              blocks.length
            }`}</span>
          </Button>
        )}
      </Base>
    </div>
  );
};

const Content = ({ faq }) => {
  // scroll to section / question after component mounting
  useEffect(() => {
    scrollToSection();
  }, []);

  return (
    <ContentStyled>
      {faq.blocks.map(x => <Section {...x} key={x.h2} />)}
    </ContentStyled>
  );
};

Question.propTypes = {
  h3: PropTypes.string,
  content: PropTypes.string,
  questionCode: PropTypes.string,
  sectionCode: PropTypes.string,
};

Section.propTypes = {
  h2: PropTypes.string,
  blocks: PropTypes.array,
  sectionCode: PropTypes.string,
};

Content.propTypes = {
  faq: PropTypes.array,
};

export default React.memo(Content);
