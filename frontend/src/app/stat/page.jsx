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
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);


console.log("---------->",data.ratingBetweenSixAndTen)

  const goHome = () => {
    window.location.href = "/";
  }

//  setLoading(false);

  return (
    <div className="flex flex-col min-h-screen p-8">
      <div className="container flex flex-col flex-1 w-full gap-12 px-4 mx-auto max-w-screen-2xl sm:px-8">
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
            <Loader className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="mt-4 text-gray-500">Notre IA traite les données ...</p>
          </div>
        ) : (
          <>
            <section className="flex flex-col min-w-full md:flex-row gap-7">
              <div className="flex-1 px-4 bg-white rounded-lg shadow">
                <div className="flex flex-col gap-2 p-4">
                  <div className="text-xl font-semibold">number Of Rating Questions</div>
                  <div className="text-4xl font-bold text-center text-blue-500">
                    {data.numberOfRatingQuestions}
                  </div>
                </div>
              </div>

              <div className="flex-1 px-4 bg-white rounded-lg shadow">
                <div className="flex flex-col gap-2 p-4">
                  <div className="text-xl font-semibold">number Of Rating Questions With Answer</div>
                  <div className="text-4xl font-bold text-center text-blue-500">
                    {data.numberOfRatingQuestionsWithAnswer}
                  </div>
                </div>
              </div>

              {/* <div className="flex-1 px-4 bg-white rounded-lg shadow">
                <div className="flex flex-col gap-2 p-4">
                  <div className="text-xl font-semibold">Total Comments</div>
                  <div className="text-4xl font-bold text-center text-blue-500">
                    {data.totalComments}
                  </div>
                </div>
              </div> */}
            </section>

            <section className="flex flex-row items-center justify-center flex-1 min-w-full gap-4 p-4 bg-white rounded-lg shadow">
              <StatsChart data={data} />
            </section>
            <section className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow">
            <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <tbody>
            {data.ratingBetweenSixAndTen.map((item) => {
                return (
                  <tr className="bg-white border-b ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {item.question}
                    </th>
                    <th className="px-6 py-4">
                        {item.answer}
                    </th>
                    <td className="px-6 py-4">
                        {item.simplifiedRatingAnswer}
                    </td>
                  </tr>
                )
              })}
              {data.ratingBetweenZeroAndFive.map((item) => {
                return (
                  <tr className="bg-white border-b ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {item.question}
                    </th>
                    <th className="px-6 py-4">
                        {item.answer}
                    </th>
                    <td className="px-6 py-4">
                        {item.simplifiedRatingAnswer}
                    </td>
                  </tr>
                )
              })}
        </tbody>
    </table>
</div>
              </section>
          </>
        )}
      </div>
    </div>
  );
}
