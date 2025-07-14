import React from "react";
import { useMycontext } from "../APIs/ContextApi";
import { useNavigate } from "react-router-dom";
const Result = () => {
  const { image, result, theme, SetImage } = useMycontext();
  const naviagte = useNavigate();
  return (
    <div className="flex flex-col min-w-full h-screen justify-center items-center">
      <img
        src={URL.createObjectURL(image)}
        className="size-96 object-contain"
      />
      <p
        className={`text-2xl mt-5 ${
          result === "FAKE" ? "text-red-500" : "text-green-500"
        }`}
      >
        {result}
      </p>
      <button
        className="mt-5 bg-black dark:bg-white text-white dark:text-black px-10 py-3 rounded-2xl"
        onClick={() => {
          SetImage(null);
          naviagte("/");
        }}
      >
        Test Again
      </button>
    </div>
  );
};

export default Result;
