import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Users from "./pages/users";
import Heroes from "./pages/heroes";


let router = createBrowserRouter([
  {
    path: "/",
    Component: Login ,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/usuarios",
    Component: Users,
  },
  {
    path: "/herois",
    Component: Heroes,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}