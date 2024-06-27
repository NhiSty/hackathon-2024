import PropTypes from "prop-types";
import { Table } from "./table.jsx";
import { useEffect, useState } from "react";
import { fetchUsersList } from "@/api/user.js";

export function TabViewer({ table }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersList()
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  switch (table) {
    case 1:
      return <Table1 data={users} />;
    case 2:
      return <Table2 data={users} />;
    case 3:
      return <Table3 data={users} />;
    case 4:
      return <Table4 data={users} />;
    default:
      return <p>Table not found</p>;
  }
}

TabViewer.propTypes = {
  table: PropTypes.number.isRequired,
};

function Table1({ data }) {
  console.log(data);
  return <Table data={data} />;
}

function Table2({ data }) {
  return <Table data={data} />;
}

function Table3({ data }) {
  return <Table data={data} />;
}

function Table4({ data }) {
  return <Table data={data} />;
}
