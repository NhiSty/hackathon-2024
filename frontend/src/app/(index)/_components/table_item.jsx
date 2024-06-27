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
import PropTypes from "prop-types";

export function TableItem({ data, onAction }) {
  return (
    <tr>
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
          <button
            type="button"
            onClick={() => onAction({ action: "showMessage", data: data.id })}
          >
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
        <p className="text-gray-900 whitespace-nowrap text-nowrap">
          {data.cellPhone}
        </p>
      </td>

      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 rounded-full opacity-50"
          ></span>
          <span className="relative">A FAIRE</span>
        </span>
      </td>

      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-nowrap">{data.numOperation}</p>
      </td>

      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-nowrap">{data.name}</p>
      </td>

      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-nowrap">{data.firstname}</p>
      </td>

      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-nowrap">
          <time dateTime="2020-01-07">{data.birthdDate}</time>
        </p>
      </td>
    </tr>
  );
}

TableItem.propTypes = {
  data: PropTypes.object,
  onAction: PropTypes.func,
};
