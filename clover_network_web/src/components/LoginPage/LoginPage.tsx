import { useState, useEffect, SyntheticEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { Helmet, HelmetProvider } from "react-helmet-async";

import { FcGoogle } from "react-icons/fc";

import { UsersApi } from "@/services/api/users";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
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

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (formValue.email.length === 0) setEmptyEmail(false);
    else setEmptyEmail(true);
    if (formValue.password.length === 0) setEmptyPassword(false);
    else setEmptyPassword(true);

    if (formValue.email.length > 0 && formValue.password.length > 0) {
      try {
        const result = await UsersApi.login(formValue);
        console.log(result);
      } catch (error: any) {
        console.log(error);
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
              <img src="logo.png" alt="logo" />
            </figure>
            <h1 className={`${styles.logoTitle}`}>Clover</h1>
          </div>
          <h1 className={`${styles.preamble}`}>Welcome back!</h1>
          <form className={`${styles.form}`}>
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
            <button className={`${styles.button}`} onClick={handleLogin}>
              Sign in
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
    </HelmetProvider>
  );
};

export default LoginPage;
