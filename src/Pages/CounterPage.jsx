import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Decrement, Increment, Reset } from "../Redux/Action";

const CounterPage = () => {
  const { count } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Counter Page</h1>
        <h2 className="text-2xl font-semibold text-blue-500 mb-6">{count}</h2>
        <div className="space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={() => dispatch(Increment())}
          >
            Increment
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={() => dispatch(Decrement())}
          >
            Decrement
          </button>
        </div>
        <button
          className="mt-6 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          onClick={() => dispatch(Reset())}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CounterPage;
