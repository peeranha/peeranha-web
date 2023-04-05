import { useState, useEffect } from 'react';
import createdHistory from 'createdHistory';

type PaginationPropsType = {
  contentPerPage: number;
  count: number;
};

type PaginationType = {
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (num: number) => void;
  firstContentIndex: number;
  lastContentIndex: number;
  page: number;
};

const usePagination = ({ contentPerPage, count }: PaginationPropsType): PaginationType => {
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    const currentPage = Number(createdHistory.location.pathname.slice(-1));
    setPage(currentPage > 1 ? currentPage : 1);
  }, [createdHistory.location.pathname]);

  const pageCount = Math.ceil(count / contentPerPage);

  const lastContentIndex = page * contentPerPage;

  const firstContentIndex = lastContentIndex - contentPerPage;

  const changePage = (direction: boolean) => {
    setPage((state) => {
      if (direction && state !== pageCount) {
        return state + 1;
      } else if (!direction && state !== 1) {
        return state - 1;
      }

      return state;
    });
  };
  const setPageSAFE = (num: number) => {
    if (num > pageCount) {
      setPage(pageCount);
    } else if (num < 1) {
      setPage(1);
    } else {
      setPage(num);
    }
  };
  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
  };
};
export default usePagination;
