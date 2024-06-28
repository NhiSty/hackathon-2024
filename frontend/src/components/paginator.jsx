import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export function Pagination({ totalItems, itemsPerPage, startIndex, endIndex, setStartIndex, setEndIndex, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  // Using `useMemo` to avoid recalculating the total number of pages on every render-cycle
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  const changePage = (next, newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage);
    }

    if (!next) {
      setStartIndex(startIndex-itemsPerPage)
      setEndIndex(endIndex-itemsPerPage)
    } else {
      setStartIndex(startIndex+itemsPerPage)
      setEndIndex(endIndex+itemsPerPage)
    }
  };

  return (


    <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
      <div className="grid grid-cols-3">
        {currentPage > 1 && (
          <button
            type="button"
            className="w-full p-3 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100 col-start-1 col-end-1"
            onClick={() => changePage(false, currentPage - 1)}
          >
            <ChevronLeftIcon className="size-4" />
          </button>
        )}

          <button
            key={currentPage}
            type="button"
            className={cn(
              "w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100",
                "text-indigo-500 col-start-2 col-end-2"
            )}
          >
            {currentPage}
          </button>
        {currentPage < totalPages && (
          <button
            type="button"
            className="w-full p-3 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100 col-start-3 col-end-3"
            onClick={() => changePage(true, currentPage + 1)}
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
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  setStartIndex: PropTypes.func.isRequired,
  setEndIndex: PropTypes.func.isRequired
};
