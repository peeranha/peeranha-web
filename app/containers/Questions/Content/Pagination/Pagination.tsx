import React from 'react';
import { styles } from './Pagination.styled';
import { css } from '@emotion/react';
import {
  ButtonPagination,
  StepButtonPagination,
  ContinueButtonPagination,
} from './ButtonPagination';
import prev from 'images/prev.svg?inline';
import next from 'images/next.svg?inline';
import useMediaQuery from 'hooks/useMediaQuery';
import { STEP_NEXT, STEP_PREV, CONTINUE } from './constants';
type PaginationProps = {
  page: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
  setPage: (num: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  prevPage,
  nextPage,
  setPage,
}): JSX.Element => {
  const isDesktop450 = useMediaQuery('(min-width: 451px)');
  const lastPage = page === totalPages;

  const scrollToTop = () => {
    setTimeout(
      () =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        }),
      250,
    );
  };
  if (totalPages <= 1) {
    return null;
  }
  if (totalPages <= 5) {
    return (
      <>
        <div css={styles.container}>
          {[...Array(totalPages).keys()].map((element, index) =>
            index <= 4 ? (
              <ButtonPagination
                page={page}
                element={element}
                clickHandler={setPage}
                scrollToTop={scrollToTop}
              />
            ) : null,
          )}
          {!lastPage && (
            <StepButtonPagination
              page={page}
              clickHandler={nextPage}
              src={next}
              scrollToTop={scrollToTop}
              alt={STEP_NEXT}
            />
          )}
        </div>
      </>
    );
  }
  if (page <= 3 && totalPages > 5) {
    return (
      <>
        <div css={styles.container}>
          {[...Array(totalPages).keys()].map((element, index) =>
            index < 4 ? (
              <ButtonPagination
                page={page}
                element={element}
                clickHandler={setPage}
                scrollToTop={scrollToTop}
              />
            ) : null,
          )}
          <ContinueButtonPagination />
          {[...Array(totalPages).keys()].map((element, index) =>
            index == totalPages - 1 ? (
              <ButtonPagination
                page={page}
                element={element}
                clickHandler={setPage}
                scrollToTop={scrollToTop}
              />
            ) : null,
          )}
          {!lastPage && (
            <StepButtonPagination
              page={page}
              clickHandler={nextPage}
              scrollToTop={scrollToTop}
              src={next}
              alt={STEP_NEXT}
            />
          )}
        </div>
      </>
    );
  }
  if (isDesktop450 && page > 3 && page < totalPages - 3) {
    return (
      <>
        <div css={styles.container}>
          <StepButtonPagination
            page={page}
            clickHandler={prevPage}
            src={prev}
            scrollToTop={scrollToTop}
            alt={STEP_PREV}
          />
          {[...Array(totalPages).keys()].map((element, index) =>
            index == 0 ? (
              <ButtonPagination
                page={page}
                element={element}
                clickHandler={setPage}
                scrollToTop={scrollToTop}
              />
            ) : null,
          )}
          <ContinueButtonPagination />
          {[...Array(totalPages).keys()].map((element, index) =>
            index > 1 &&
            (index == page - 2 || index == page - 1 || index == page || index == page + 1) ? (
              <ButtonPagination
                page={page}
                element={element}
                clickHandler={setPage}
                scrollToTop={scrollToTop}
              />
            ) : null,
          )}
          <ContinueButtonPagination />
          {[...Array(totalPages).keys()].map((element, index) =>
            index == totalPages - 1 ? (
              <ButtonPagination
                page={page}
                element={element}
                clickHandler={setPage}
                scrollToTop={scrollToTop}
              />
            ) : null,
          )}
          {!lastPage && (
            <StepButtonPagination
              page={page}
              clickHandler={nextPage}
              scrollToTop={scrollToTop}
              src={next}
              alt={STEP_NEXT}
            />
          )}
        </div>
      </>
    );
  }
  if (page > 3 && page < totalPages - 3) {
    return (
      <>
        <div css={styles.container}>
          <StepButtonPagination
            page={page}
            clickHandler={prevPage}
            scrollToTop={scrollToTop}
            src={prev}
            alt={STEP_PREV}
          />
          {[...Array(totalPages).keys()].map((element, index) =>
            index == 0 ? (
              <ButtonPagination
                page={page}
                element={element}
                clickHandler={setPage}
                scrollToTop={scrollToTop}
              />
            ) : null,
          )}
          <ContinueButtonPagination />
          {[...Array(totalPages).keys()].map((element, index) =>
            index == page - 1 ? (
              <ButtonPagination
                page={page}
                element={element}
                clickHandler={setPage}
                scrollToTop={scrollToTop}
              />
            ) : null,
          )}
          <ContinueButtonPagination />
          {[...Array(totalPages).keys()].map((element, index) =>
            index == totalPages - 1 ? (
              <ButtonPagination
                page={page}
                element={element}
                clickHandler={setPage}
                scrollToTop={scrollToTop}
              />
            ) : null,
          )}
          {!lastPage && (
            <StepButtonPagination
              page={page}
              clickHandler={nextPage}
              scrollToTop={scrollToTop}
              src={next}
              alt={STEP_NEXT}
            />
          )}
        </div>
      </>
    );
  }
  return (
    <>
      <div css={styles.container}>
        <StepButtonPagination
          page={page}
          clickHandler={prevPage}
          scrollToTop={scrollToTop}
          src={prev}
          alt={STEP_PREV}
        />
        {[...Array(totalPages).keys()].map((element, index) =>
          index == 0 ? (
            <ButtonPagination
              page={page}
              element={element}
              clickHandler={setPage}
              scrollToTop={scrollToTop}
            />
          ) : null,
        )}
        <p css={styles.span}>{CONTINUE}</p>
        {[...Array(totalPages).keys()].map((element, index) =>
          index == totalPages - 1 ||
          index == totalPages - 2 ||
          index == totalPages - 3 ||
          index == totalPages - 4 ? (
            <ButtonPagination
              page={page}
              element={element}
              clickHandler={setPage}
              scrollToTop={scrollToTop}
            />
          ) : null,
        )}
        {!lastPage && (
          <StepButtonPagination
            page={page}
            clickHandler={nextPage}
            scrollToTop={scrollToTop}
            src={next}
            alt={STEP_NEXT}
          />
        )}
      </div>
    </>
  );
};

export default Pagination;
