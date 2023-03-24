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
          left: 0,
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
        <div className="df aic jcc">
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
              clickHandler={nextPage}
              src={next}
              scrollToTop={scrollToTop}
              alt="next"
            />
          )}
        </div>
      </>
    );
  }
  if (page <= 3 && totalPages > 5) {
    return (
      <>
        <div className="df aic jcc">
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
              clickHandler={nextPage}
              scrollToTop={scrollToTop}
              src={next}
              alt="next"
            />
          )}
        </div>
      </>
    );
  }
  if (isDesktop450 && page > 3 && page < totalPages - 3) {
    return (
      <>
        <div className="df aic jcc">
          <StepButtonPagination
            clickHandler={prevPage}
            src={prev}
            scrollToTop={scrollToTop}
            alt="prev"
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
              clickHandler={nextPage}
              scrollToTop={scrollToTop}
              src={next}
              alt="next"
            />
          )}
        </div>
      </>
    );
  }
  if (page > 3 && page < totalPages - 3) {
    return (
      <>
        <div className="df aic jcc">
          <StepButtonPagination
            clickHandler={prevPage}
            scrollToTop={scrollToTop}
            src={prev}
            alt="prev"
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
              clickHandler={nextPage}
              scrollToTop={scrollToTop}
              src={next}
              alt="next"
            />
          )}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="df aic jcc">
        <StepButtonPagination
          clickHandler={prevPage}
          scrollToTop={scrollToTop}
          src={prev}
          alt="prev"
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
        <p css={css(styles.span)}>...</p>
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
            clickHandler={nextPage}
            scrollToTop={scrollToTop}
            src={next}
            alt="next"
          />
        )}
      </div>
    </>
  );
};

export default Pagination;
