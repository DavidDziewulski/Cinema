import { useRegister } from "@/hooks/useRegister";
import { useStore } from "@/hooks/useStore";
import { paths } from "@/router/Router";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export const RegisterPage = () => {
  const { mutate } = useRegister();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
    mode: "onSubmit",
  });

  const { isAuthenticated } = useStore();

  if (isAuthenticated) {
    navigate(paths.home);
    return;
  }

  const isError = Object.keys(errors).length > 0;

  const onSubmit = handleSubmit((data) => {
    if (isError) {
      return;
    }

    mutate(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center min-h-screen bg-gray-900"
    >
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
            Rejestracja
          </h3>
          <div className="w-full mt-4">
            <input
              {...register("name", {
                required: "Imię jest wymagane",
                minLength: {
                  value: 3,
                  message: "Imię musi mieć co najmniej 3 znaki",
                },
              })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              placeholder="Imię"
              aria-label="Imię"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              placeholder="Email"
              aria-label="Email"
              {...register("email", {
                required: "Email jest wymagany",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Podaj poprawny adres email",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Hasło"
              aria-label="Hasło"
              {...register("password", {
                required: "Hasło jest wymagane",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\W)/,
                  message:
                    "Hasło musi zawierać co najmniej jedną dużą literę i jeden znak specjalny",
                },
                minLength: {
                  value: 8,
                  message: "Hasło musi mieć co najmniej 8 znaków",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex items-center justify-self-end mt-4">
            <button
              disabled={!isDirty}
              className={`px-6 py-2 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-opacity-50 ${
                isDirty && !isError
                  ? "bg-blue-500 text-white hover:bg-blue-400 focus:ring-blue-300"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
            >
              Zarejestruj
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Masz już konto?
          </span>
          <a
            onClick={() => navigate(paths.login)}
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Zaloguj się
          </a>
        </div>
      </div>
    </form>
  );
};
