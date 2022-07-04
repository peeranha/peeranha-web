import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import createdHistory from 'createdHistory';

import textBlockStyles from 'text-block-styles';
import commonMessages from 'common-messages';

import {
  BORDER_SECONDARY,
  BG_SECONDARY_SPECIAL_4,
  TEXT_PRIMARY,
  TEXT_DARK,
  BORDER_PRIMARY_LIGHT,
} from 'style-constants';

import plusIcon from 'images/Plus.svg?inline';
import minusIcon from 'images/Minus.svg?inline';
import arrowIconNotFilled from 'images/arrowDownNotFilled.svg?external';

import H4 from 'components/H4';
import Icon from 'components/Icon';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import BaseTransparent from 'components/Base/BaseTransparent';
import Button from 'components/Button/Outlined/PrimaryLarge';

export const TextBlock = styled.div`
  display: block;
  margin-top: 15px;

  ${textBlockStyles};

  > * {
    margin-bottom: 5px;
  }
`;

const SectionStyled = BaseRoundedNoPadding.extend`
  margin-bottom: 15px;

  h4,
  h5 {
    cursor: pointer;
  }

  > :not(:last-child) {
    border-bottom: ${x => (x.isOpened ? '1' : '0')}px solid ${BORDER_SECONDARY};
  }

  ${Button} {
    margin-left: 43px;
    margin-bottom: 10px;
  }
`;

const ImgWrapper = styled.div`
  margin-right: 18px;
  width: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  :hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 576px) {
    margin-right: 8px;
  }
`;

const QuestionBox = BaseTransparent.extend`
  display: flex;
  align-items: baseline;
  padding: 10px 30px;
  background: ${BG_SECONDARY_SPECIAL_4};
  border: 1px solid ${BORDER_PRIMARY_LIGHT};

  h5 span {
    color: ${x => (x.isOpened ? TEXT_PRIMARY : TEXT_DARK)};
  }

  &:first-child {
    padding-top: 15px;
  }

  &:last-child {
    padding-bottom: 15px;
  }
`.withComponent('li');

const QuestionBoxBody = styled.div`
  width: 100%;
`;

const Question = ({ content, questionCode, sectionCode, getQuestionCode }) => {
  const questionId = getQuestionCode(sectionCode, questionCode);

  return (
    <QuestionBox id={questionId}>
      <QuestionBoxBody>
        <TextBlock dangerouslySetInnerHTML={{ __html: content }} />
      </QuestionBoxBody>
    </QuestionBox>
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
    <SectionStyled isOpened={isOpened} id={sectionId}>
      <BaseTransparent>
        <H4
          className="d-flex align-items-center"
          onClick={collapseSection}
          mobileFS="24"
        >
          <ImgWrapper>
            <img src={isOpened ? minusIcon : plusIcon} alt="icon" />
          </ImgWrapper>
          <span>{h2}</span>
        </H4>
      </BaseTransparent>

      <div className={isOpened ? 'd-block' : 'd-none'}>
        <ul>
          {blocks
            .slice(0, questionsNumber)
            .map(x => (
              <Question
                key={x.h3}
                content={x.content}
                questionCode={x.questionCode}
                sectionCode={sectionCode}
                getQuestionCode={getQuestionCode}
              />
            ))}
        </ul>

        {blocks.length > DEFAULT_QST_NUM && (
          <BaseTransparent className="pt-1">
            <Button onClick={extendSection.bind(null, !isExtendedSection)}>
              <FormattedMessage
                id={
                  commonMessages[isExtendedSection ? 'showLess' : 'showMore'].id
                }
                values={{ value: `${questionsNumber}/${blocks.length}` }}
              />
              <Icon
                className="ml-2"
                rotate={isExtendedSection}
                isTransition={false}
                icon={arrowIconNotFilled}
                width="8"
              />
            </Button>
          </BaseTransparent>
        )}
      </div>
    </SectionStyled>
  );
};

const Content = ({ content, route, getSectionCode, getQuestionCode }) => (
  <div className="mb-3">
    {content.blocks.map(x => (
      <Section
        key={x.h2}
        blocks={x.blocks}
        h2={x.h2}
        route={route}
        getSectionCode={getSectionCode}
        getQuestionCode={getQuestionCode}
      />
    ))}
  </div>
);

Question.propTypes = {
  content: PropTypes.string,
  questionCode: PropTypes.number,
  sectionCode: PropTypes.number,
  getQuestionCode: PropTypes.func,
};

Section.propTypes = {
  h2: PropTypes.string,
  blocks: PropTypes.array,
  sectionCode: PropTypes.number,
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

export default Content;
