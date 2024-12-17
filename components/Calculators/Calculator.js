"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(1000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [months, setMonths] = useState(12);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const emi =
      loanAmount *
      monthlyRate *
      (Math.pow(1 + monthlyRate, months) /
        (Math.pow(1 + monthlyRate, months) - 1));
    const totalAmount = emi * months;
    const totalInterest = totalAmount - loanAmount;

    return {
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    };
  };

  const { emi, totalInterest, totalAmount } = calculateEMI();

  const updateChart = () => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Principal", "Interest"],
        datasets: [
          {
            data: [loanAmount, parseFloat(totalInterest)],
            backgroundColor: ["#22a7f0", "#e9ebec"],
            hoverBackgroundColor: ["#22a7f0", "#e9ebec"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        cutout: "50%", // This makes the chart a donut chart
      },
    });
  };

  useEffect(() => {
    updateChart();
  }, [loanAmount, interestRate, months]);

  return (
    <div className="mx-auto grid w-11/12 gap-4 py-12 lg:grid-cols-2">
      <div className="rounded-lg border bg-white p-8 shadow-lg">
        <div className="mb-6">
          <label className="mb-2 block text-lg font-semibold text-gray-700">
            Loan Amount:
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="1000"
              max="10000000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-blue-200"
            />
            <input
              type="text"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
              className="w-24 rounded-lg border border-blue-300 p-1 text-center"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-lg font-semibold text-gray-700">
            Interest Rate (p.a.):
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="30"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-blue-200"
            />
            <input
              type="text"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-24 rounded-lg border border-blue-300 p-1 text-center"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-lg font-semibold text-gray-700">
            Months to Pay:
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="1"
              max="360"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-blue-200"
            />
            <input
              type="text"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
              className="w-24 rounded-lg border border-blue-300 p-1 text-center"
            />
          </div>
        </div>
      </div>
      <div className=" grid rounded-lg border bg-white p-8 shadow-lg lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700">
                Monthly EMI
              </span>
              <span className="text-lg font-semibold text-gray-700">
                ₹{emi}
              </span>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700">
                Principal Amount
              </span>
              <span className="text-lg font-semibold text-gray-700">
                ₹{loanAmount}
              </span>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700">
                Total Interest
              </span>
              <span className="text-lg font-semibold text-gray-700">
                ₹{totalInterest}
              </span>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700">
                Total Amount
              </span>
              <span className="text-lg font-semibold text-gray-700">
                ₹{totalAmount}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <canvas ref={chartRef} width="200" height="200"></canvas>
        </div>
      </div>
    </div>
  );
}
