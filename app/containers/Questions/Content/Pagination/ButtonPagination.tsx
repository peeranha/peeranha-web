import React from 'react';
import { styles } from './Pagination.styled';
import { css } from '@emotion/react';

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
}): JSX.Element => {
  return (
    <button
      onClick={() => {
        clickHandler();
        scrollToTop();
      }}
      css={css(styles.basicStyles)}
    >
      <img src={src} alt="alt" />
    </button>
  );
};

const ContinueButtonPagination: React.FC = (): JSX.Element => {
  return <p>...</p>;
};

export { ButtonPagination, StepButtonPagination, ContinueButtonPagination };
