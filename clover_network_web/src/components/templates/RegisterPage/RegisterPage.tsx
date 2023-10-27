import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Helmet, HelmetProvider } from "react-helmet-async";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FcGoogle } from "react-icons/fc";
import { AiFillCalendar } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { usePostRegister } from "@/hook";

const RegisterPage = () => {
  const registerApi = usePostRegister();

  const [startDate, setStartDate] = useState(new Date());

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    defaultValues: {
      dayOfBirth: startDate.toISOString().split("T")[0],
    },
  });

  const handleSetDate = (date: Date) => {
    if (date < new Date()) {
      setStartDate(date);
    } else {
      toast.warning("Please choose the correct date of birth!");
    }
    setValue("dayOfBirth", date.toISOString().split("T")[0]);
  };

  const handleRegister = (data: RegisterType) => {
    registerApi.mutate(data, {
      onSuccess(data) {
        if (data.data.messageEN === "Action success") {
          toast.success("Sign up successful, please confirm email!");
          return;
        }
        if (data.data.messageEN === "Existed user ") {
          toast.error("Sign up failed, account already exists!");
          return;
        }
      },
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <section className="grid grid-cols-12 text-textPrimaryColor h-screen lg:h-auto">
        <div className="w-full h-screen bg-[url('../../banner.png')] bg-repeat col-span-6 hidden lg:block"></div>
        <div className="lg:px-32 lg:py-8 md:p-20 p-8 flex flex-col justify-center col-span-full lg:col-span-6">
          <div className="flex items-center justify-center gap-3 mb-5">
            <figure className="w-20 h-20 p-3 border border-secondColor rounded-full">
              <img src="logo.png" alt="logo" />
            </figure>
            <h1 className="text-5xl font-semibold text-primaryColor">Clover</h1>
          </div>
          <h1 className="mx-auto mb-10 text-3xl font-semibold text-primaryColor">
            Register now!
          </h1>
          <form className="mb-6">
            <div className="flex gap-5 mb-5">
              <div className="w-full">
                <input
                  type="text"
                  id="firstname"
                  {...register("firstname", {
                    required: true,
                    minLength: 2,
                  })}
                  className={`w-full px-3 py-4 border border-thirdColor rounded-lg outline-none ${
                    errors.firstname
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white border border-thirdColor"
                  }`}
                  placeholder="First Name"
                />
                {errors.firstname?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Please enter a firstname!
                  </p>
                )}
                {errors.firstname?.type === "minLength" && (
                  <p className="mt-2 text-sm text-red-600">
                    Please enter a minimum of 2 characters!
                  </p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="text"
                  id="lastname"
                  {...register("lastname", {
                    required: true,
                    minLength: 2,
                  })}
                  className={`w-full px-3 py-4 border border-thirdColor rounded-lg outline-none ${
                    errors.lastname
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white border border-thirdColor"
                  }`}
                  placeholder="Last Name"
                />
                {errors.lastname?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Please enter a lastname!
                  </p>
                )}
                {errors.lastname?.type === "minLength" && (
                  <p className="mt-2 text-sm text-red-600">
                    Please enter a minimum of 2 characters!
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5">
              <input
                type="text"
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
            <div className="mb-5">
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: true,
                  // pattern:
                  //   /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/,
                })}
                autoComplete="on"
                className={`w-full px-3 py-4 border border-thirdColor rounded-lg outline-none ${
                  errors.password
                    ? "bg-red-50 border-red-500 placeholder-red-400"
                    : "bg-white border border-thirdColor"
                }`}
                placeholder="New Password"
              />
              {errors.password?.type === "required" && (
                <p className="mt-2 text-sm text-red-600">
                  Please enter password!
                </p>
              )}
              {/* {errors.password?.type === "pattern" && (
                <p className="mt-2 text-sm text-red-600">
                  Vui lòng nhập đúng định dạng mật khẩu!
                  <br />
                  Bao gồm ít nhất 8 ký tự, 1 chữ cái viết thường, 1 chữ cái viết
                  hoa và 1 chữ số!
                </p>
              )} */}
            </div>
            <div className="block sm:flex items-center gap-5 mb-16">
              <div className="w-full relative mb-5 sm:mb-0">
                <label htmlFor="datePicker">
                  <p className="mb-2">Date of birth</p>
                  <DatePicker
                    id="datePicker"
                    className={`text-sm text-gray-500 w-full px-3 py-4 border border-thirdColor rounded-lg outline-none`}
                    wrapperClassName="w-full"
                    dayClassName={(date) =>
                      startDate &&
                      date.toDateString() === startDate.toDateString()
                        ? "bg-primaryColor hover:bg-secondColor"
                        : ""
                    }
                    selected={startDate}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onChange={(date: Date) => handleSetDate(date)}
                  />
                </label>
                <AiFillCalendar className="absolute top-12 right-5 text-2xl text-primaryColor" />
              </div>
              <div className="w-full">
                <p className="mb-2">Gender</p>
                <div className="flex items-center justify-center gap-4 py-4 border border-secondColor rounded-lg">
                  <label htmlFor="male" className="flex gap-3 items-center">
                    <input
                      type="radio"
                      id="male"
                      {...register("gender", {
                        required: true,
                      })}
                      value={0}
                      className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-4px] after:left-[-2px] after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-4px] checked:after:left-[-2px] checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
                    />
                    <span
                      className={`text-sm ${
                        errors.gender ? "text-red-600" : "text-gray-500"
                      }`}
                    >
                      Male
                    </span>
                  </label>
                  <span className="h-6 bg-secondColor w-px"></span>
                  <label htmlFor="female" className="flex gap-3 items-center">
                    <input
                      type="radio"
                      id="female"
                      {...register("gender", {
                        required: true,
                      })}
                      value={1}
                      className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-4px] after:left-[-2px] after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-4px] checked:after:left-[-2px] checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
                    />
                    <span
                      className={`text-sm ${
                        errors.gender ? "text-red-600" : "text-gray-500"
                      }`}
                    >
                      Female
                    </span>
                  </label>
                  <span className="h-6 bg-secondColor w-px"></span>
                  <label htmlFor="other" className="flex gap-3 items-center">
                    <input
                      type="radio"
                      id="other"
                      {...register("gender", {
                        required: true,
                      })}
                      value={2}
                      className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-4px] after:left-[-2px] after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-4px] checked:after:left-[-2px] checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
                    />
                    <span
                      className={`text-sm ${
                        errors.gender ? "text-red-600" : "text-gray-500"
                      }`}
                    >
                      Other
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <button
              className="flex items-center justify-center min-h-[58px] w-full px-3 py-4 bg-primaryColor rounded-lg text-white font-semibold shadow-formButton hover:opacity-90"
              onClick={handleSubmit(handleRegister)}
            >
              {registerApi.isLoading ? (
                <BiLoaderAlt className="text-3xl animate-spin" />
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          <div>
            <span>Already have account ?</span>
            <Link to={"/login"} className="font-semibold ml-2 hover:opacity-90">
              Sign in
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

export default RegisterPage;
