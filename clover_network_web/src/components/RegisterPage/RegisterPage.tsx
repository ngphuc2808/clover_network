import { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Helmet, HelmetProvider } from "react-helmet-async";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FcGoogle } from "react-icons/fc";
import { AiFillCalendar } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";

import { UsersApi } from "@/services/api/users";

import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const [emptyFirstname, setEmptyFirstname] = useState<boolean>(true);
  const [emptyLastname, setEmptyLastname] = useState<boolean>(true);
  const [emptyEmail, setEmptyEmail] = useState<boolean>(true);
  const [emptyPassword, setEmptyPassword] = useState<boolean>(true);
  const [startDate, setStartDate] = useState(new Date());

  const [formValue, setFormValue] = useState<iAccountRegister>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    dayOfBirth: startDate.toISOString().split("T")[0],
    gender: 0,
  });

  useEffect(() => {
    if (formValue.firstname.length > 0) setEmptyFirstname(true);
    if (formValue.lastname.length > 0) setEmptyLastname(true);
    if (formValue.email.length > 0) setEmptyEmail(true);
    if (formValue.password.length > 0) setEmptyPassword(true);
  }, [formValue]);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormInputs>();

  const handleSetDate = (date: Date) => {
    if (date < new Date()) {
      setStartDate(date);
    } else {
      toast.warning("Please choose the correct date of birth!");
    }
    setFormValue({
      ...formValue,
      dayOfBirth: startDate.toISOString().split("T")[0],
    });
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    if (name === "gender")
      setFormValue({ ...formValue, [name]: Number(value) });
    else setFormValue({ ...formValue, [name]: value });
  };

  const handleRegister = async () => {
    if (formValue.firstname.length === 0) setEmptyFirstname(false);
    else setEmptyFirstname(true);
    if (formValue.lastname.length === 0) setEmptyLastname(false);
    else setEmptyLastname(true);
    if (formValue.email.length === 0) setEmptyEmail(false);
    else setEmptyEmail(true);
    if (formValue.password.length === 0) setEmptyPassword(false);
    else setEmptyPassword(true);

    if (
      formValue.firstname.length > 0 &&
      formValue.lastname.length > 0 &&
      formValue.email.length > 0 &&
      formValue.password.length > 0
    ) {
      try {
        if (!validateEmail(formValue.email))
          toast.error("Sign up failed, email is invalid!");
        else {
          const result = await UsersApi.register(formValue);
          if (result.messages === "Action Success") {
            toast.success("Sign up successful, please confirm email!");
            return;
          }
          if (result.messageEN === "Invalid data input") {
            toast.error("Sign up failed, email is invalid!");
            return;
          }
          if (result.messageEN === "Existed user ") {
            toast.error("Sign up failed, account already exists!");
            return;
          }
        }
      } catch (error: any) {
        if (error.error) {
          toast.error("Sign up failed, please check your information again!");
        }
      }
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <section className={`${styles.wrapper}`}>
        <div className={`${styles.leftContent}`}></div>
        <div className={`${styles.rightContent}`}>
          <div className={`${styles.logoArea}`}>
            <figure className={`${styles.logoImage}`}>
              <img src="logo.png" alt="logo" />
            </figure>
            <h1 className={`${styles.logoTitle}`}>Clover</h1>
          </div>
          <h1 className={`${styles.preamble}`}>Register now!</h1>
          <form className={`${styles.form}`}>
            <div className="flex gap-5 mb-5">
              <div className="w-full">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formValue.firstname}
                  onChange={handleInput}
                  className={`${styles.input} ${
                    !emptyFirstname
                      ? `${styles.errorInput}`
                      : `${styles.normalInput}`
                  }`}
                  placeholder="First Name"
                />
                {!emptyFirstname && (
                  <p className={`${styles.warning}`}>Firstname is empty!</p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formValue.lastname}
                  onChange={handleInput}
                  className={`${styles.input} ${
                    !emptyLastname
                      ? `${styles.errorInput}`
                      : `${styles.normalInput}`
                  }`}
                  placeholder="Last Name"
                />
                {!emptyLastname && (
                  <p className={`${styles.warning}`}>Lastname is empty!</p>
                )}
              </div>
            </div>
            <div className="mb-5">
              <input
                type="text"
                id="email"
                name="email"
                value={formValue.email}
                onChange={handleInput}
                className={`${styles.input} ${
                  !emptyEmail ? `${styles.errorInput}` : `${styles.normalInput}`
                }`}
                placeholder="Email"
              />
              {!emptyEmail && (
                <p className={`${styles.warning}`}>Email is empty!</p>
              )}
            </div>
            <div className="mb-5">
              <input
                type="password"
                id="password"
                name="password"
                value={formValue.password}
                onChange={handleInput}
                className={`${styles.input} ${
                  !emptyPassword
                    ? `${styles.errorInput}`
                    : `${styles.normalInput}`
                }`}
                placeholder="New Password"
              />
              {!emptyPassword && (
                <p className={`${styles.warning}`}>Password is empty!</p>
              )}
            </div>
            <div className={`${styles.groupInput}`}>
              <div className={`${styles.datePickerArea}`}>
                <label htmlFor="datePicker">
                  <p className="mb-2">Date of birth</p>
                  <DatePicker
                    id="datePicker"
                    className={`${styles.input}`}
                    wrapperClassName={`${styles.datePicker}`}
                    dayClassName={(date) =>
                      startDate &&
                      date.toDateString() === startDate.toDateString()
                        ? `${styles.selectedDate}`
                        : ""
                    }
                    selected={startDate}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onChange={(date: Date) => handleSetDate(date)}
                  />
                </label>
                <AiFillCalendar className={`${styles.customIconCalendar}`} />
              </div>
              <div className="w-full">
                <p className="mb-2">Gender</p>
                <div className={`${styles.customDivSelect}`}>
                  <label htmlFor="male" className="flex gap-3 items-center">
                    <input
                      checked={formValue.gender === 0 ? true : false}
                      type="radio"
                      id="male"
                      value={0}
                      name="gender"
                      onChange={handleInput}
                      className={`${styles.customRadio}`}
                    />
                    Male
                  </label>
                  <span className="h-6 bg-secondColor w-px"></span>
                  <label htmlFor="female" className="flex gap-3 items-center">
                    <input
                      checked={formValue.gender === 1 ? true : false}
                      type="radio"
                      id="female"
                      value={1}
                      name="gender"
                      onChange={handleInput}
                      className={`${styles.customRadio}`}
                    />
                    Female
                  </label>
                  <span className="h-6 bg-secondColor w-px"></span>
                  <label htmlFor="female" className="flex gap-3 items-center">
                    <input
                      checked={formValue.gender === 2 ? true : false}
                      type="radio"
                      id="other"
                      value={2}
                      name="gender"
                      onChange={handleInput}
                      className={`${styles.customRadio}`}
                    />
                    Other
                  </label>
                </div>
              </div>
            </div>
            <button
              className={`${styles.button}`}
              onClick={handleSubmit(handleRegister)}
            >
              {isSubmitting ? (
                <BiLoaderAlt className="text-2xl animate-loading" />
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          <div>
            <span>Already have account ?</span>
            <Link to={"/login"} className={`${styles.buttonLogin}`}>
              Sign in
            </Link>
          </div>
          <div className={`${styles.separateArea}`}>
            <span className={`${styles.separateLine}`}></span>
            <p className={`${styles.separateText}`}>or</p>
            <span className={`${styles.separateLine}`}></span>
          </div>
          <button className={`${styles.buttonGoogle}`}>
            <FcGoogle className="text-3xl" />
            <p>Continue with Google</p>
          </button>
        </div>
      </section>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        bodyClassName={`${styles.toastBody}`}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </HelmetProvider>
  );
};

export default RegisterPage;
