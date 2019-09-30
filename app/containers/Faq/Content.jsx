import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import createdHistory from 'createdHistory';
import { BORDER_SECONDARY } from 'style-constants';
import textBlockStyles from 'text-block-styles';
import commonMessages from 'common-messages';

import { scrollToSection } from 'utils/animation';

import plusIcon from 'images/Plus.png';
import minusIcon from 'images/Minus.png';
import arrowIcon from 'images/arrowDown.svg?inline';

import H4 from 'components/H4';
import Span from 'components/Span';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import BaseTransparent from 'components/Base/BaseTransparent';
import Button from 'components/Button/Outlined/PrimaryLarge';

export const TextBlock = styled.div`
  display: ${x => (x.isOpened ? 'block' : 'none')};
  margin-top: ${x => (x.isOpened ? '15px' : '0px')};
  ${textBlockStyles};
`;

export const ArrowIcon = styled.img`
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 15px;
  display: inline-block;
  transition: 0.5s;
  transform: rotate(${x => (x.isOpened ? '180deg' : '0deg')});

  @media only screen and (max-width: 576px) {
    transform: scale(0.8) rotate(${x => (x.isOpened ? '180deg' : '0deg')});
    padding-right: 0px;
    padding-left: 0px;
  }
`;

const SectionStyled = BaseRoundedNoPadding.extend`
  margin-bottom: 15px;

  h4,
  h5 {
    cursor: pointer;
  }

  ${BaseTransparent} {
    li:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  > :not(:last-child) {
    border-bottom: 1px solid ${BORDER_SECONDARY};
  }
`;

/* eslint react/jsx-no-bind: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

const Question = ({
  h3,
  content,
  questionCode,
  sectionCode,
  route,
  getQuestionCode,
}) => {
  const { hash } = window.location;

  const [isOpened, collapse] = useState(false);

  const collapseQuestion = () => {
    createdHistory.push(route());
    collapse(!isOpened);
  };

  const questionId = getQuestionCode(sectionCode, questionCode);

  if (hash.match(questionId) && !isOpened) {
    collapse(true);
  }

  return (
    <li className="d-flex" id={questionId}>
      <div>
        <ArrowIcon isOpened={isOpened} src={arrowIcon} alt="icon" />
      </div>

      <div>
        <h5 className="d-flex align-items-center" onClick={collapseQuestion}>
          <Span fontSize="18" mobileFS="16">
            {h3}
          </Span>
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

const Section = ({
  h2,
  blocks,
  sectionCode,
  route,
  getSectionCode,
  getQuestionCode,
}) => {
  const { hash } = window.location;

  const [isOpened, collapse] = useState(false);
  const [isExtendedSection, extendSection] = useState(false);

  const questionsNumber = isExtendedSection ? blocks.length : DEFAULT_QST_NUM;

  const collapseSection = () => {
    createdHistory.push(route());
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
    <SectionStyled id={sectionId}>
      <BaseTransparent>
        <H4
          className="d-flex align-items-center"
          onClick={collapseSection}
          mobileFS="24"
        >
          <img
            className="mr-3"
            src={isOpened ? minusIcon : plusIcon}
            alt="icon"
          />
          <span>{h2}</span>
        </H4>
      </BaseTransparent>

      <BaseTransparent className={isOpened ? 'd-block' : 'd-none'}>
        <ul>
          {blocks
            .slice(0, questionsNumber)
            .map(x => (
              <Question
                {...x}
                key={x.h3}
                sectionCode={sectionCode}
                route={route}
                getQuestionCode={getQuestionCode}
              />
            ))}
        </ul>

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
      </BaseTransparent>
    </SectionStyled>
  );
};

const Content = ({ content, route, getSectionCode, getQuestionCode }) => {
  // scroll to section / question after component mounting
  useEffect(() => {
    scrollToSection();
  }, []);

  return (
    <div className="mb-3">
      {content.blocks.map(x => (
        <Section
          {...x}
          key={x.h2}
          route={route}
          getSectionCode={getSectionCode}
          getQuestionCode={getQuestionCode}
        />
      ))}
    </div>
  );
};

Question.propTypes = {
  h3: PropTypes.string,
  content: PropTypes.string,
  questionCode: PropTypes.string,
  sectionCode: PropTypes.string,
  route: PropTypes.func,
  getQuestionCode: PropTypes.func,
};

Section.propTypes = {
  h2: PropTypes.string,
  blocks: PropTypes.array,
  sectionCode: PropTypes.string,
  route: PropTypes.func,
  getSectionCode: PropTypes.func,
  getQuestionCode: PropTypes.func,
};

Content.propTypes = {
  content: PropTypes.object,
  route: PropTypes.func,
  getSectionCode: PropTypes.func,
  getQuestionCode: PropTypes.func,
};

export default React.memo(Content);
