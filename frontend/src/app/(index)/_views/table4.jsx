import { Pagination } from "@/components/paginator";
import {
  CircleIcon,
  DownloadIcon,
  EyeIcon,
  HourglassIcon,
  ImageIcon,
  InfoIcon,
  MessageCircleIcon,
  PauseIcon,
  PenIcon,
  PlayIcon,
  Trash2Icon,
} from "lucide-react";

export function Table4() {
  return (
    <>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
            >
              <span className="sr-only">Actions</span>
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
            >
              Etape
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
            >
              Protocol
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200 whitespace-nowrap"
            >
              Tél. Portable
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
            >
              Suivi SMS
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-sm font-normal text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
            >
              Date de référence
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
            >
              Etat
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-sm font-normal text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
            >
              Numéro d'opération
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
            >
              Nom
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
            >
              Prénom
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
            >
              Date de naissance
            </th>
          </tr>
        </thead>
        <tbody className="overflow-x-auto">
          {Array.from({ length: 10 }, (_, i) => (
            <tr key={i}>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-nowrap inline-flex gap-1">
                  <button type="button">
                    <CircleIcon className="fill-red-500 text-red-500 size-5" />
                  </button>
                  <button type="button">
                    <Trash2Icon className="text-gray-700 size-5" />
                  </button>
                  <button type="button">
                    <PenIcon className="text-gray-700 size-5" />
                  </button>
                  <button type="button">
                    <PauseIcon className="text-gray-700 size-5" />
                  </button>
                  <button type="button">
                    <PlayIcon className="text-gray-700 size-5" />
                  </button>
                  <button type="button">
                    <MessageCircleIcon className="text-gray-700 size-5" />
                  </button>
                  <button type="button">
                    <DownloadIcon className="text-gray-700 size-5" />
                  </button>
                  <button type="button">
                    <EyeIcon className="text-gray-700 size-5" />
                  </button>
                  <button type="button">
                    <ImageIcon className="text-gray-700 size-5" />
                  </button>
                  <button type="button">
                    <HourglassIcon className="text-gray-700 size-5" />
                  </button>
                  <button type="button">
                    <InfoIcon className="text-gray-700 size-5" />
                  </button>
                </p>
              </td>

              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-nowrap text-center">
                  J+1
                </p>
              </td>

              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-nowrap text-center">
                  Test classique
                </p>
              </td>

              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-nowrap text-nowrap">
                  06 00 00 00 00
                </p>
              </td>

              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-nowrap">Ok</p>
              </td>

              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900">
                  <time
                    dateTime="2020-09-12 12:00"
                    className="text-center whitespace-nowrap"
                  >
                    12/09/2020 12:00
                  </time>
                </p>
              </td>

              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-green-700 rounded-full opacity-50"
                  ></span>
                  <span className="relative text-white">TVB</span>
                </span>
              </td>

              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-nowrap">1</p>
              </td>

              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-nowrap">Doe</p>
              </td>

              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-nowrap">John</p>
              </td>

              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-nowrap">
                  <time dateTime="2020-01-07">07/01/2020</time>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={55}
        itemsPerPage={10}
        onPageChange={(page) => {}}
      />
    </>
  );
}
