import PropTypes from "prop-types";
import { Table1 } from "./table1.jsx";
import { Table2 } from "./table2.jsx";
import { Table3 } from "./table3.jsx";
import { Table4 } from "./table4.jsx";

export function TabViewer({ table }) {
  switch (table) {
    case 1:
      return <Table1 />;
    case 2:
      return <Table2 />;
    case 3:
      return <Table3 />;
    case 4:
      return <Table4 />;
    default:
      return <p>Table not found</p>;
  }
}

TabViewer.propTypes = {
  table: PropTypes.number.isRequired,
};
