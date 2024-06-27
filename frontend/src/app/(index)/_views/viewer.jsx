import PropTypes from "prop-types";
import { Table } from "./table.jsx";
import { useEffect, useState, useMemo } from "react";
import { fetchUsersData } from "@/api/user.js";

export function TabViewer({ table }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersData()
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

// urgence
function Table1({ data }) {
  const transformedData = useMemo(() => {
    return data.filter(user => user?.category === 'URGENCE');
  
  }, [data]);
  
  return <Table data={transformedData} />;
}

//ATTENTION REQUISE
function Table2({ data }) {
  const transformedData = useMemo(() => {
    return data.filter(user => user?.category === 'ATTENTION REQUISE');
  }, [data]);

  return <Table data={transformedData} />;
}

// TVB
function Table3({ data }) {
  const transformedData = useMemo(() => {
    return data.filter(user => user?.category === 'TVB');
    
  }, [data]);

  return <Table data={transformedData} />;
}

// N/A
function Table4({ data }) {
  const transformedData = useMemo(() => {
    return data.filter(user => user?.category ===  'N/A');
  }, [data]);

  return <Table data={transformedData} />;
}