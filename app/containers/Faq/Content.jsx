import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import createdHistory from 'createdHistory';

import textBlockStyles from 'text-block-styles';

import {
  BORDER_SECONDARY,
  BG_SECONDARY_SPECIAL_4,
  TEXT_PRIMARY,
  TEXT_DARK,
  BORDER_PRIMARY_LIGHT,
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
} from 'style-constants';

import plusIcon from 'images/Plus.svg?inline';
import minusIcon from 'images/Minus.svg?inline';
import arrowIconFilled from 'images/arrowDown.svg?external';
import arrowIconNotFilled from 'images/arrowDownNotFilled.svg?external';

import H4 from 'components/H4';
import Span from 'components/Span';
import Icon from 'components/Icon';
import { IconSm } from 'components/Icon/IconWithSizes';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import BaseTransparent from 'components/Base/BaseTransparent';
import Button from 'components/Button/Outlined/PrimaryLarge';

export const TextBlock = styled.div`
  display: ${({ isOpened }) => (isOpened ? 'block' : 'none')};
  margin-top: ${({ isOpened }) => (isOpened ? '15px' : '0px')};

  ${textBlockStyles};

  table {
    th,
    td {
      min-width: 70px;

      :first-child {
        padding-left: 0;
      }

      :last-child {
        padding-right: 0;
      }
    }
  }

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
    border-bottom: ${({ isOpened }) => (isOpened ? '1' : '0')}px solid
      ${BORDER_SECONDARY};
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
  background: ${({ isOpened }) =>
    isOpened ? BG_SECONDARY_SPECIAL_4 : BG_TRANSPARENT};
  border: 1px solid
    ${({ isOpened }) => (isOpened ? BORDER_PRIMARY_LIGHT : BORDER_TRANSPARENT)};
  h5 span {
    color: ${({ isOpened }) => (isOpened ? TEXT_PRIMARY : TEXT_DARK)};
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

const Question = ({
  h3,
  content,
  questionCode,
  sectionCode,
  route,
  getQuestionCode,
  collapsedMenu,
}) => {
  const [isOpened, collapse] = useState(false);

  const collapseQuestion = () => {
    createdHistory.push(route());
    collapse(prevIsOpen => !prevIsOpen);
  };

  const questionId = getQuestionCode(sectionCode, questionCode);

  return (
    <QuestionBox id={questionId} isOpened={isOpened}>
      {collapsedMenu && (
        <ImgWrapper onClick={collapseQuestion}>
          <IconSm rotate={isOpened} icon={arrowIconFilled} />
        </ImgWrapper>
      )}
      <QuestionBoxBody>
        {collapsedMenu && (
          <h5 className="d-flex align-items-center" onClick={collapseQuestion}>
            <Span fontSize="20" lineHeight="30" mobileFS="16">
              {h3}
            </Span>
          </h5>
        )}

        <TextBlock
          isOpened={!collapsedMenu || isOpened}
          dangerouslySetInnerHTML={{ __html: content }}
        />
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
  collapsedMenu,
}) => {
  const { t } = useTranslation();
  const [isOpened, collapse] = useState(false);
  const [isExtendedSection, extendSection] = useState(false);

  const questionsNumber = isExtendedSection ? blocks.length : DEFAULT_QST_NUM;

  const collapseSection = () => {
    createdHistory.push(route());
    collapse(prevIsOpen => !prevIsOpen);
  };

  const sectionId = getSectionCode(sectionCode);

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

      {isOpened && (
        <div className="d-block">
          <ul>
            {blocks
              .slice(0, questionsNumber)
              .map(block => (
                <Question
                  key={block.h3}
                  h3={block.h3}
                  content={block.content}
                  questionCode={block.questionCode}
                  sectionCode={sectionCode}
                  route={route}
                  getQuestionCode={getQuestionCode}
                  collapsedMenu={collapsedMenu}
                />
              ))}
          </ul>

          {blocks.length > DEFAULT_QST_NUM && (
            <BaseTransparent className="pt-1">
              <Button onClick={extendSection.bind(null, !isExtendedSection)}>
                {t(`common.${isExtendedSection ? 'showLess' : 'showMore'}`, {
                  value: `${questionsNumber}/${blocks.length}`,
                })}
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
      )}
    </SectionStyled>
  );
};

const Content = ({
  content,
  route,
  getSectionCode,
  getQuestionCode,
  collapsedMenu = true,
}) => (
  <div className="mb-3">
    {content.blocks.map(block => (
      <Section
        key={block.h2}
        h2={block.h2}
        blocks={block.blocks}
        sectionCode={block.sectionCode}
        route={route}
        getSectionCode={getSectionCode}
        getQuestionCode={getQuestionCode}
        collapsedMenu={collapsedMenu}
      />
    ))}
  </div>
);

Question.propTypes = {
  content: PropTypes.string,
  questionCode: PropTypes.number,
  sectionCode: PropTypes.number,
  getQuestionCode: PropTypes.func,
  collapsedMenu: PropTypes.bool,
};

Section.propTypes = {
  h2: PropTypes.string,
  blocks: PropTypes.array,
  sectionCode: PropTypes.number,
  route: PropTypes.func,
  getSectionCode: PropTypes.func,
  getQuestionCode: PropTypes.func,
  collapsedMenu: PropTypes.bool,
};

Content.propTypes = {
  content: PropTypes.object,
  route: PropTypes.func,
  getSectionCode: PropTypes.func,
  getQuestionCode: PropTypes.func,
  collapsedMenu: PropTypes.bool,
};

export default Content;
