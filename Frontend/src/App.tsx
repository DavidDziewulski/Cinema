import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { queryClient } from "./lib/queryClient/queryClient";
import { RouterProvider } from "./router/Router";
import { InstallPWA } from "./components/InstallPWA";

export const App = () => {
  return (
    <>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <QueryClientProvider client={queryClient}>
          <RouterProvider />
          <InstallPWA />
        </QueryClientProvider>
   </>
  );
};
