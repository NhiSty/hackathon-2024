"use client";
import { kpi } from "@/api/kpi.js";
import { StatsChart } from "./_chart.jsx";
import { useState, useEffect } from "react";
import { Loader } from 'lucide-react';

export default function MaPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    kpi()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const goHome = () => {
    window.location.href = "/";
  }

//  setLoading(false);

  return (
    <div className="p-8 min-h-screen flex flex-col">
      <div className="container px-4 mx-auto w-full max-w-screen-2xl sm:px-8 flex flex-col gap-12 flex-1">
        <header className="text-2xl font-semibold">
            Statistique
            
            <div className="flex flex-row items-center justify-center w-full h-full">
                <button onClick={goHome} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Retour à l'accueil
                </button>
            </div>
        </header>
        

        {loading ? (
          <div className="flex flex-col items-center justify-center flex-1">
            <Loader className="animate-spin w-12 h-12 text-blue-500" />
            <p className="text-gray-500 mt-4">Notre IA traite les données ...</p>
          </div>
        ) : (
          <>
            <section className="flex flex-col md:flex-row gap-7 min-w-full">
              <div className="shadow px-4 bg-white rounded-lg flex-1">
                <div className="flex flex-col gap-2 p-4">
                  <div className="text-xl font-semibold">number Of Rating Questions</div>
                  <div className="text-4xl font-bold text-center text-blue-500">
                    {data.numberOfRatingQuestions}
                  </div>
                </div>
              </div>

              <div className="shadow px-4 bg-white rounded-lg flex-1">
                <div className="flex flex-col gap-2 p-4">
                  <div className="text-xl font-semibold">number Of Rating Questions With Answer</div>
                  <div className="text-4xl font-bold text-center text-blue-500">
                    {data.numberOfRatingQuestionsWithAnswer}
                  </div>
                </div>
              </div>

              {/* <div className="shadow px-4 bg-white rounded-lg flex-1">
                <div className="flex flex-col gap-2 p-4">
                  <div className="text-xl font-semibold">Total Comments</div>
                  <div className="text-4xl font-bold text-center text-blue-500">
                    {data.totalComments}
                  </div>
                </div>
              </div> */}
            </section>

            <section className="flex flex-row justify-center items-center gap-4 min-w-full rounded-lg shadow p-4 bg-white flex-1">
              <StatsChart data={data} />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
