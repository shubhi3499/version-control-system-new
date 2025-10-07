import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

// Pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import { useAuth } from "./authContext";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    // If no user is logged in → redirect to login (unless already on signup page)
    if (!userIdFromStorage && window.location.pathname !== "/signup") {
      navigate("/auth");
    }

    // If user is logged in and tries to visit /auth or /signup → redirect to dashboard
    if (userIdFromStorage && ["/auth", "/signup"].includes(window.location.pathname)) {
      navigate("/");
    }

    // Sync user from storage to context
    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }
  }, [currentUser, navigate, setCurrentUser]);

  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
