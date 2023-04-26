import React from 'react';
import { ButtonPagination, StepButtonPagination } from './ButtonPagination';
import prev from 'images/prev.svg?inline';
import next from 'images/next.svg?inline';
import { STEP_NEXT, STEP_PREV, CONTINUE } from './constants';
import { START_DYNAMIC_PAGINATION } from 'containers/Questions/constants';
import { styles } from './Pagination.styled';
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
  const isLastPage = page === totalPages;
  const isStartPage = page === 1;
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
        </div>
      </>
    );
  }
  if (totalPages > START_DYNAMIC_PAGINATION) {
    return (
      <>
        <div className="df aic jcc">
          {!isStartPage && (
            <StepButtonPagination
              clickHandler={prevPage}
              src={prev}
              scrollToTop={scrollToTop}
              alt={STEP_PREV}
            />
          )}
          {[...Array(totalPages).keys()]
            .slice(page > 2 ? page - 3 : 0, page > 2 ? page + 2 : 5)
            .map((element) => (
              <ButtonPagination
                page={page}
                element={element}
                clickHandler={setPage}
                scrollToTop={scrollToTop}
              />
            ))}
          {!isLastPage && (
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
};

export default Pagination;
