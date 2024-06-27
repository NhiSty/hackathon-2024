import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export function Pagination({ totalItems, itemsPerPage, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  // Using `useMemo` to avoid recalculating the total number of pages on every render-cycle
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(currentPage + 4, totalPages);
  startPage = Math.max(endPage - 4, 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
      <div className="flex items-center">
        {currentPage > 1 && (
          <button
            type="button"
            className="w-full p-3 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
            onClick={() => changePage(currentPage - 1)}
          >
            <ChevronLeftIcon className="size-4" />
          </button>
        )}

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={cn(
              "w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100",
              {
                "text-indigo-500": pageNumber === currentPage,
                "rounded-r-xl":
                  currentPage === totalPages && pageNumber === totalPages,
                "rounded-l-xl": currentPage === 1 && pageNumber === startPage,
              }
            )}
            onClick={() => changePage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            type="button"
            className="w-full p-3 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
            onClick={() => changePage(currentPage + 1)}
          >
            <ChevronRightIcon className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
