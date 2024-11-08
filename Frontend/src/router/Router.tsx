import { AppContext } from "@/App";
import { HomePage } from "@/pages/Home/HomePage";


import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

export const paths = {
    home: '/',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
} as const;

type ProtectedProps = {
    children: React.ReactNode;
};

const Protected = ({children}: ProtectedProps) => {
    const { isActive } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(!isActive){
            navigate(paths.login);
        }

    },[isActive])

    return <>{children}</>;
}

export const RouterProvider = () => {
    return (
        <div className="min-h-screen bg-your-background-class">
            <BrowserRouter>
                <Routes>
                <Route
                    path={paths.home}
                    element={<Protected><HomePage/></Protected>}
                />
                <Route path={paths.login} element={<LoginPage />} />
                <Route path={paths.register} element={<RegisterPage />} />
                <Route path="*" element={<h1>Error</h1>} />
            </Routes>
        </BrowserRouter>
        </div>
    )
}