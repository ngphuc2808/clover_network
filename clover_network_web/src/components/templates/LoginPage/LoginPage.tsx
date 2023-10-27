import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FcGoogle } from "react-icons/fc";
import { BiLoaderAlt } from "react-icons/bi";

import { usePostLogin } from "@/hook";

const LoginPage = () => {
  const router = useNavigate();

  const isLogin = JSON.parse(localStorage.getItem("userLogin")!);

  const loginApi = usePostLogin();

  useEffect(() => {
    if (isLogin) {
      router("/");
      return;
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const handleLogin = (data: LoginType) => {
    loginApi.mutate(data, {
      onSuccess(data) {
        if (data.data.messageEN === "Action success") {
          localStorage.setItem("userLogin", JSON.stringify(data.data.data));
          router("/");
          return;
        }
        if (data.data.messageEN === "Profile empty ") {
          toast.error("Account not found, please check again!");
          return;
        }
        if (data.data.messageEN === "Email or password is incorrect") {
          toast.error("Wrong email or password, please check again!");
          return;
        }
        toast.error("Please verify email!");
      },
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="grid grid-cols-12 text-textPrimaryColor h-screen lg:h-auto">
        <div className="w-full h-screen bg-[url('../../banner.png')] bg-repeat col-span-6 hidden lg:block"></div>
        <div className="lg:p-32 md:p-20 p-8 flex flex-col justify-center col-span-full lg:col-span-6">
          <div className="flex items-center justify-center gap-3 mb-5">
            <figure className="w-20 h-20 p-3 border border-secondColor rounded-full">
              <img src="../../logo.png" alt="logo" />
            </figure>
            <h1 className="text-5xl font-semibold text-primaryColor">Clover</h1>
          </div>
          <h1 className="mx-auto mb-10 text-3xl font-semibold text-primaryColor">
            Welcome back!
          </h1>
          <form className="mb-6">
            <div className="mb-5">
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: true,
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
                className={`w-full px-3 py-4 border border-thirdColor rounded-lg outline-none ${
                  errors.email
                    ? "bg-red-50 border-red-500 placeholder-red-400"
                    : "bg-white border border-thirdColor"
                }`}
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="mt-2 text-sm text-red-600">Please enter email!</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="mt-2 text-sm text-red-600">
                  Please enter the correct email format!
                </p>
              )}
            </div>
            <div className="mb-16">
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/,
                })}
                autoComplete="on"
                className={`w-full px-3 py-4 border border-thirdColor rounded-lg outline-none ${
                  errors.password
                    ? "bg-red-50 border-red-500 placeholder-red-400"
                    : "bg-white border border-thirdColor"
                }`}
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="mt-2 text-sm text-red-600">
                  Please enter password!
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="mt-2 text-sm text-red-600">
                  Vui lòng nhập đúng định dạng mật khẩu!
                  <br />
                  Bao gồm ít nhất 8 ký tự, 1 chữ cái viết thường, 1 chữ cái viết
                  hoa và 1 chữ số!
                </p>
              )}
            </div>
            <button
              className="flex items-center justify-center min-h-[58px] w-full px-3 py-4 bg-primaryColor rounded-lg text-white font-semibold shadow-formButton hover:opacity-90"
              onClick={handleSubmit(handleLogin)}
            >
              {loginApi.isLoading ? (
                <BiLoaderAlt className="text-3xl animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          <div>
            <span>Don't have account ?</span>
            <Link
              to={"/register"}
              className="font-semibold ml-2 hover:opacity-90"
            >
              Sign up
            </Link>
          </div>
          <div className="flex items-center my-5">
            <span className="flex-1 h-px bg-secondColor opacity-30"></span>
            <p className="px-3 text-secondColor opacity-30 font-semibold">or</p>
            <span className="flex-1 h-px bg-secondColor opacity-30"></span>
          </div>
          <button className="flex items-center justify-center gap-3 w-full px-3 py-4 border rounded-lg font-semibold shadow">
            <FcGoogle className="text-3xl" />
            <p>Continue with Google</p>
          </button>
        </div>
      </section>
    </HelmetProvider>
  );
};

export default LoginPage;
