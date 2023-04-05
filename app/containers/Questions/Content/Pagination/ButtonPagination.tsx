import React from 'react';
import { styles } from './Pagination.styled';
import { css } from '@emotion/react';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';
import {
  POST_TYPE_DISCUSSIONS,
  POST_TYPE_EXPERTS,
  POST_TYPE_TUTORIALS,
  STEP_NEXT,
  CONTINUE,
} from './constants';
type ButtonPaginationProps = {
  page: number;
  element: number;
  clickHandler: (num: number) => void;
  scrollToTop: () => void;
};

type StepButtonPaginationProps = {
  src: string;
  alt: string;
  clickHandler: () => void;
  scrollToTop: () => void;
  page: number;
};

const routeHandler = (element: number, direction: boolean) => {
  const route = createdHistory.location.pathname.split('/')[1];
  const step = direction ? element + 1 : element - 1;
  if (route === POST_TYPE_DISCUSSIONS) {
    return createdHistory.push(routes.questions(null, step));
  }
  if (route === POST_TYPE_EXPERTS) {
    return createdHistory.push(routes.expertPosts(null, step));
  }
  if (route === POST_TYPE_TUTORIALS) {
    return createdHistory.push(routes.tutorials(null, step));
  }
  return createdHistory.push(routes.feed(null, step));
};

const ButtonPagination: React.FC<ButtonPaginationProps> = ({
  page,
  element,
  clickHandler,
  scrollToTop,
}): JSX.Element => {
  return (
    <button
      css={css({
        ...styles.basicStyles,
        ...(page === element + 1 && styles.activeStyles),
      })}
      onClick={() => {
        clickHandler(element + 1);
        routeHandler(element, true);
        scrollToTop();
      }}
      key={element}
    >
      {element + 1}
    </button>
  );
};

const StepButtonPagination: React.FC<StepButtonPaginationProps> = ({
  clickHandler,
  src,
  alt,
  scrollToTop,
  page,
}): JSX.Element => {
  const direction = alt === STEP_NEXT;
  return (
    <button
      onClick={() => {
        clickHandler();
        routeHandler(page, direction);
        scrollToTop();
      }}
      css={css(styles.basicStyles)}
    >
      <img src={src} alt={alt} />
    </button>
  );
};

const ContinueButtonPagination: React.FC = (): JSX.Element => {
  return <p>{CONTINUE}</p>;
};

export { ButtonPagination, StepButtonPagination, ContinueButtonPagination };
