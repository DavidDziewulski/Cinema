import { useAuthToken } from "@/auth/useAuthToken";
import { useStore } from "@/hooks/useStore";
import { HomePage } from "@/pages/Home/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { Movie } from "@/pages/Movie/Movie";
import { MyCalendar } from "@/pages/MyCalendar/MyCalendar";
import { RegisterPage } from "@/pages/RegisterPage";
import { Header } from "@/partials/header/Header";
import { useAuth } from "react-oidc-context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const paths = {
  home: "/",
  movie: "/movie/:id",
  myCalendar: "/my-calendar",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  authCallback: "/auth/callback",
} as const;

type ProtectedProps = {
  children: React.ReactNode;
};

const CallbackPage = () => {
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  if (!auth.isAuthenticated) {
    auth.signinRedirect();
    return null;
  }

  return null;
};

const Protected = ({ children }: ProtectedProps) => {
  const { isAuthenticated } = useAuthToken()
  isAuthenticated;

  const { 
    isLoading
  } = useStore();

  if (isLoading) {
    return <span>isLoading</span>;
  }

  if (!isAuthenticated) {
    return <Navigate to={paths.login} />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export const RouterProvider = () => {
  return (
    <div className="min-h-screen bg-your-background-class">
      <BrowserRouter>
        <Routes>
          <Route
            path={paths.home}
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          />
          <Route
            path={paths.movie}
            element={
              <Protected>
                <Movie />
              </Protected>
            }
          />
          <Route
            path={paths.myCalendar}
            element={
              <Protected>
                <MyCalendar />
              </Protected>
            }
          />
          <Route path={paths.login} element={<LoginPage />} />
          <Route path={paths.register} element={<RegisterPage />} />
          <Route path={paths.authCallback} element={<CallbackPage />} />
          <Route path="*" element={<h1>Error</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
