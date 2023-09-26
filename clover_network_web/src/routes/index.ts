import config from "../config";

import HomePage from "components/HomePage";
import LoginPage from "components/LoginPage";
import RegisterPage from "components/RegisterPage";

//public routes
const publicRoutes = [
  {
    path: config.routes.home,
    component: HomePage,
  },
  {
    path: config.routes.login,
    component: LoginPage,
  },
  {
    path: config.routes.register,
    component: RegisterPage,
  },
];

export { publicRoutes };
