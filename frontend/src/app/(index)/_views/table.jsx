import { Pagination } from "@/components/paginator";
import { TableItem } from "../_components/table_item";
import { useCallback, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../_components/modal";

export function Table({ data }) {
  const colClasses =
    "px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200";

  const [showModal, setShowModal] = useState(false);

  const onAction = useCallback((params) => {
    switch (params.action) {
      case "showMessage":
        setShowModal(true);
        break;
      default:
        break;
    }
  }, []);

  const onModalStateChange = useCallback((state) => {
    if (!state) {
      setShowModal(false);
      console.log("modal closed");
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
              Etape
            </th>
            <th scope="col" className={colClasses}>
              Protocol
            </th>
            <th scope="col" className={colClasses}>
              Tél. Portable
            </th>
            <th scope="col" className={colClasses}>
              Suivi SMS
            </th>
            <th scope="col" className={colClasses}>
              Date de référence
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

      <Modal open={showModal} openChange={onModalStateChange}>
        <ModalHeader>John Doe</ModalHeader>

        <ModalContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 rounded-md bg-gray-300 p-3">
              <label className="block text-sm font-medium text-gray-700">
                Question
              </label>
              <p className="mt-1 text-sm text-gray-900">What is your name?</p>
            </div>

            <div className="col-span-2 col-start-2 rounded-md bg-blue-300 p-3">
              <label className="block text-sm font-medium text-gray-700">
                Answer
              </label>
              <p className="mt-1 text-sm text-gray-900">My name is John Doe.</p>
            </div>
          </div>
        </ModalContent>

        <ModalFooter>
          <button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
            Close
          </button>
        </ModalFooter>
      </Modal>

      <Pagination
        totalItems={55}
        itemsPerPage={10}
        onPageChange={(page) => {}}
      />
    </>
  );
}
