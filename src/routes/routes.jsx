import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import VerifyOtp from "../pages/login/VerifyOtp";
import PublicRoute from "../components/auth/PublicRoute";
import Dashboard from "../components/dashboards/Dashboard";
import RequireAuth from "../components/auth/RequireAuth";
import DashboardWelcome from "../components/dpages/DashboardWelcome";
import Habit from "../components/dpages/Habit";
import Stats from "../components/dpages/Stats";
import Badges from "../components/dpages/Badges";
import Setting from "../components/dpages/Setting";
import Onboarding from "../pages/onboarding/Onboarding";
import Home from "../pages/home/Home";



export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [

            { path: "/", element: <Navigate to="/home" replace /> },

            {
                path: "/dashboard",
                element: (
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                ),
                children: [
                    {
                        index: true,
                        element: <DashboardWelcome />
                    },
                    {
                        path: "habits",
                        element: <Habit />
                    },
                    {
                        path: "stats",
                        element: <Stats />
                    },
                    {
                        path: "badges",
                        element: <Badges />
                    },
                    {
                        path: "settings",
                        element: <Setting />
                    }
                ]
            },
            {
                path: "/login",
                element: (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                )
            },
            {
                path: "/onboarding",
                element: (
                    <RequireAuth>
                        <Onboarding />
                    </RequireAuth>
                )
            },
            {
                path: "/verify-otp",
                element: (
                    <PublicRoute>
                        <VerifyOtp />
                    </PublicRoute>
                )
            },
            {
                path: "/register",
                element: (
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                )
            },
            {
                path:"/home",
                element:<PublicRoute>
                    <Home/>
                </PublicRoute>
            }
        ]
    }

])