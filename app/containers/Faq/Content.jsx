import AreYouSure from 'containers/ViewQuestion/AreYouSure';
import messages from 'containers/ViewQuestion/messages';
import pencilIcon from 'images/pencil.svg?external';
import deleteIcon from 'images/deleteIcon.svg?external';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { css } from '@emotion/react';
import cn from 'classnames';
import { styles } from 'containers/Faq/Faq.styled';

import createdHistory from 'createdHistory';

import textBlockStyles from 'text-block-styles';
import commonMessages from 'common-messages';

import {
  BORDER_SECONDARY,
  BG_SECONDARY_SPECIAL_4,
  TEXT_PRIMARY,
  TEXT_DARK,
  BORDER_PRIMARY_LIGHT,
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  BORDER_PRIMARY,
} from 'style-constants';

import plusIcon from 'images/Plus.svg?inline';
import minusIcon from 'images/Minus.svg?inline';
import arrowIconFilled from 'images/arrowDown.svg?external';
import arrowIconNotFilled from 'images/arrowDownNotFilled.svg?external';

import H4 from 'components/H4';
import Span from 'components/Span';
import Icon from 'components/Icon';
import { IconMd, IconSm } from 'components/Icon/IconWithSizes';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import BaseTransparent from 'components/Base/BaseTransparent';
import Button from 'components/Button/Outlined/PrimaryLarge';
import IconButton from 'containers/ViewQuestion/Button';

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
}) => {
  const [isOpened, collapse] = useState(false);

  const collapseQuestion = () => {
    createdHistory.push(route());
    collapse(prevIsOpen => !prevIsOpen);
  };

  const questionId = getQuestionCode(sectionCode, questionCode);

  return (
    <QuestionBox id={questionId} isOpened={isOpened}>
      <div
        className="aic jcc"
        css={css(styles.collapseImage)}
        onClick={collapseQuestion}
      >
        <IconSm rotate={isOpened} icon={arrowIconFilled} />
      </div>

      <QuestionBoxBody>
        <h5 className="d-flex align-items-center" onClick={collapseQuestion}>
          <Span fontSize="20" lineHeight="30" mobileFS="16">
            {h3}
          </Span>
        </h5>

        <TextBlock
          isOpened={isOpened}
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
  faqId,
  isCommunityModerator,
  editItem,
  deleteItem,
}) => {
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
      <BaseTransparent className={cn('df fdr jcsb')}>
        <H4
          className="d-flex align-items-center"
          onClick={collapseSection}
          mobileFS="24"
        >
          <div css={css(styles.collapseImage)}>
            <img src={isOpened ? minusIcon : plusIcon} alt="icon" />
          </div>
          <span>{h2}</span>
        </H4>

        {isCommunityModerator && (
          <div className="df aic" css={css(styles.buttonContainer)}>
            <div id={`faq_delete_${faqId}`}>
              <AreYouSure
                submitAction={deleteItem.bind(null, faqId)}
                Button={({ onClick }) => (
                  <IconButton
                    show={isCommunityModerator}
                    id={`faq_delete_${faqId}`}
                    onClick={onClick}
                  >
                    <IconMd icon={deleteIcon} fill={BORDER_PRIMARY} />
                    <FormattedMessage id={messages.deleteButton.id} />
                  </IconButton>
                )}
              />
            </div>

            <IconButton
              show={isCommunityModerator}
              onClick={editItem[0]}
              params={{ link: editItem[1]('faq', faqId) }}
              id={`redirect-to-edit-item-0-${faqId}-0`}
            >
              <IconMd icon={pencilIcon} />
              <FormattedMessage id={messages.editButton.id} />
            </IconButton>
          </div>
        )}
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
                />
              ))}
          </ul>

          {blocks.length > DEFAULT_QST_NUM && (
            <BaseTransparent className="pt-1">
              <Button onClick={extendSection.bind(null, !isExtendedSection)}>
                <FormattedMessage
                  id={
                    commonMessages[isExtendedSection ? 'showLess' : 'showMore']
                      .id
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
      )}
    </SectionStyled>
  );
};

const Content = ({
  content,
  route,
  getSectionCode,
  getQuestionCode,
  isCommunityModerator,
  editItem,
  deleteItem,
}) => (
  <div className="mb-3">
    {content.blocks.map(block => (
      <Section
        key={block.h2}
        h2={block.h2}
        blocks={block.blocks}
        sectionCode={block.sectionCode}
        faqId={block.faqId}
        route={route}
        getSectionCode={getSectionCode}
        getQuestionCode={getQuestionCode}
        isCommunityModerator={isCommunityModerator}
        editItem={editItem}
        deleteItem={deleteItem}
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
