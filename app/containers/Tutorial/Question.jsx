import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import createdHistory from 'createdHistory';

import BaseTransparent from 'components/Base/BaseTransparent';

import Span from 'components/Span';
import ArrowDownFillIcon from 'icons/ArrowDownFill';

import {
  BG_SECONDARY_SPECIAL_4,
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
  TEXT_DARK,
  BORDER_PRIMARY_LIGHT,
} from 'style-constants';
import LoadingIndicator from 'components/LoadingIndicator/CenteredTutorial';

const QuestionBox = BaseTransparent.extend`
  display: flex;
  align-items: baseline;
  padding: 10px 30px;
  background: ${x => (x.isOpened ? BG_SECONDARY_SPECIAL_4 : BG_TRANSPARENT)};
  border: 1px solid
    ${x => (x.isOpened ? BORDER_PRIMARY_LIGHT : BORDER_TRANSPARENT)};

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

const VideoWrapper = styled.div`
  position: relative;
  display: ${x => (x.isOpened ? 'block' : 'none')};
  height: 40vh;
  margin-top: ${x => (x.isOpened ? '15px' : '0px')};
  margin-bottom: 5px;
`;

const getYoutubeLink = mdContent =>
  mdContent.match(/https:\/\/www\.youtube\.com\//)
    ? mdContent.match(/https:\/\/www\.youtube\.com\//).input.split(`"`)[1]
    : null;

const VideoBlock = ({ isOpened, content, sectionIsOpened }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  return (
    <VideoWrapper isOpened={isOpened}>
      {isLoading && <LoadingIndicator />}
      <ReactPlayer
        url={getYoutubeLink(content)}
        controls
        playing={isOpened && sectionIsOpened && !isPaused}
        width="100%"
        height="100%"
        onReady={() => setIsLoading(false)}
        onPause={() => setIsPaused(true)}
        onPlay={() => setIsPaused(false)}
      />
    </VideoWrapper>
  );
};

const Question = ({
  h3,
  content,
  questionCode,
  sectionCode,
  route,
  getQuestionCode,
  sectionIsOpened,
}) => {
  const { hash } = window.location;

  const [isOpened, collapse] = useState(false);

  const questionId = getQuestionCode(sectionCode, questionCode);

  const collapseQuestion = () => {
    createdHistory.push(route());
    collapse(!isOpened);
  };

  if (hash.match(questionId) && !isOpened) {
    collapse(true);
  }

  return (
    <QuestionBox id={questionId} isOpened={isOpened}>
      <ImgWrapper>
        <ArrowDownFillIcon className={isOpened && 'transform180'} />
      </ImgWrapper>

      <QuestionBoxBody>
        <h5 className="d-flex align-items-center" onClick={collapseQuestion}>
          <Span fontSize="20" lineHeight="30" mobileFS="16">
            {h3}
          </Span>
        </h5>

        <VideoBlock
          sectionIsOpened={sectionIsOpened}
          isOpened={isOpened}
          content={content}
        />
      </QuestionBoxBody>
    </QuestionBox>
  );
};

Question.propTypes = {
  h3: PropTypes.string,
  content: PropTypes.string,
  questionCode: PropTypes.number,
  sectionCode: PropTypes.number,
  route: PropTypes.func,
  getQuestionCode: PropTypes.func,
  sectionIsOpened: PropTypes.bool,
};

VideoBlock.propTypes = {
  isOpened: PropTypes.bool,
  content: PropTypes.string,
  sectionIsOpened: PropTypes.bool,
};

export default Question;
