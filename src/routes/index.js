import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../layout";
import NotFoundPage from "../pages/NotFoundPage";
import routeModules from "./modules";
import { fromJS } from "immutable";

const childrens = [...routeModules];

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      ...childrens,
      {
        path: "",
        element: <Navigate to="dashboard" />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export const layoutChildren = fromJS(childrens).toJS();

export default routes;
