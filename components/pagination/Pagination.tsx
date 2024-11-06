'use client';

import { BOARD_ITEM_COUNT, PAGINATION_MAX_PAGES } from '@/commons/constant';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface IProps {
  totalCount: number;
  currentPage: number;
}

export default function Pagination({ totalCount, currentPage }: IProps) {
  const router = useRouter();

  const [pageRange, setPageRange] = useState(Math.floor((currentPage - 1) / PAGINATION_MAX_PAGES));

  const totalPages = Math.ceil(totalCount / BOARD_ITEM_COUNT);
  const startPage = pageRange * PAGINATION_MAX_PAGES + 1;
  const endPage = Math.min(startPage + PAGINATION_MAX_PAGES - 1, totalPages);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const newPageRange = Math.floor((page - 1) / PAGINATION_MAX_PAGES);

      if (newPageRange !== pageRange) {
        setPageRange(newPageRange);
      }

      router.push(`/board?page=${page}`);
    }
  };

  const handlePreviousPage = () => {
    handlePageClick(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageClick(currentPage + 1);
  };

  const goToFirstPage = () => {
    handlePageClick(1);
  };

  const goToLastPage = () => {
    handlePageClick(totalPages);
  };

  return (
    <div className="flex">
      <button className="text-black disabled:text-gray-400" onClick={goToFirstPage} disabled={currentPage === 1}>
        &laquo;
      </button>

      <button className="text-black disabled:text-gray-400" onClick={handlePreviousPage} disabled={currentPage === 1}>
        &lt;
      </button>

      {endPage - startPage + 1 > 0 &&
        [...Array(endPage - startPage + 1)].map((_, idx) => {
          const page = startPage + idx;
          return (
            <button
              key={page}
              className={`text-black ${page === currentPage ? 'text-black font-bold' : 'text-gray-400'}`}
              onClick={() => handlePageClick(page)}>
              {page}
            </button>
          );
        })}

      <button
        className="text-black disabled:text-gray-400"
        onClick={handleNextPage}
        disabled={currentPage === totalPages || totalPages === 0}>
        &gt;
      </button>

      <button
        className="text-black disabled:text-gray-400"
        onClick={goToLastPage}
        disabled={currentPage === totalPages || totalPages === 0}>
        &raquo;
      </button>
    </div>
  );
}
