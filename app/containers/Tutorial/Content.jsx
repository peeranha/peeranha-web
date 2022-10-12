/* eslint react/jsx-no-bind: 0, jsx-a11y/click-events-have-key-events: 0, jsx-a11y/no-noninteractive-element-interactions: 0 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import createdHistory from 'createdHistory';

import textBlockStyles from 'text-block-styles';
import commonMessages from 'common-messages';

import { BORDER_SECONDARY } from 'style-constants';
import cn from 'classnames';

import MinusIcon from 'icons/Minus';
import PlusCircleIcon from 'icons/PlusCircle';
import ArrowDownFillIcon from 'icons/ArrowDownFill';

import H4 from 'components/H4';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import BaseTransparent from 'components/Base/BaseTransparent';
import Button from 'components/Button/Outlined/PrimaryLarge';
import Question from './Question';

export const TextBlock = styled.div`
  display: ${x => (x.isOpened ? 'block' : 'none')};
  margin-top: ${x => (x.isOpened ? '15px' : '0px')};

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

  @media only screen and (max-width: 576px) {
    margin-right: 8px;
  }
`;

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
            {isOpened ? (
              <MinusIcon fill="#7699ff" />
            ) : (
              <PlusCircleIcon fill="#7699ff" />
            )}
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
                {...x}
                key={x.h3}
                sectionCode={sectionCode}
                route={route}
                getQuestionCode={getQuestionCode}
                sectionIsOpened={isOpened}
              />
            ))}
        </ul>

        {blocks.length > DEFAULT_QST_NUM && (
          <BaseTransparent className="pt-1">
            <Button onClick={extendSection.bind(null, !isExtendedSection)}>
              <FormattedMessage
                {...commonMessages[isExtendedSection ? 'showLess' : 'showMore']}
                values={{ value: `${questionsNumber}/${blocks.length}` }}
              />
              <ArrowDownFillIcon
                className={cn(`ml-2 ${isExtendedSection && 'transform180'}`)}
                fill="#7B7B7B"
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
        {...x}
        key={x.h2}
        route={route}
        getSectionCode={getSectionCode}
        getQuestionCode={getQuestionCode}
      />
    ))}
  </div>
);

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
