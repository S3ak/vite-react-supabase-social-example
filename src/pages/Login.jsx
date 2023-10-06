import { supabase } from "../lib/api";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

/**
 * Contains form for logging a registered user profile.
 * @see
 */
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const navigateToHome = () => {
    setTimeout(() => {
      navigate({ to: "/" });
    }, 2000);
  };

  const signInWithOAuth = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
      console.log(data, error);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      const res = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      const data = await res.json();

      localStorage.setItem("access_token", data.accessToken);
      setData(data);
      setIsSuccess(res.ok);
      navigateToHome();
    } catch (error) {
      console.warn("An error occurred", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <div>An error occurred: {error?.message}</div>;

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 bg-white lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="w-auto h-10 mx-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {isSuccess ? (
          <section>
            <p className="text-center text-green-900">
              👋 Hi {data?.name}. You will now redirect to the home page!
            </p>
          </section>
        ) : (
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            <button
              className="w-auto h-10 text-gray-900 bg-red"
              onClick={signInWithOAuth}
            >
              Sign in with GitHub
            </button>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>

              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue="first.last@stud.noroff.no"
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  defaultValue="UzI1NiIsInR5cCI"
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "signing in" : "Sign in"}
              </button>
            </div>
          </form>
        )}

        <p className="mt-10 text-sm text-center text-gray-500">
          Not a member?{" "}
          <a
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
}
