"use client"
import { kpi } from "@/api/kpi.js";
import { StatsChart } from "./_chart.jsx";
import { useState, useEffect } from "react";

export default function MaPage() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        kpi()
            .then((data) => setData(data))
            .catch((err) => console.log(err));
    }
    , []);

    console.log("-------------->data", data)


  return (
    <div className="p-8 min-h-screen flex flex-col">
      <div className="container px-4 mx-auto w-full max-w-screen-2xl sm:px-8 flex flex-col gap-12 flex-1">
        <header className="text-2xl font-semibold">Statistique</header>

        <section className="flex flex-col md:flex-row gap-7 min-w-full">
          <div className="shadow px-4 bg-white rounded-lg flex-1">
            <div className="flex flex-col gap-2 p-4">
              <div className="text-xl font-semibold">Total Users</div>
              <div className="text-4xl font-bold text-center text-blue-500">
                1000
              </div>
            </div>
          </div>

          <div className="shadow px-4 bg-white rounded-lg flex-1">
            <div className="flex flex-col gap-2 p-4">
              <div className="text-xl font-semibold">Total Posts</div>
              <div className="text-4xl font-bold text-center text-blue-500">
                1000
              </div>
            </div>
          </div>

          <div className="shadow px-4 bg-white rounded-lg flex-1">
            <div className="flex flex-col gap-2 p-4">
              <div className="text-xl font-semibold">Total Comments</div>
              <div className="text-4xl font-bold text-center text-blue-500">
                1000
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center items-center gap-4 min-w-full rounded-lg shadow p-4 bg-white flex-1">
          <StatsChart />
        </section>
      </div>
    </div>
  );
}
