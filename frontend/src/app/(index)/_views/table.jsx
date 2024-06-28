import { Pagination } from "@/components/paginator";
import { TableItem } from "../_components/table_item";
import { useCallback, useState } from "react";
import { UserModal } from "./user_modal";
import PropTypes from "prop-types";

export function Table({ data }) {
  const rowPerPage = 5
  const [modalData, setModalData] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowPerPage);

  const colClasses =
    "px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200";

  const onAction = useCallback((params) => {
    switch (params.action) {
      case "showMessage":
        setModalData(params.data);
        break;
      default:
        break;
    }
  }, []);



  return (
    <>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th scope="col" className={colClasses}>
              <span className="col">Actions</span>
            </th>
            <th scope="col" className={colClasses}>
              Tél. Portable
            </th>
            <th scope="col" className={colClasses}>
              Etat
            </th>
            <th scope="col" className={colClasses}>
              Numéro d'opération
            </th>
            <th scope="col" className={colClasses}>
              Nom
            </th>
            <th scope="col" className={colClasses}>
              Prénom
            </th>
            <th scope="col" className={colClasses}>
              Date de naissance
            </th>
          </tr>
        </thead>
        <tbody className="overflow-x-auto">
          {data.slice(startIndex, endIndex).map((item, i) => (
            <TableItem key={i} data={item} onAction={onAction} />
          ))}
        </tbody>
      </table>

      <UserModal userId={modalData} onClose={() => setModalData(null)} />

      <Pagination
        totalItems={data.length}
        itemsPerPage={rowPerPage}
        startIndex={startIndex}
        endIndex={endIndex}
        setStartIndex={setStartIndex}
        setEndIndex={setEndIndex}
        onPageChange={() => {}}
      />

    </>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
};
