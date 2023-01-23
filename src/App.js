import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestrauntMenu";
import Profile from "./components/Profile";
import Shimmer from "./components/Shimmer";

const Instamart = lazy(() => import("./components/Instamart"));
const About = lazy(() => import("./components/About"));



const AppLayout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/about", 
          element: (
            <Suspense fallback={<Shimmer/>}>
              <About />
            </Suspense>
          ),
          children: [
            {
              path: "profile", 
              element: <Profile />,
            },
          ],
        },
        {
          path: "/",
          element: <Body />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/restaurant/:resId",
          element: <RestaurantMenu />,
        },
        {
          path: "/instamart",
          element: (
            <Suspense fallback={<Shimmer />}>
              <Instamart />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  
  root.render(<RouterProvider router={appRouter} />);
  



