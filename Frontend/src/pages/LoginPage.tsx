import { AppContext } from "@/App";
import { paths } from "@/router/Router";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { isActive, toggleActive } = useContext(AppContext);

  const navigate = useNavigate();

  if (isActive) {
    navigate(paths.home);
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Logowanie
          </h3>
          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              placeholder="Email"
              aria-label="Email"
            />
          </div>
          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Hasło"
              aria-label="Hasło"
            />
          </div>
          <div className="flex items-center justify-self-end mt-4">
            <button
              onClick={toggleActive}
              className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Zaloguj
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Nie masz konta?
          </span>
          <a
            onClick={() => navigate(paths.register)}
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Rejestracja
          </a>
        </div>
      </div>
    </div>
  );
};
