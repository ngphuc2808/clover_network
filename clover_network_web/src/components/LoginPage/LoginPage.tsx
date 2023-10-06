import { useState, useEffect, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { Helmet, HelmetProvider } from "react-helmet-async";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FcGoogle } from "react-icons/fc";
import { BiLoaderAlt } from "react-icons/bi";

import { UsersApi } from "@/services/api/users";
import { setLoggedIn } from "@/features/redux/slices/authSlice";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const router = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormInputs>();

  const [formValue, setFormValue] = useState<iAccountLogin>({
    email: "",
    password: "",
  });

  const [emptyEmail, setEmptyEmail] = useState<boolean>(true);
  const [emptyPassword, setEmptyPassword] = useState<boolean>(true);

  useEffect(() => {
    if (formValue.email.length > 0) setEmptyEmail(true);
    if (formValue.password.length > 0) setEmptyPassword(true);
  }, [formValue]);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleLogin = async () => {
    if (formValue.email.length === 0) setEmptyEmail(false);
    else setEmptyEmail(true);
    if (formValue.password.length === 0) setEmptyPassword(false);
    else setEmptyPassword(true);

    try {
      if (formValue.email.length > 0 && formValue.password.length > 0) {
        if (!validateEmail(formValue.email))
          toast.error("Sign in failed, email is invalid!");
        else {
          const result = await UsersApi.login(formValue);
          if (result.messageEN === "Action success") {
            dispatch(setLoggedIn(result.data.tokenId));
            router("/");
            return;
          }
          if (
            result.messageEN ===
            "Account doesn't activated. Please verify account by link send to your email before first login"
          ) {
            toast.error(
              "Please verify account by link send to your email before first login!"
            );
            return;
          }
          if (result.messageEN === "Profile empty ") {
            toast.error("Account not found!");
            return;
          }
          if (result.messageEN === "Invalid data input") {
            toast.error("Sign in failed, email is invalid!");
            return;
          }
          if (result.messageEN === "Email or password is incorrect") {
            toast.error("Email or password is incorrect!");
            return;
          }
          if (result === 1) {
            toast.error("Sign in failed, please check your information again!");
            return;
          }
        }
        return;
      }
    } catch (error: any) {
      if (error.error) {
        toast.error("Sign in failed, please check your information again!");
      }
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className={`${styles.wrapper}`}>
        <div className={`${styles.leftContent}`}></div>
        <div className={`${styles.rightContent}`}>
          <div className={`${styles.logoArea}`}>
            <figure className={`${styles.logoImage}`}>
              <img src="../../logo.png" alt="logo" />
            </figure>
            <h1 className={`${styles.logoTitle}`}>Clover</h1>
          </div>
          <h1 className={`${styles.preamble}`}>Welcome back!</h1>
          <form className={`${styles.form}`}>
            <div className="mb-5">
              <input
                type="email"
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
            <div className="mb-16">
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
                placeholder="Password"
              />
              {!emptyPassword && (
                <p className={`${styles.warning}`}>Password is empty!</p>
              )}
            </div>
            <button
              className={`${styles.button}`}
              onClick={handleSubmit(handleLogin)}
            >
              {isSubmitting ? (
                <BiLoaderAlt className="text-2xl animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          <div>
            <span>Don't have account ?</span>
            <Link to={"/register"} className={`${styles.buttonRegister}`}>
              Sign up
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

export default LoginPage;
