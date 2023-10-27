import HomePage from "@/components/templates/HomePage";
import LoginPage from "@/components/templates/LoginPage";
import RegisterPage from "@/components/templates/RegisterPage";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);
  return (
    <div className="App">
      {elements}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        bodyClassName="font-beVietnam text-sm"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
