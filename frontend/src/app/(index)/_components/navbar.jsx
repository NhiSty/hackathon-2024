"use client";
import { cn } from "@/utils/cn";
import PropTypes from "prop-types";

export function Navbar({ onTableChange, table }) {
  const tabNames = ["Urgence", "Attention requise", "TVB", "N/A"];
  const tabDesk = [null, null, "Non analysé", "Tout va bien"];

  return (
    <nav className="flex flex-row gap-4 justify-center w-full border-b border-gray-200 bg-white">
      <div className="text-sm font-medium text-center text-gray-500 mx-auto">
        <ul className="flex flex-wrap -mb-px">
          {tabNames.map((name, i) => (
            <li key={i} className="mr-2">
              <button
                onClick={() => onTableChange(i + 1)}
                className={cn(
                  "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 transition-colors duration-100 hover:bg-blue-200/40",
                  {
                    "border-blue-600 hover:border-blue-600 bg-blue-200/50 hover:bg-blue-200/65":
                      i + 1 === table,
                  }
                )}
                aria-current={i + 1 === table ? "page" : undefined}
                title={tabDesk[i]}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onTableChange: PropTypes.func.isRequired,
  table: PropTypes.number.isRequired,
};
