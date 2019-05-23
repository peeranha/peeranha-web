import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import styled from 'styled-components';
import textBlockStyles from 'text-block-styles';
import commonMessages from 'common-messages';

import plusIcon from 'images/Plus.png';
import minusIcon from 'images/Minus.png';
import arrowIcon from 'svg/arrowDown';

import H4 from 'components/H4';
import Icon from 'components/Icon';
import Span from 'components/Span';
import Base from 'components/Base';
import BaseRounded from 'components/Base/BaseRounded';
import Button from 'components/Button/Outlined/PrimaryLarge';

import { SECTION_ID } from './constants';

const TextBlock = styled.div`
  ${textBlockStyles};

  > * {
    margin-top: 15px;
  }
`;

const Ul = styled.ul`
  li:not(:last-child) {
    margin-bottom: 15px;
  }
`;

/* eslint react/jsx-no-bind: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

const Question = ({ h3, content }) => {
  const [isOpened, collapse] = useState(false);

  return (
    <li className="d-flex">
      <div>
        <Icon className="px-2 mr-3" icon={arrowIcon} rotate={isOpened} />
      </div>

      <div>
        <h3
          className="d-flex align-items-center"
          onClick={collapse.bind(null, !isOpened)}
        >
          <Span fontSize="18">{h3}</Span>
        </h3>

        <TextBlock
          className={isOpened ? 'd-block' : 'd-none'}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </li>
  );
};

const DEFAULT_QST_NUM = 5;

const Section = ({ h2, blocks, id }) => {
  const [isOpened, collapse] = useState(false);
  const [isExtendedSection, extendSection] = useState(false);

  const questionsNumber = isExtendedSection ? blocks.length : DEFAULT_QST_NUM;
  const Header = isOpened ? Base : BaseRounded;

  return (
    <div className="mb-3" id={id}>
      <Header position="top">
        <H4
          className="d-flex align-items-center"
          onClick={collapse.bind(null, !isOpened)}
        >
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
            .map(x => <Question key={x.h3} {...x} />)}
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

const Content = ({ faq }) => (
  <div>
    {faq.blocks.map((x, index) => (
      <Section key={x.h2} {...x} id={`${SECTION_ID}_${index}`} />
    ))}
  </div>
);

Question.propTypes = {
  h3: PropTypes.string,
  content: PropTypes.string,
};

Section.propTypes = {
  h2: PropTypes.string,
  blocks: PropTypes.array,
  id: PropTypes.string,
};

Content.propTypes = {
  faq: PropTypes.array,
};

export default React.memo(Content);
