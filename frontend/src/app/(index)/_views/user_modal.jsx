import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../_components/modal";
import { fetchUser } from "@/api/user";

export function UserModal({ userId, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const onModalStateChange = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      setLoading(true);

      try {
        const response = await fetchUser(userId);
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("Error fetching user:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Modal open={userId} openChange={onModalStateChange}>
      {loading ? (
        <>
          <ModalHeader>Loading...</ModalHeader>

          <ModalContent>
            <div className="flex justify-center">
              <div className="w-6 h-6 border-2 border-t-2 border-gray-400 rounded-full animate-spin"></div>
            </div>

            <p className="text-center text-gray-700">Fetching user data...</p>
          </ModalContent>

          <ModalFooter>
            <button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-300 border border-transparent rounded-md cursor-not-allowed" onClick={onModalStateChange}>
              Close
            </button>
          </ModalFooter>
        </>
      ) : (
        data && (
          <>
            <ModalHeader>
              {data.firstName} - {data.name} <br></br> {data.confidence} de confiance
            </ModalHeader>

            <ModalContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 p-3 bg-gray-300 rounded-md">
                  <p className="mt-1 text-sm text-gray-900">{data.question}</p>
                </div>

                <div className="col-span-2 col-start-2 p-3 bg-blue-300 rounded-md justify-self-end">
                  <p className="mt-1 text-sm text-gray-900 text-end">{data.response}</p>
                </div>

                <div className="col-span-2 col-start-2 justify-self-end">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-900 bg-orange-300 rounded-full">{data.simplifiedMessages}</span>
                </div>
              </div>
            </ModalContent>

            <ModalFooter>
              <button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" onClick={onModalStateChange}>
                Close
              </button>
            </ModalFooter>
          </>
        )
      )}
    </Modal>
  );
}

UserModal.propTypes = {
  userId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};
