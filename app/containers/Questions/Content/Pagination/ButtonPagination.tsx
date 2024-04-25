import React from 'react';
import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import {
  POST_TYPE_DISCUSSIONS,
  POST_TYPE_EXPERTS,
  POST_TYPE_TUTORIALS,
  POST_TYPE_DISCORD,
  STEP_NEXT,
} from './constants';
import { styles } from './Pagination.styled';

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
  const [, route, feedCommunityId, communityId] = createdHistory.location.pathname.split('/');
  const step = direction ? element + 1 : element - 1;

  if (route === POST_TYPE_DISCUSSIONS) {
    return createdHistory.push(routes.questions(communityId, step));
  }
  if (route === POST_TYPE_EXPERTS) {
    return createdHistory.push(routes.expertPosts(communityId, step));
  }
  if (route === POST_TYPE_TUTORIALS) {
    return createdHistory.push(routes.tutorials(communityId, step));
  }
  if (route === POST_TYPE_DISCORD) {
    return createdHistory.push(routes.discordPosts(communityId, step));
  }
  // to do: telegram and slack
  return createdHistory.push(routes.feed(feedCommunityId, step));
};

const ButtonPagination = ({ page, element, clickHandler, scrollToTop }: ButtonPaginationProps) => {
  const buttonClickHandler = () => {
    clickHandler(element + 1);
    routeHandler(element, true);
    scrollToTop();
  };

  return (
    <button
      key={element}
      css={{
        ...styles.basicStyles,
        ...(page === element + 1 && styles.activeStyles),
      }}
      onClick={buttonClickHandler}
    >
      {element + 1}
    </button>
  );
};

const StepButtonPagination = ({
  clickHandler,
  src,
  alt,
  scrollToTop,
  page,
}: StepButtonPaginationProps) => {
  const direction = alt === STEP_NEXT;
  const stepButtonClickHandler = () => {
    clickHandler();
    routeHandler(page, direction);
    scrollToTop();
  };
  return (
    <button css={styles.basicStyles} onClick={stepButtonClickHandler}>
      <img src={src} alt={alt} />
    </button>
  );
};

export { ButtonPagination, StepButtonPagination };
