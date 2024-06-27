import { Pagination } from "@/components/paginator";
import { TableItem } from "../_components/table_item";
import { useCallback, useState } from "react";
import { UserModal } from "./user_modal";
import PropTypes from "prop-types";

export function Table({ data }) {
  const colClasses =
    "px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200";

  console.log(data)
  const [modalData, setModalData] = useState(null);

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
              <span className="sr-only">Actions</span>
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
          {data.map((item, i) => (
            <TableItem key={i} data={item} onAction={onAction} />
          ))}
        </tbody>
      </table>

      <UserModal userId={modalData} onClose={() => setModalData(null)} />

      <Pagination
        totalItems={data.length}
        itemsPerPage={8}
        onPageChange={() => {}}
      />
    </>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
};
