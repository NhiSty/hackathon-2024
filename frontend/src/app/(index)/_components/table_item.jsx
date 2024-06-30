import {
  MessageCircleIcon,
} from "lucide-react";
import PropTypes from "prop-types";

function formatDate(dateStr) {
  let dateObj = new Date(dateStr);
  let year = dateObj.getUTCFullYear();
  let month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2); 
  let day = ('0' + dateObj.getUTCDate()).slice(-2);
  return `${year}/${month}/${day}`;
}

export function TableItem({ data, onAction }) {

  data.birthDate = formatDate(data.birthDate)

    return (
      <tr>
        <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
          <p className="inline-flex gap-1 text-gray-900 whitespace-nowrap">
            <button
              type="button"
              onClick={() => onAction({ action: "showMessage", data: data.id })}
            >
              <MessageCircleIcon className="text-gray-700 size-5" />
            </button>
          </p>
        </td>
  
        <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
          <p className="text-gray-900 whitespace-nowrap text-nowrap">
            {data.cellphone}
          </p>
        </td>
  
        <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
          <span className="relative inline-block px-3 py-1 font-semibold leading-tigh">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full opacity-50"
            ></span>
            <span
              className={`relative p-2 text-white rounded-full ${getCategoryColor(data.category)}`}
            >
              {data.category}
            </span>
          </span>
        </td>
  
        <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
          <p className="text-gray-900 whitespace-nowrap">{data.numOperation}</p>
        </td>
  
        <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
          <p className="text-gray-900 whitespace-nowrap">{data.name}</p>
        </td>
  
        <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
          <p className="text-gray-900 whitespace-nowrap">{data.firstname}</p>
        </td>
  
        <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
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
