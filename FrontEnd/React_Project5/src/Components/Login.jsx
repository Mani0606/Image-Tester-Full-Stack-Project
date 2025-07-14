import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMycontext } from "../APIs/ContextApi";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../APIs/api";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });
  const [jwt_token, setJwtToken] = useState("");
  const { token, SetToken } = useMycontext();
  const navigate = useNavigate();
  const handleSuccessfulLogin = (token, decodedToken) => {
    const user = {
      email: decodedToken.sub,
    };
    localStorage.setItem("JWT_TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(user));

    //store the token on the context state  so that it can be shared any where in our application by context provider
    SetToken(token);

    navigate("/");
  };
  const LoginHandler = async (data) => {
    try {
      const response = await api.post("http://localhost:8080/auth/login", data);
      reset();
      if (response.status == 200 && response.data) {
        setJwtToken(response.data);
        const decoded = jwtDecode(jwt_token);
        handleSuccessfulLogin(response.data, decoded);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="min-w-full h-screen flex justify-center items-center fixed inset-0 backdrop-blur-sm">
      <div className="dark:bg-gray-950 bg-slate-100 px-8 py-10 rounded-3xl shadow-2xl">
        <h3 className="dark:text-white text-black text-2xl">
          Login to your Account
        </h3>
        <form
          className="flex flex-col space-y-4 mt-5"
          onSubmit={handleSubmit(LoginHandler)}
        >
          <input
            {...register("email", {
              required: { value: true, message: "Must give your Email" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="Email"
            className="placeholder-slate-500 border-1 border-slate-500 py-3 px-2 w-72  text-black dark:text-white"
          />
          {errors.Email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
          <input
            {...register("password", {
              required: { value: true, message: "Password must be provide" },
            })}
            type="password"
            placeholder="Password"
            className="placeholder-slate-500 border-1 border-slate-500 py-3 px-2 w-72  text-black dark:text-white"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
          <button
            type="sumbit"
            className="bg-zinc-800 dark:bg-white  rounded-3xl text-white dark:text-black hover:opacity-50 hover:dark:opacity-50 py-2 px-3 md:px-10"
          >
            Login
          </button>
        </form>
        <p className="dark:text-white mt-5 text-center text-black">
          don't have an account? then
          <NavLink to={"/signup"}>
            <button> SignUP</button>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
