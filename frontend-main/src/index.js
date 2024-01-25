import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from './Index_page';
import About from './About';
import Category from './Category';
import Post from './Post';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
import App from "./App"; 


const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: "/index",
        element: <Index />,
    },
    {
        path: "/category",
        element: <Category />,
    },
    {
      path: "/post/:postNumber",
      element: <Post />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);