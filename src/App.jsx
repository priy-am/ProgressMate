import React, { useEffect, useState } from "react";
import { SlActionUndo } from "react-icons/sl";
import { SlActionRedo } from "react-icons/sl";

function App() {
  const [num, setNum] = useState(0);
  const [currentValue, setcurrentValue] = useState(num);
  const [history, setHistory] = useState([0]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setcurrentValue(num);
  }, [num]);

  const updateNumber = (value) => {
    let newNum = parseInt(currentValue) + value;
    if (newNum >= 0 && newNum <= 150) {
      setcurrentValue(newNum);
      const newHistory = [...history.slice(0, currentStep + 1), newNum];
      setHistory(newHistory);
      setCurrentStep(newHistory.length - 1);
    }
  };

  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setcurrentValue(history[currentStep - 1]);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      setcurrentValue(history[currentStep + 1]);
    }
  };

  const progressBarWidth = `${(currentValue / 150) * 100}%`;

  return (
    <>
      <div className=" absolute h-full w-full inset-0 -z-10  bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

      <div className="flex flex-col  items-center justify-center h-[75vh] mt-16 w-3/4 mx-auto border-[5px]   rounded-3xl  absolute inset-0 -z-10  bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] ">
        <h1 className="md:text-6xl text-3xl text-[#0f4c5c] font-bold mb-8 font-sans ">
          Progress Bar
        </h1>
        <input
          type="text"
          placeholder="Enter the no. between 1 to 149"
          className="md:w-1/2 w-3/4  px-2 rounded-xl py-4 text-center bg-blue-50"
          onChange={(e) => {
            setNum(e.target.value);
          }}
        />
        {num >= 150 && (
          <div className="text-red-600">
            The number should be between 1 to 149
          </div>
        )}
        {num < 0 && (
          <div className="text-red-600">
            The number should be between 1 to 149
          </div>
        )}
        <div className="flex md:flex-row justify-center items-center gap-4 flex-col md:space-x-4 mb-8 mt-5">
          <button
            type="button"
            onClick={() => updateNumber(-1)}
            className={`text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
              parseInt(currentValue) <= 0 && "opacity-50 cursor-not-allowed"
            } `}
          >
            Predecessor
          </button>
          <div className="number border border-blue-600 w-11 h-11 flex items-center justify-center overflow-hidden">
            {currentValue}
          </div>
          <button
            type="button"
            onClick={() => updateNumber(1)}
            className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
              parseInt(currentValue) >= 150 && "opacity-50 cursor-not-allowed"
            } `}
          >
            Successor
          </button>
        </div>

        <div className="w-3/4 mb-8  bg-gray-200 rounded-full h-2.5 overflow-hidden dark:bg-gray-700">
          <div
            className="bg-purple-600  rounded-full  h-full transition-all duration-500 ease-in-out"
            style={{ width: progressBarWidth }}
          ></div>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={undo}
            disabled={currentStep === 0}
            className={`flex justify-center items-center flex-col gap-1 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
              currentStep === 0 && "opacity-50 cursor-not-allowed"
            }`}
          >
            <span>
              <SlActionUndo size={"17px"} />
            </span>
            <span>Undo</span>
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={currentStep === history.length - 1}
            className={`flex flex-col justify-center items-center gap-1 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
              currentStep === history.length - 1 &&
              "opacity-50 cursor-not-allowed"
            }`}
          >
            <span>
              <SlActionRedo size={"17px"} />
            </span>
            <span>Redo</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
