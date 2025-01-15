import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import NotFound from "../pages/error/notFound";
import Rombel from "../pages/admin/rombel/Rombel";
import Layout from "../pages/Layout";
import User from "../pages/admin/user/User";
import Rayon from "../pages/admin/rayon/Rayon";
import Student from "../pages/admin/student/Student";
import Late from "../pages/admin/late/Late";
import EditRombel from "../pages/admin/rombel/EditRombel";
import CreateRombel from "../pages/admin/rombel/CreateRombel";
import DetailLate from "../pages/admin/late/DetailLate";
import CreateLate from "../pages/admin/late/CreateLate";
import EditLate from "../pages/admin/late/EditLate";
import CreateStudent from "../pages/admin/student/CreateStudent";
import EditStudent from "../pages/admin/student/EditStudent";
import CreateUser from "../pages/admin/user/CreateUser";
import EditUser from "../pages/admin/user/EditUser";
import CreateRayon from "../pages/admin/rayon/CreateRayon";
import EditRayon from "../pages/admin/rayon/EditRayon";
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "../services/AdminRoute";
import PSRoute from "../services/PsRoute";
import LatePs from "../pages/ps/late/Late";
import StudentPs from "../pages/ps/student/Student";
import DetailPs from "../pages/ps/late/Detail";

const router = createBrowserRouter([
    {
        
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <Layout />,
                children: [
                    { path: "/", element: <Dashboard /> },
                    // admin routes
                    {
                        element: <AdminRoute />,
                        children: [
                            {
                                path: "keterlambatan",
                                children: [
                                    { index: true, element: <Late /> },
                                    { path: "create", element: <CreateLate /> },
                                    { path: "edit/:id", element: <EditLate /> },
                                    { path: "detail/:id", element: <DetailLate /> },
                                ],
                            },
                            {
                                path: "rayon",
                                children: [
                                    { index: true, element: <Rayon /> },
                                    { path: "create", element: <CreateRayon /> },
                                    { path: "edit/:id", element: <EditRayon /> },
                                ],
                            },
                            {
                                path: 'rombel',
                                children: [
                                    { index: true, element: <Rombel /> },
                                    { path: 'edit/:id', element: <EditRombel /> },
                                    { path: 'create', element: <CreateRombel /> },
                                ]
                            },
                            {
                                path: 'siswa',
                                children: [
                                    { index: true, element: <Student /> },
                                    { path: 'create', element: <CreateStudent /> },
                                    { path: 'edit/:id', element: <EditStudent /> },
                                ]
                            },
                            {
                                path: 'user',
                                children: [
                                    { index: true, element: <User /> },
                                    { path: 'create', element: <CreateUser /> },
                                    { path: 'edit/:id', element: <EditUser /> },
                                ]
                            },
                        ]
                    },
                    // end admin routes

                    // route untuk role ps
                    {
                        path: "pembimbing",
                        element: <PSRoute />,
                        children: [
                            {
                                path: 'siswa',
                                element: <StudentPs />
                            },
                            {
                                path: 'keterlambatan',
                                children: [
                                    { index: true, element: <LatePs /> },
                                    { path: 'detail/:id', element: <DetailPs /> },
                                ]
                            }
                        ]
                    }
                ],
            },
        ],
    },
    { path: "login", element: <Login /> },
    { path: "*", element: <NotFound /> },
]);

export default router;