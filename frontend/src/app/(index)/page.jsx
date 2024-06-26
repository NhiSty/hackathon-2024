"use client";
import { useState } from "react";
import { Navbar } from "./_components/navbar";
import { TabViewer } from "./_views/viewer";

export default function Home() {
  const [table, setTable] = useState(1);

  return (
    <div className="p-8 min-h-screen flex flex-col">
      <div className="container px-4 mx-auto w-full max-w-screen-2xl sm:px-8">
        <div className="px-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <Navbar onTableChange={setTable} table={table} />

            <TabViewer table={table} />
          </div>
        </div>
      </div>
    </div>
  );
}
