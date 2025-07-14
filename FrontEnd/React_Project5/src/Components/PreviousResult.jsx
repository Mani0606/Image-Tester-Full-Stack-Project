import React from "react";
import { useMycontext } from "../APIs/ContextApi";
import { useState, useEffect } from "react";
import api from "../APIs/api";
import { useParams } from "react-router-dom";
const PreviousResult = () => {
  const { id } = useParams();

  const { Tapped } = useMycontext();
  const [details, SetDetails] = useState({});
  const fetch_data = async () => {
    const response = await api.get(`/classify/getDetails/${Tapped}`);
    if (response.status == 200 && response.data) {
      SetDetails(response.data);
    }
  };
  useEffect(() => {
    fetch_data();
  }, [Tapped]);
  return (
    <div className="min-w-full h-screen flex flex-col justify-center items-center shadow-2xl">
      <div className={`flex flex-col space-y-4`}>
        <img
          src={`data:image/png;base64,${details.image_Data}`}
          className="size-96 object-contain"
        />
        <p
          className={`text-2xl mt-5 text-center ${
            details.result === "FAKE" ? "text-red-500" : "text-green-500"
          }`}
        >
          {details.result}
        </p>
      </div>
    </div>
  );
};

export default PreviousResult;
