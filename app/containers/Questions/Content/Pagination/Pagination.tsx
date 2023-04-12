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
  const startPage = page === 1;
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
  if (totalPages <= 4) {
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
        </div>
      </>
    );
  }
  if (totalPages > 4) {
    return (
      <>
        <div className="df aic jcc">
          {!startPage && (
            <StepButtonPagination
              clickHandler={prevPage}
              src={prev}
              scrollToTop={scrollToTop}
              alt="prev"
            />
          )}
          {(page > 2
            ? [...Array(totalPages).keys()].slice(page - 3, page + 2)
            : [...Array(totalPages).keys()].slice(0, 5)
          ).map((element, index) => (
            <ButtonPagination
              page={page}
              element={element}
              clickHandler={setPage}
              scrollToTop={scrollToTop}
            />
          ))}
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
};

export default Pagination;
