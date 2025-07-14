import React from "react";
import { ImageUp } from "lucide-react";
import logo from "../assets/image-up.png";
import { useState } from "react";
import { useMycontext } from "../APIs/ContextApi";
import api from "../APIs/api";
import { useNavigate } from "react-router-dom";
const Uplodes = () => {
  const [preview, setPreview] = useState(null);
  const { theme, image, SetImage, token, SetResult } = useMycontext();
  const navigate = useNavigate();
  const [loading, isLoding] = useState(true);

  function onChnageHandler(e) {
    const file = e.target.files[0];
    SetImage(file);

    setPreview(URL.createObjectURL(file));
  }

  const onTest = async () => {
    isLoding(false);
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await api.post("/classify/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: { _csrf: localStorage.getItem("X-XSRF-TOKEN") },
      });
      if (response.status === 200 && response.data.image_type) {
        SetResult(response.data.image_type);
        navigate("/result");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex min-w-full h-screen justify-center items-center flex-col">
      {isLoding ? (
        <>
          <div className="flex justify-center items-center h-96 w-5/6 md:w-2/6 border-2 border-dashed dark:border-white border-black rounded-4xl">
            <label className="w-full h-full flex justify-center items-center overflow-hidden">
              {preview == null ? (
                <div className="flex flex-col justify-center items-center">
                  <ImageUp
                    className=" mx-auto"
                    size={192}
                    color={theme === "white" ? "black" : "white"}
                  />
                  <p className="text-slate-500">Click to upload a image</p>
                </div>
              ) : (
                <>
                  <img src={preview} className="object-contain w-full h-full" />
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onChnageHandler}
              />
            </label>
          </div>
          {image && (
            <div className="mt-4 flex flex-row items-center space-x-4">
              <button
                className="bg-zinc-800 dark:bg-white px-13 rounded-3xl text-white dark:text-black hover:opacity-50 hover:dark:opacity-50 py-2"
                onClick={onTest}
              >
                Test
              </button>
              <button
                onClick={() => {
                  SetImage(null);
                  setPreview(null);
                }}
                className="bg-zinc-800 dark:bg-white px-13 rounded-3xl text-white dark:text-black hover:opacity-50 hover:dark:opacity-50 py-2"
              >
                Cancle
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white">
          <p></p>
        </div>
      )}
    </div>
  );
};

export default Uplodes;
