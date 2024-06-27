import {
  CircleIcon,
  HourglassIcon,
  MessageCircleIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react";
import PropTypes from "prop-types";

export function TableItem({ data, onAction }) {
  return (
    <tr>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
        <p className="text-gray-900 whitespace-nowrap inline-flex gap-1">
          <button
            type="button"
            onClick={() => onAction({ action: "showMessage", data: data.id })}
          >
            <MessageCircleIcon className="text-gray-700 size-5" />
          </button>
        </p>
      </td>

      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-nowrap text-nowrap">
          {data.cellphone}
        </p>
      </td>

      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <span className="relative inline-block px-3 py-1 font-semibold leading-tigh">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full opacity-50"
          ></span>
          <span
            className={`relative p-2 text-white rounded-full ${getCategoryColor(data.answers[0].simplifiedIA.category)}`}
          >
            {data.answers[0].simplifiedIA.category}
          </span>
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
          <time dateTime="2020-01-07">{data.birthDate}</time>
        </p>
      </td>
    </tr>
  );
}

TableItem.propTypes = {
  data: PropTypes.object,
  onAction: PropTypes.func,
};

function getCategoryColor(category) {
  switch (category) {
    case "URGENCE":
      return "bg-red-500";
    case "ATTENTION REQUISE":
      return "bg-yellow-500";
    case "TVB":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}
