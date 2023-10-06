import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const router = useNavigate();

  const { isLoggedIn } = useSelector(
    (state: { auth: { isLoggedIn: boolean; tokenId: string } }) => state.auth
  );

  useEffect(() => {
    if (!isLoggedIn) {
      router("/login");
      return;
    }
  }, []);

  return <div>Home</div>;
};

export default HomePage;
