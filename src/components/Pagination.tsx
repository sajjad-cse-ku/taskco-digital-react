import React from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DOTS = '...';

function getPaginationRange(currentPage: number, totalPages: number, siblingCount = 1, boundaryCount = 1): (number | string)[] {
  // siblingCount: how many pages to show around current page
  // boundaryCount: how many pages to show at start and end

  const totalPageNumbers = siblingCount * 2 + 3 + boundaryCount * 2;
  /*
    Example if siblingCount=1, boundaryCount=1 and totalPages=10,
    totalPageNumbers = 1*2 + 3 + 1*2 = 7
  */

  if (totalPages <= totalPageNumbers) {
    // no need for dots
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaryCount + 2);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - boundaryCount - 1);

  const showLeftDots = leftSiblingIndex > boundaryCount + 2;
  const showRightDots = rightSiblingIndex < totalPages - boundaryCount - 1;

  const firstPages = Array.from({ length: boundaryCount }, (_, i) => i + 1);
  const lastPages = Array.from({ length: boundaryCount }, (_, i) => totalPages - boundaryCount + 1 + i);

  if (!showLeftDots && showRightDots) {
    // left side has no dots, right side has dots
    const leftRange = Array.from({ length: rightSiblingIndex + 1 - boundaryCount }, (_, i) => i + 1);
    return [...leftRange, DOTS, ...lastPages];
  }

  if (showLeftDots && !showRightDots) {
    // right side has no dots, left side has dots
    const rightRange = Array.from({ length: totalPages - boundaryCount - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
    return [...firstPages, DOTS, ...rightRange];
  }

  // both sides have dots
  const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
  return [...firstPages, DOTS, ...middleRange, DOTS, ...lastPages];
}

export const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const paginationRange = getPaginationRange(currentPage, totalPages);

  if (totalPages === 0) return null;

  return (
    <div className="flex justify-center mt-6 space-x-2 select-none">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
      >
        Previous
      </button>

      {paginationRange.map((page, idx) => {
        if (page === DOTS) {
          return (
            <span key={`dots-${idx}`} className="px-3 py-1 text-gray-500">
              &#8230;
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`px-3 py-1 rounded transition
              ${
                page === currentPage
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
      >
        Next
      </button>
    </div>
  );
};
