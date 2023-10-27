import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const router = useNavigate();

  const isLogin = JSON.parse(localStorage.getItem("userLogin")!);

  useEffect(() => {
    if (!isLogin) {
      router("/login");
      return;
    }
  }, []);

  return <div>Home</div>;
};

export default HomePage;
