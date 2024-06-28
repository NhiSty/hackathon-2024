"use client";
import { useState } from "react";
import { Navbar } from "./_components/navbar";
import { TabViewer } from "./_views/viewer";


export default function Home() {
  const [table, setTable] = useState(1);

  const goStat = () => {
    window.location.href = "/stat";
  }

  return (
    <div className="flex flex-col min-h-screen p-8">
      <div className="container w-full px-4 mx-auto max-w-screen-2xl sm:px-8">
        <div className="px-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <Navbar onTableChange={setTable} table={table} />
            <TabViewer table={table} />
          </div>
        </div>
       <div className="flex flex-row items-center justify-center w-full h-full">
       <button onClick={generateRandomQuestion} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        générer une question
        </button>
        <button onClick={goStat} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Voir les stats
        </button>
        </div>
      </div>
    </div>
  );
}


async function generateRandomQuestion() {
  await fetch(`http://localhost:8000/api/v1/`,{
    method: 'POST',
  });
}