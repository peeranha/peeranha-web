import React from 'react';
import { styles } from './Pagination.styled';
import { css } from '@emotion/react';

type ButtonPaginationProps = {
  page: number;
  element: number;
  clickHandler: (num: number) => void;
};

type StepButtonPaginationProps = {
  src: string;
  alt: string;
  clickHandler: () => void;
};

const ButtonPagination: React.FC<ButtonPaginationProps> = ({
  page,
  element,
  clickHandler,
}): JSX.Element => {
  return (
    <button
      css={css({
        ...styles.basicStyles,
        ...(page === element + 1 && styles.activeStyles),
      })}
      onClick={() => clickHandler(element + 1)}
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
}): JSX.Element => {
  return (
    <button onClick={clickHandler} css={css(styles.basicStyles)}>
      <img src={src} alt="alt" />
    </button>
  );
};

const ContinueButtonPagination: React.FC = (): JSX.Element => {
  return <p>...</p>;
};

export { ButtonPagination, StepButtonPagination, ContinueButtonPagination };
