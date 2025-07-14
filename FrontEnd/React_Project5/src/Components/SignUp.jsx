import React from "react";
import { useForm } from "react-hook-form";
import api from "../APIs/api";
const SignUp = () => {
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      UserName: "",
      Email: "",
      Password: "",
      PhoneNumber: "",
    },
    mode: "onTouched",
  });
  const password = watch("Password");
  const SignupHandler = async (data) => {
    const { UserName, Email, Password, PhoneNumber } = data;
    const sendData = {
      UserName,
      Email,
      Password,
      PhoneNumber,
    };
    console.log(sendData);
    try {
      const response = await api.post("/auth/signup", sendData);
      reset();
      if (response.data) {
        navigate("/login");
      }
    } catch (error) {
      // Add an error programmatically by using the setError function provided by react-hook-form
      //setError(keyword,message) => keyword means the name of the field where I want to show the error
      console.log(error);

      if (
        error?.response?.data?.message === "Error: UserName is already taken!"
      ) {
        setError("UserName", { message: "UserName is already taken" });
      } else if (
        error?.response?.data?.message === "Error: Email is already in use!"
      ) {
        setError("email", { message: "Email is already in use" });
      }
    }
  };
  return (
    <div className="min-w-full h-screen flex justify-center items-center flex-col">
      <div className="dark:bg-gray-950 bg-slate-100 px-8 py-10 rounded-3xl shadow-2xl">
        <h3 className="dark:text-white text-black text-4xl font-bold ">
          Register
        </h3>
        <form
          className="flex flex-col space-y-4 mt-5"
          onSubmit={handleSubmit(SignupHandler)}
        >
          <input
            {...register("UserName", {
              minLength: { value: 4, message: "Name must have 4 letters" },
              maxLength: {
                value: 15,
                message: "Name should only have 15 letters",
              },
              required: { value: true, message: "UserName is required" },
            })}
            placeholder="Name"
            className="placeholder-slate-500 border-1 border-slate-500 py-3 px-2 w-72 text-black dark:text-white"
          />
          {errors.UserName && (
            <span className="text-red-500 text-sm">
              {errors.UserName.message}
            </span>
          )}
          <input
            {...register("Email", {
              required: { value: true, message: "Email is required" },
              minLength: { value: 4, message: "Email must have 4 letters" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="Email"
            className="placeholder-slate-500 border-1 border-slate-500 py-3 px-2 w-72  text-black dark:text-white"
          />
          {errors.Email && (
            <span className="text-red-500 text-sm">{errors.Email.message}</span>
          )}
          <input
            {...register("PhoneNumber", {
              required: { value: true, message: "Phone number is required" },
              pattern: {
                value: /^[0-9]{10}$/, // exactly 10 digits
                message: "Phone number must be exactly 10 digits",
              },
            })}
            placeholder="Phone Number"
            className="placeholder-slate-500 border-1 border-slate-500 py-3 px-2 w-72 text-black dark:text-white"
          />

          {errors.PhoneNumber && (
            <span className="text-red-500 text-sm">
              {errors.PhoneNumber.message}
            </span>
          )}

          <input
            {...register("Password", {
              required: { value: true, message: "Password is required" },
              pattern: {
                value: "^(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]+$",
                message:
                  "Password must contain at least one uppercase letter, one number, and one special character (e.g., @, $, !, %, , ?, &).",
              },
              minLength: {
                value: 8,
                message: "Password should have atleast 8 characters",
              },
              maxLength: {
                value: 15,
                message: "Password should only have 15 characters",
              },
            })}
            placeholder="Password"
            type="password"
            className="placeholder-slate-500 border-1 border-slate-500 py-3 px-2 w-72  text-black dark:text-white"
          />
          {errors.Password && (
            <span className="text-red-500 text-sm">
              {errors.Password.message}
            </span>
          )}
          <input
            {...register("cpassword", {
              required: {
                value: true,
                message: "Confrim Password is requrired",
              },
              validate: (value) => {
                value === password || "Passwords do not match";
              },
            })}
            placeholder="Confrim Password"
            type="password"
            className="placeholder-slate-500 border-1 border-slate-500 py-3 px-2 w-72  text-black dark:text-white"
          />
          {errors.cpassword && (
            <span className="text-red-500 text-sm">
              {errors.cpassword.message}
            </span>
          )}
          <button
            type="sumbit"
            className="bg-zinc-800 dark:bg-white  rounded-3xl text-white dark:text-black hover:opacity-50 hover:dark:opacity-50 py-2 px-3 md:px-10"
          >
            SignUP
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
